
export function getRedirectPath (type, header) {
  let path = ''
  path += type === 'Boss' ? '/boss' : '/jober'
  if (!header) {
    path += 'info'
  }
  return path
}