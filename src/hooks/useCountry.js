import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCountry = () => {
  const [country, setCountry] = useState('')

  useEffect(() => {
    const traceCountry = async () => {
      try {
        const savedCountry = sessionStorage.getItem('country')
        if (savedCountry) {
          setCountry(savedCountry)
          return
        }

        const response = await axios('https://www.metamask.io/cdn-cgi/trace')

        const data = response.data.split('\n').reduce((result, line) => {
          const [key, value] = line.split('=')
          return { ...result, [key]: value }
        }, {})

        sessionStorage.setItem('country', data.loc)
        setCountry(data.loc)
      } catch (error) {
        console.error('Unable to fetch country', error)
      }
    }

    traceCountry()
  }, [])

  return country
}
