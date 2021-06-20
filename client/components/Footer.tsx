import React from 'react'

import { styled } from '@css/theme.config'

const FooterContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  margin: '200px 0 50px 0',
})

export const FooterBox = styled('div', {
  width: '50vw',
})

export const FooterText = styled('p', {
  fontSize: '$2',
  fontFamily: '$mono',
  color: '$main2',
})

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterText>Copyright 2021, Harsh Singh</FooterText>
      </FooterBox>
    </FooterContainer>
  )
}

export default Footer
