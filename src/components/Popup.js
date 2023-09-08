import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import PopupModal from 'reactjs-popup'
import { ModalInner, IconCloseModal } from './StyledGeneral'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const Popup = props => {
  const {
    showPopup,
    onClosePopup,
    children,
    width,
    hideCloseIcon = false,
    keepLightMode = false,
  } = props

  const modalRef = useRef()

  useEffect(() => {
    if (showPopup) {
      disableBodyScroll(modalRef, {
        allowTouchMove: el => (el.id = 'modalInner'),
      })
    } else {
      enableBodyScroll(modalRef)
    }
  }, [showPopup])

  return (
    <PopupModal
      open={showPopup}
      onClose={onClosePopup}
      contentStyle={{
        padding: 0,
        border: 'none',
      }}
      overlayStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
      modal
      repositionOnResize
      closeOnDocumentClick
      closeOnEscape
    >
      <ModalInner
        width={width}
        ref={modalRef}
        id="modalInner"
        $keepLightMode={keepLightMode}
      >
        {!hideCloseIcon ? (
          <IconCloseModal
            className={'w-icon w-icon-close'}
            onClick={onClosePopup}
          />
        ) : null}
        {children}
      </ModalInner>
    </PopupModal>
  )
}

export default Popup

Popup.propTypes = {
  children: PropTypes.node.isRequired,
}
