import React, { useContext } from 'react'
import FocusTrap from 'focus-trap-react'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'
import Indicators from 'components/Indicators'

export default function SubscriptionModal() {
  const { subscription, setSubscription } = useContext(ModalContext)

  return (
    <FocusTrap active={subscription === 'indicators'} focusTrapOptions={{allowOutsideClick: true, escapeDeactivates: false}}>
      <Modal open={subscription} setOpen={setSubscription} large>
        {subscription === 'indicators' && <Indicators />}
      </Modal>
    </FocusTrap>
  )
}
