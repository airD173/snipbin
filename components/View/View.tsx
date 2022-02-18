import React from 'react'

import * as S from './View.style'
import { Wrapper } from '@components/Editor/Editor.style'
import { Error } from '@components/Editor/Palette'
import Palette from './Palette'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Snip as SnipType, User } from '.prisma/client'

import { compare } from 'bcryptjs'

const View: React.FC<{
  snip: SnipType
  snips: SnipType[] | undefined
  user: User | undefined
  extension: string | undefined
}> = ({ snip, snips, user, extension }) => {
  React.useEffect(() => hljs.highlightAll(), [])

  const passwordInput = React.useRef<HTMLInputElement>(null)
  const [decrypted, setDecrypted] = React.useState(true)

  const ComparePassword = () => {
    return compare(passwordInput.current!.value, snip.password!, (err, res) =>
      res ? setDecrypted(true) : Error('Invalid Password')
    )
  }

  return (
    <Wrapper>
      {decrypted ? (
        <>
          <Palette snip={snip} snips={snips} user={user} />
          <S.Numbers>
            {snip.content.split('\n').map((num, i) => (
              <S.LineNumber className='language-plaintext' key={i}>
                {i + 1}
              </S.LineNumber>
            ))}
          </S.Numbers>
          <S.Editor>
            <S.CodePre
              className={
                extension
                  ? `language-${extension}`
                  : `language-${snip.language}`
              }
            >
              <S.Code>{snip.content}</S.Code>
            </S.CodePre>
          </S.Editor>
        </>
      ) : (
        <S.Form
          onSubmit={(e) => {
            e.preventDefault()
            ComparePassword()
          }}
        >
          <S.Passwordinput
            type='password'
            placeholder='Password...'
            ref={passwordInput}
          />
          <S.FakeInput type='submit' />
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />
        </S.Form>
      )}
    </Wrapper>
  )
}

export default View
