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
  const { pathname } = location || {}
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

  // Element to move, element or px from, element or px to, time in ms to animate
  const scrollToC = (element, from, to, duration) => {
    if (duration <= 0) return
    if (typeof from === 'object') from = from.offsetTop
    if (typeof to === 'object') to = to.offsetTop

    scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic)
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

  const easeOutCuaic = t => {
    t--
    return t * t * t + 1
  }

  React.useEffect(() => {
    if (document) {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href').length === 1) {
          return
        }
        anchor.addEventListener('click', function(e) {
          e.preventDefault()
          const hash = this.getAttribute('href')
          const ele = document.getElementById(hash.replace('#', ''))
          const y = ele.getBoundingClientRect().top + window.pageYOffset - 100
          scrollTo(y, 1500)
          window.history.pushState(
            '',
            '',
            `${pathname.replace(/\/?$/, '/')}${hash}`
          )
        })
      })
    }
  }, [pathname, scrollTo])

  return (
    <Layout theme={pageTheme} {...rest}>
      <Notifications />
      {children}
    </Layout>
  )
}

export default PageLayout
