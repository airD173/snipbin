import { globalCss } from './theme.config'

const globalStyle = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    scrollBehavior: 'smooth',
  },
  html: {
    overflowX: 'hidden',
  },
  body: {
    background: '$bg',
    overflowX: 'hidden',
    fontFamily: 'iosevka',
  },
  'input, textArea, button, select': {
    fontFamily: 'iosevka',
  },
  '.Toastify__toast-body': {
    fontFamily: 'iosevka !important',
    fontSize: '$1',
  },
  '::selection': {
    background: 'white',
    color: '$bg',
  },
  img: {
    userSelect: 'none',
  },
  '::placeholder': {
    color: '$white1',
  },
  '::-webkit-scrollbar': {
    width: 10,
  },
  '::-webkit-scrollbar-thumb': {
    background: '#4D545E',
  },
  code: {
    padding: '0 !important',
    fontFamily: 'iosevka !important',
  },
  '@font-face': {
    fontFamily: 'iosevka',
    src: 'url(/iosevka.ttf)',
    fontStyle: 'normal',
    fontWeight: 400,
    fontDisplay: 'swap',
  },
})

export default globalStyle
