import React from 'react'

import { styled } from '@css/theme.config'
import * as Icons from 'react-feather'

const FooterContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  margin: '200px 0 50px 0',
})

export const FooterBox = styled('div', {
  width: '50vw',
  display: 'flex',
  alignItems: 'center',
  height: 50,
  '@iPadPro': {
    width: '70vw',
  },
})

export const FooterText = styled('p', {
  fontSize: '$2',
  fontFamily: '$mono',
  color: '$main2',
  marginRight: 10,
})

export const FooterLink = styled('a', {
  color: '$main2',
  marginLeft: 20,
  '&:hover': {
    color: '$white',
  },
})

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterText>Copyright 2021, Harsh Singh</FooterText>
        <FooterLink href="https://github.com/harshhhdev" target="_blank">
          <Icons.GitHub />
        </FooterLink>
        <FooterLink href="https://twitter.com/harshhhdev" target="_blank">
          <Icons.Twitter />
        </FooterLink>
      </FooterBox>
    </FooterContainer>
  )
}

export default Footer
