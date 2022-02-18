import { styled } from '@css/theme.config'

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
})

export const Editor = styled('textarea', {
  backgroundColor: 'transparent',
  resize: 'none',
  width: '100%',
  color: '$white5',
  minHeight: 'calc(100vh - 30px)',
  border: 'none',
  outline: 'none',
  fontSize: '$1',
  paddingTop: 10,
})
