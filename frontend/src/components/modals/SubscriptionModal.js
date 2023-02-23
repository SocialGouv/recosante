import React, { useContext } from 'react'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'
import Indicators from 'components/Indicators'

export default function WrapperModal() {
  const { subscription, setSubscription } = useContext(ModalContext)

  return (
    <Modal open={subscription} setOpen={setSubscription} large>
      {subscription === 'indicators' && <Indicators />}
    </Modal>
  )
}
