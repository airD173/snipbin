import React from 'react'
import { styled } from '@css/theme.config'

const ButtonWrapper = styled('div', {
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
})

const ButtonBox = styled('div', {
  width: '50vw',
  '@iPadPro': {
    width: '70vw',
  },
})

const ButtonContainer = styled('div', {
  width: 'fit-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  '&:hover div': {
    opacity: 1,
    visibility: 'visible',
  },
})

const Button = styled('button', {
  background: '$primary',
  padding: 20,
  fontSize: 18,
  color: '$white',
  outline: 'none',
  border: '2px solid $main2',
  transition: '0.1s linear',
  '&:hover, &:focus': {
    border: '2px solid white',
    cursor: 'pointer',
  },
})

const Tooltip = styled('div', {
  background: '$primary',
  padding: 10,
  fontSize: 16,
  color: '$white',
  marginBottom: 150,
  position: 'absolute',
  opacity: 0,
  transition: '0.2s',
  visibility: 'hidden',
  boxShadow: '0px 0px 50px 5px #00000050',
  border: '1px solid $main2',
  zIndex: 99999,
})

const Create: React.FC<{ click: () => void }> = ({ click }) => {
  return (
    <ButtonWrapper>
      <ButtonBox>
        <ButtonContainer>
          <Tooltip>Shift + Enter</Tooltip>
          <Button onClick={click}>Create Paste</Button>
        </ButtonContainer>
      </ButtonBox>
    </ButtonWrapper>
  )
}

export default Create
