
export function getRedirectPath (type, header) {
  let path = ''
  path += type === 'boss' ? '/boss' : '/jober'
  if (!header) {
    path += 'info'
  }
  return path
}