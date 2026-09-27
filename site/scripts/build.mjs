import { build } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(root)
const pages = JSON.parse(await readFile('src/metadata.json', 'utf8'))
const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
await build({ root })
await build({ root, build: { ssr: 'src/render.jsx', outDir: '.ssr', emptyOutDir: true }, publicDir: false })
try {
  const { render } = await import(new URL('../.ssr/render.js', import.meta.url))
  const template = await readFile('dist/index.html', 'utf8')
  for (const [route, page] of Object.entries(pages)) {
    const tags = [
      `<link rel="canonical" href="${escape(page.canonical)}" data-page-meta>`,
      ...page.meta.map((attributes) => `<meta ${Object.entries(attributes).map(([key, value]) => `${key}="${escape(value)}"`).join(' ')} data-page-meta>`),
    ].join('\n    ')
    const html = template
      .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
      .replace(/^[ \t]*<meta name="description"[^>]*>\n/m, '')
      .replace('</head>', `    ${tags}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)
    const target = route === '/' ? 'dist/index.html' : `dist${route}/index.html`
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html)
  }
  console.log(`Generated ${Object.keys(pages).length} static pages with original URLs and metadata.`)
} finally {
  await rm('.ssr', { recursive: true, force: true })
}
