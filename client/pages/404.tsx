import React from 'react'

import global from '@css/global.style'
import ReactLoading from 'react-loading'

import { styled } from '@css/theme.config'

const MainContainer = styled('div', {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const NotFound: React.FC = () => {
  global()
  return (
    <MainContainer>
      <ReactLoading type="bars" />
    </MainContainer>
  )
}

export default NotFound
