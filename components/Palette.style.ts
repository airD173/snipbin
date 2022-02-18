import { styled } from '@css/theme.config'
import { IconType } from 'react-icons/lib'

export type Option = {
  icon: IconType
  text: string
  href: boolean
  onClick?: () => void
  url?: string
  perms?: boolean
}

export const filter = (options: Option[] | undefined, query: string) => {
  if (!query) return options

  return options?.filter((option: Option) => {
    const optionText = option.text.toLowerCase()
    return optionText.includes(query.toLowerCase())
  })
}

export const Container = styled('div', {
  position: 'fixed',
  minHeight: 'calc(100vh + 30px)',
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.5)',
  userSelect: 'none',
})

export const Palette = styled('div', {
  backgroundColor: '$bg',
  height: 400,
  width: 600,
  margin: '8% auto',
  left: 0,
  right: 0,
  borderRadius: 20,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '@iPhonePlus': {
    width: 300,
  },
})

export const SearchContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: 600,
  height: 70,
  padding: 20,
  svg: {
    color: '$white10',
    marginRight: 20,
  },
})

export const Options = styled('div', {
  width: 600,
  overflow: 'hidden scroll',
  '&::-webkit-scrollbar': {
    width: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#3B404B',
  },
})

export const SearchInput = styled('input', {
  border: 'none',
  outline: 'none',
  background: 'none',
  color: '$white10',
  fontSize: '$3',
})

export const InputOption = styled('input', {
  display: 'flex',
  alignItems: 'center',
  width: 600,
  height: 40,
  color: '$white10',
  padding: '10px 20px',
  background: '$bg',
  fontSize: '$1',
  border: 'none',
  textDecoration: 'none',
  outline: 'none',
  svg: {
    marginRight: 10,
  },
})

export const Option = styled('a', {
  display: 'flex',
  alignItems: 'center',
  width: 600,
  height: 40,
  padding: '10px 20px',
  color: '$white1',
  background: '$bg',
  fontSize: '$1',
  border: 'none',
  textDecoration: 'none',
  '&:hover': {
    color: '$bg',
    background: '$white10',
    cursor: 'pointer',
  },
  '&:focus': {
    color: '$bg',
    background: '$white10',
    cursor: 'pointer',
    outline: 'none',
  },
  svg: {
    marginRight: 10,
  },
  variants: {
    header: {
      true: {
        '&:hover': {
          color: '$white1',
          background: '$bg',
          cursor: 'help',
        },
      },
    },
  },
})

export const MobileToggle = styled('div', {
  background: '#393E45',
  width: 'fit-content',
  height: 'fit-content',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 15,
  color: '$white10',
  borderRadius: '100%',
  margin: '10px 0 0 10px',
  '@media (pointer:none), (pointer:coarse)': {
    display: 'flex',
  },
})
