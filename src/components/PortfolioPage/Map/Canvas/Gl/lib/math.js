export function lerp(value, min, max) {
  return min + value * (max - min)
}

export function map(value, minA, maxA, minB, maxB, clamped = false) {
  if (clamped)
    value = Math.min(
      Math.max(minA, maxA),
      Math.max(Math.min(minA, maxA), value)
    )
  return ((value - minA) / (maxA - minA)) * (maxB - minB) + minB
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function mod(value, length) {
  return ((value % length) + length) % length
}
