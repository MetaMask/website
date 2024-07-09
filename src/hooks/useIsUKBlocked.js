import { useCountry } from './useCountry'

export const useIsUKBlocked = () => {
  const country = useCountry()

  // Only apply geoblocking in production
  return country === 'GB' && process.env.GATSBY_ENVIRONMENT !== 'staging'
}
