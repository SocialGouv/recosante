import React, { useState, useEffect } from 'react'

import UXContext from 'utils/UXContext'

export default function UXProvider(props) {
  const [embedOpen, setEmbedOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [typeShare, setTypeShare] = useState('simulator')

  const [installPrompt, setInstallPrompt] = useState(null)
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      setInstallPrompt(e)
    })
  }, [])

  return (
    <UXContext.Provider
      value={{
        embedOpen,
        toggleEmbedOpen: () => {
          setShareOpen(false)
          setTypeShare('simulator')
          setEmbedOpen((prevOpen) => !prevOpen)
        },
        shareOpen,
        toggleShareOpen: () => {
          setEmbedOpen(false)
          setTypeShare('simulator')
          setShareOpen((prevOpen) => !prevOpen)
        },
        typeShare,
        setTypeShare,
        installPrompt,
      }}
    >
      {props.children}
    </UXContext.Provider>
  )
}
