import { global } from './theme.config'

const globalStyle = global({
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
    background: '$dark',
    overflowX: 'hidden',
  },
  '::selection': {
    background: '#F81DE4',
    color: '$white',
  },
  img: {
    userSelect: 'none',
  },
  'body::-webkit-scrollbar': {
    width: 10,
  },
  'body::-webkit-scrollbar-track': {
    background: 'none',
  },
  'body::-webkit-scrollbar-thumb': {
    background: '$main',
  },
  '.CodeMirror': {
    width: '50vw',
    height: '500px !important',
    fontSize: '14px !important',
    border: '2px solid $main2',
    fontFamily: '$mono !important',
    transition: '0.1s linear',
    '&:hover, &:focus': {
      border: '2px solid $white',
    },
    '@iPadPro': {
      width: '70vw',
    },
  },
  '.invalid': {
    border: '2px solid #FF6161',
  },
})

export default globalStyle
