import { styled } from '@stitches/react'

export const CodePre = styled('pre', {
  margin: 0,
  maxWidth: '95vw',
  overflowWrap: 'break-word',
})

export const Code = styled('code', {})

export const Editor = styled('div', {
  backgroundColor: 'transparent',
  resize: 'none',
  width: '100%',
  color: '$white10',
  minHeight: 'calc(100vh - 30px)',
  border: 'none',
  outline: 'none',
  fontSize: '$1',
  lineHeight: 1.3,
  background: '$bg',
  paddingTop: 20,
})

export const Numbers = styled('div', {
  textAlign: 'end',
  userSelect: 'none',
  padding: '20px 20px 0 20px',
})

export const LineNumber = styled('div', {
  color: '$white1',
  fontSize: '$1',
  lineHeight: 1.3,
})

export const Form = styled('form', {
  display: 'flex',
  height: '90vh',
  width: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Passwordinput = styled('input', {
  padding: 20,
  border: 'none',
  outline: 'none',
  background: '#3E434D',
  fontSize: '$2',
  color: '$white10',
  borderRadius: 5,
  width: '30vw',
})

export const FakeInput = styled('input', {
  display: 'none',
})
