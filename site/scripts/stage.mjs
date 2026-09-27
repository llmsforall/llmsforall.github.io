import { cp, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// Copy only production output; existing legacy public assets remain available.
for (const name of await readdir(resolve(root, 'dist'))) {
  await cp(resolve(root, 'dist', name), resolve(root, '..', name), { recursive: true })
}
console.log('Built files copied to the repository root. No commit or push performed.')
