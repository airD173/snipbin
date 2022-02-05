import { createStitches } from '@stitches/react'
import { White, Black } from 'kraftuur'

export const { css, styled, globalCss, getCssText, keyframes, createTheme } =
  createStitches({
    theme: {
      colors: {
        ...White,
        ...Black,
        bg: '#282C34',
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
        main: 'Fira Code, monospace',
      },
    },
    media: {
      iPadPro: '(max-width: 1024px)',
      iPad: '(max-width: 768px)',
      iPhonePlus: '(max-width: 425px)',
      iPhone: '(max-width: 375px)',
      iPhoneSE: '(max-width: 320px)',
    },
  })
