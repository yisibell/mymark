const getType: (value: any) => string = (value: any) => {
  const s = Object.prototype.toString.call(value)
  return s.slice(s.indexOf(' ') + 1, s.length - 1)
}

export default getType
