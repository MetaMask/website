import React, { useState, useEffect, useRef } from 'react'

let globalId = 0

const HubspotForm = props => {
  const [loaded, setLoaded] = useState(false)
  const elRef = useRef(null)
  const id = useRef(globalId++)

  const createForm = () => {
    if (window.hbspt) {
      if (elRef.current === null) {
        return
      }
      let propsCopy = { ...props }
      delete propsCopy.loading
      delete propsCopy.onSubmit
      delete propsCopy.onReady
      let options = {
        ...propsCopy,
        target: `#${elRef.current.getAttribute('id')}`,
        onFormSubmit: $form => {
          const formData = $form.serializeArray()
          props.onSubmit(formData)
        },
      }
      window.hbspt.forms.create(options)
      return true
    } else {
      setTimeout(createForm, 1)
    }
  }

  const loadScript = () => {
    let script = document.createElement('script')
    script.defer = true
    script.onload = () => {
      createForm()
      findFormElement()
    }
    script.src = '//js.hsforms.net/forms/v2.js'
    document.head.appendChild(script)
  }

  const findFormElement = () => {
    if (elRef.current === null) {
      return
    }
    let form = elRef.current.querySelector('iframe')
    if (form) {
      setLoaded(true)
      if (props.onReady) {
        props.onReady(form)
      }
    } else {
      setTimeout(findFormElement, 1)
    }
  }

  useEffect(() => {
    if (!window.hbspt && !props.noScript) {
      loadScript()
    } else {
      createForm()
      findFormElement()
    }
  }, [])

  return (
    <>
      <div
        ref={elRef}
        id={`reactHubspotForm${id.current}`}
        style={{ display: loaded ? 'block' : 'none' }}
      />
      {!loaded && props.loading}
    </>
  )
}

export default HubspotForm
