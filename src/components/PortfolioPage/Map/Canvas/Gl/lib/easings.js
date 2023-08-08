const EasingFunctions = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  Pow2EaseIn: t => t * t,
  // decelerating to zero velocity
  Pow2EaseOut: t => t * (2 - t),
  // acceleration until halfway, then deceleration
  Pow2EaseInOut: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  Pow3EaseIn: t => t * t * t,
  // decelerating to zero velocity
  Pow3EaseOut: t => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  Pow3EaseInOut: t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  Pow4EaseIn: t => t * t * t * t,
  // decelerating to zero velocity
  Pow4EaseOut: t => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  Pow4EaseInOut: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // accelerating from zero velocity
  Pow5EaseIn: t => t * t * t * t * t,
  // decelerating to zero velocity
  Pow5EaseOut: t => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  Pow5EaseInOut: t =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
}

export default EasingFunctions
