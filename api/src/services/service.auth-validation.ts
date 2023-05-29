export const isValid = (headerValue: string | undefined): boolean => {
  if (headerValue === undefined || headerValue === null || headerValue === '') {
    return false
  }

  const splitedHeader = headerValue.split(' ')

  return (
    splitedHeader[0] === 'Bearer' ||
    splitedHeader[1] !== undefined ||
    splitedHeader[1] !== null ||
    splitedHeader[1] !== ''
  )
}
