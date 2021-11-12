import React from 'react'
import Layout from '../components/layout'
import { ToastContainer as Notifications, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { defaultTheme, purpleTheme } from '../lib/theme'

/**
 * @name PageLayout
 * @summary - Wrapper container to hold all public pages
 * @description -
 */
const PageLayout = props => {
  const { location, children, themeColor, ...rest } = props
  const pageTheme = themeColor === 'purple' ? purpleTheme : defaultTheme
  const renderNotification = (state = {}) => {
    if (state.error) {
      const { type, description } = state.error
      const errorMessage = `
        ${type
          .split('_')
          .join(' ')
          .toUpperCase()} -
        ${decodeURIComponent(description)}`

      toast.error(errorMessage)
    }
  }

  const navigationState = (location && location.state) || {}
  if (navigationState.notification) {
    renderNotification(navigationState.notification)
  }

  React.useEffect(() => {
    if (document) {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault()
          const hash = this.getAttribute('href')
          const ele = document.getElementById(hash.replace('#', ''))
          const y = ele.getBoundingClientRect().top + window.pageYOffset - 100
          window.scrollTo({ top: y, behavior: 'smooth' })
          window.history.pushState(
            '',
            '',
            `${location.pathname.replace(/\/?$/, '/')}${hash}`
          )
        })
      })
    }
  }, [])

  return (
    <Layout theme={pageTheme} {...rest}>
      <Notifications />
      {children}
    </Layout>
  )
}

export default PageLayout
