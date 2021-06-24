import { styled, css } from '@css/theme.config'

export const MainContainer = styled('div', {
  margin: '30px 0',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

export const TitleBox = styled('div', {
  display: 'flex',
  marginTop: 50,
  justifyContent: 'center',
})

export const TitleItems = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '50vw',
  alignItems: 'center',
  '@iPadPro': {
    width: '70vw',
  },
  '@iPhonePlus': {
    flexDirection: 'column',
  },
})

export const Title = styled('a', {
  fontSize: '$6',
  color: '$white',
  fontFamily: '$main',
  textDecoration: 'none',
  fontWeight: 'bolder',
  '@iPhonePlus': {
    marginBottom: 20,
  },
})

export const Lang = styled('select', {
  outline: 'none',
  background: '$primary',
  color: '$white',
  height: 45,
  border: '$main2 2px solid',
  width: 130,
  fontSize: '$2',
  transition: '0.1s linear',
  cursor: 'pointer',
  '&:hover, &:focus': {
    border: '$white 2px solid',
  },
})

export const TitleInput = styled('input', {
  background: '$primary',
  color: '$white',
  fontFamily: '$mono',
  outline: 'none',
  border: '2px solid $main2',
  width: '50vw',
  padding: 20,
  transition: '0.1s linear',
  '&:hover, &:focus': {
    border: '$white 2px solid',
  },
  '@iPadPro': {
    width: '70vw',
  },
})

export const White = css({
  span: {
    color: '$white !important',
  },
})
