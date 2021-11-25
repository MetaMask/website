const easeOutCuaic = t => {
  t--
  return t * t * t + 1
}
const scrollToX = (element, xFrom, xTo, t01, speed, step, motion) => {
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollTop = xTo
    return
  }
  element.scrollTop = xFrom - (xFrom - xTo) * motion(t01)
  t01 += speed * step
  setTimeout(function() {
    scrollToX(element, xFrom, xTo, t01, speed, step, motion)
  }, step)
}
// Element to move, element or px from, element or px to, time in ms to animate
const scrollToC = (element, from, to, duration) => {
  if (duration <= 0) return
  if (typeof from === 'object') from = from.offsetTop
  if (typeof to === 'object') to = to.offsetTop

  scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic)
}
// Element to move, time in ms to animate
const scrollTo = (element, duration) => {
  var e = document.documentElement
  if (e.scrollTop === 0) {
    var t = e.scrollTop
    ++e.scrollTop
    e = t + 1 === e.scrollTop-- ? e : document.body
  }
  scrollToC(e, e.scrollTop, element, duration)
}

export default scrollTo;