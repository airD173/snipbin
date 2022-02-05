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
    fontFamily: '$main',
  },
  'input, textArea, button, select': {
    fontFamily: '$main',
  },
  '.Toastify__toast-body': {
    fontFamily: '$main !important',
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
  code: {
    padding: '0 !important',
  },
})

export default globalStyle
