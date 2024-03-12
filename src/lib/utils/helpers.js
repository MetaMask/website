export const lerp = (a, b, n) => (1 - n) * a + n * b

export const distance = (p1, p2) =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

export default function generateUUID() {
  const timestamp = new Date().getTime()
  const buffer = new Uint8Array(4)
  crypto.getRandomValues(buffer)
  const randomString = Array.from(buffer)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
    .substring(0, 8)
  const uuid = `${timestamp.toString(16)}-${randomString}`
  return uuid
}
