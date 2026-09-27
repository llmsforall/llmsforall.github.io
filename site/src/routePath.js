export function routePath(pathname) {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '')
  return path || '/'
}
