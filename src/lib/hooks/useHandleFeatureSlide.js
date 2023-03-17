import { useEffect, useState } from 'react'

export const useHandleFeatureSlide = (
  image,
  extraImage,
  contentAlignLR,
  featureRef
) => {
  const [currentImage, setCurrentImage] = useState(image)
  const [extraCustomClass, setExtraCustomClass] = useState('')

  const handleClick = e => {
    const currentNode = e.target
    const { parentNode } = currentNode
    const totalImage = [image, ...extraImage]

    const elements = parentNode.getElementsByTagName('dt')
    for (let e of elements) {
      e.className = ''
    }
    currentNode.className = 'active'
    const dataCustomClass = currentNode.dataset.customclass || ''
    setExtraCustomClass(dataCustomClass)
    const dataIndex = currentNode.dataset.index
    setCurrentImage(null)
    setTimeout(() => {
      setCurrentImage(totalImage[dataIndex - 1])
    }, 0)
    if (featureRef?.current) {
      const tempClass =
        contentAlignLR === 'right' ? 'fadeInLeftMini' : 'fadeInRightMini'
      const animatedSideImageElement = featureRef.current.querySelector(
        `.animated.${tempClass}`
      )
      animatedSideImageElement.className = ''
      setTimeout(() => {
        animatedSideImageElement.className = `animated ${tempClass}`
      }, 0)
    }
  }

  useEffect(() => {
    if (!extraImage || typeof window === 'undefined') return
    const elements = document.querySelectorAll('.checklist-inactive dt')
    for (let element of elements) {
      element.addEventListener('click', handleClick)
    }

    return () => {
      for (let element of elements) {
        element.removeEventListener('click', handleClick)
      }
    }
  }, [])

  return { extraCustomClass, currentImage }
}
