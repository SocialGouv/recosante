import React, { useEffect, useContext } from 'react'

import { useUserDeletion } from 'hooks/useUser'
import ModalContext from 'utils/ModalContext'
import Button from 'components/base/Button'
import Modal from 'components/base/Modal'
import MagicLink from 'components/base/MagicLink'

export default function DeleteModal() {
  const { deleteProfile, setDeleteProfile } = useContext(ModalContext)

  const mutation = useUserDeletion()

  const reset = mutation.reset
  useEffect(() => {
    reset()
  }, [deleteProfile, reset])

  return (
    <Modal open={deleteProfile} setOpen={setDeleteProfile}>
      <h3>Désinscription</h3>
      {mutation.isSuccess ? (
        <>
          <p>
            Votre demande de désinscription a bien été prise en compte. Vous allez recevoir sous peu un email de confirmation.
          </p>
        </>
      ) : (
        <>
          <p>
            <em>Vous n’êtes pas satisfait·e du service Recosanté ?</em><br />
            Ne partez pas si vite ! Vous pouvez choisir de recevoir les indicateurs moins souvent, ou bien vous désabonner uniquement de l’infolettre du jeudi, par exemple.<br /><br />
            <em>Vous souhaitez nous quitter pour une autre raison ?</em><br />
            <MagicLink to='https://nx12723.your-storageshare.de/apps/forms/y8762rGaiYAZAmRW'>Expliquez-nous pourquoi ici</MagicLink> afin que nous puissions en tenir compte pour faire évoluer le service.
          </p>
          <Button.Wrapper center>
            <Button hollow onClick={() => setDeleteProfile(false)}>
              Annuler
            </Button>
            <Button onClick={() => mutation.mutate()}>
              Me désinscrire
            </Button>
          </Button.Wrapper>
        </>
      )}
    </Modal>
  )
}
