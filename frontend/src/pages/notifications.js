import React from 'react'

import Web from 'components/layout/Web'
import Notifications from 'components/Notifications'

export default function notifications() {
  return (
    <Web title={`Notifications Web`}>
      <Notifications />
    </Web>
  )
}
