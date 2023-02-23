import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding-right: 13.25rem;
  line-height: 1.5;
  text-align: right;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 1rem;
    padding-right: 7rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 12.5rem;
    height: 1.125rem;
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 0.5rem;
    opacity: 0.15;

    ${(props) => props.theme.mq.small} {
      width: 6rem;
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: ${(props) => 12.5 - (props.value / 5) * 12.5}rem;
    transform: translateY(-50%) scaleX(1);
    transform-origin: left;
    width: ${(props) => (props.value / 5) * 12.5}rem;
    height: 1.125rem;
    background-color: ${(props) => props.theme.colors.raep[props.value]};
    border-radius: ${(props) =>
      props.value < 5 ? '0.5rem 0 0 0.5rem' : '0.5rem'};
    transition: transform ${(props) => 150 * props.value}ms
      ${(props) => props.index * 100}ms ease-out;

    ${(props) => props.theme.mq.small} {
      right: ${(props) => 6 - (props.value / 5) * 6}rem;
      width: ${(props) => (props.value / 5) * 6}rem;
    }
  }
  &:hover {
    color: ${(props) => props.theme.colors.main};
  }
`
const Superscript = styled.sup`
  font-size: 0.625rem;
  color: ${(props) => props.theme.colors.main};
`
export default function Element(props) {
  const { setModal } = useContext(ModalContext)
  const labels = {
    ambroisies: 'Ambroisies',
    cypres: 'Cupressacées',
    noisetier: 'Noisetier',
    aulne: 'Aulne',
    peuplier: 'Peuplier',
    saule: 'Saule',
    frene: 'Frêne',
    charme: 'Charme',
    bouleau: 'Bouleau',
    platane: 'Platane',
    chene: 'Chêne',
    olivier: 'Olivier',
    tilleul: 'Tilleul',
    chataignier: 'Châtaignier',
    rumex: 'Rumex',
    graminees: 'Graminées',
    plantain: 'Plantain',
    urticacees: 'Urticacées',
    armoises: 'Armoises',
  }

  return (
    <Wrapper index={props.index} visible={props.visible} value={props.value} onClick={() => setModal(props.label)}>
      {labels[props.label]}
      <Superscript> (?)</Superscript>
    </Wrapper>
  )
}
