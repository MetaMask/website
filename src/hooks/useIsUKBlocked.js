import { useCountry } from './useCountry'

export const useIsUKBlocked = () => {
  const country = useCountry()

  console.log('process.env.GATSBY_ENVIRONMENT', process.env.GATSBY_ENVIRONMENT)

  // Only apply geoblocking in production
  return country === 'GB' && process.env.GATSBY_ENVIRONMENT !== 'staging'
}
