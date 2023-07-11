export const lerp = (a, b, n) => (1 - n) * a + n * b

export const distance = (p1, p2) =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
