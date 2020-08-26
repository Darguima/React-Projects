export default function isEmail (email) {
  var regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/

  if (email !== '' && regex.test(email)) {
    return true
  } else {
    return false
  }
}
