import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'

const Wrapper = styled.button`
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  border: none;
  background: none;
  cursor: pointer;
`
export default function Delete() {
  const { setDeleteProfile } = useContext(ModalContext)

  return (
    <Wrapper role='button' onClick={() => setDeleteProfile(true)}>
      Me désinscrire
    </Wrapper>
  )
}
