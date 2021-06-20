import { createCss } from '@stitches/react'

export const { css, styled, global, getCssString, keyframes } = createCss({
  theme: {
    colors: {
      main: '#6B7C95',
      main2: '#7B7B7B',
      primary: '#000',
      dark: '#141414',
      white: '#FFFEFE',
    },
    fontSizes: {
      1: '14px',
      2: '18px',
      3: '20px',
      4: '24px',
      5: '36px',
      6: '48px',
    },
    fonts: {
      main: 'Lexend Deca, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
  },
})

export const ContentWrapper = styled('div', {
  position: 'relative',
  overflow: 'hidden',
})
