import PropTypes from 'prop-types'
import React from 'react'
import PopupModal from 'reactjs-popup'
import { HubspotModal, IconCloseModal } from './StyledGeneral'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const Popup = props => {
  const { showPopup, onClosePopup, children } = props
  React.useEffect(() => {
    const body = document.querySelector('body')
    if (showPopup) {
      disableBodyScroll(body)
    } else {
      enableBodyScroll(body)
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
      <HubspotModal>
        <IconCloseModal
          className={'w-icon w-icon-close'}
          onClick={onClosePopup}
        />
        {children}
      </HubspotModal>
    </PopupModal>
  )
}

export default Popup

Popup.propTypes = {
  children: PropTypes.node.isRequired,
}
