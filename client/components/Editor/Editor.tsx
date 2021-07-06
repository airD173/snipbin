import React from 'react'

import * as S from './Editor.style'
import langs from '@components/Langs/Langs'
import Create from '@components/Create'

import { gql, useMutation } from 'urql'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'

export type Result = {
  id: string
  title: string
  code: string
  language: string
}

const Paste = gql`
  mutation ($id: String!, $language: String!, $title: String!, $code: String!) {
    createSnippet(id: $id, language: $language, title: $title, code: $code) {
      id
      language
      title
      code
    }
  }
`

import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/tomorrow-night-bright.css'
import 'codemirror/keymap/sublime'

const Editor: React.FC = () => {
  S.White()

  const router = useRouter()

  const TitleRef = React.useRef<HTMLInputElement>(null)
  const LanguageRef = React.useRef<HTMLSelectElement>(null)
  const [codeValue, setCodeValue] = React.useState('')

  const [createPasteResult, createPaste] = useMutation(Paste)

  const CreatePaste = () => {
    if (codeValue === undefined || codeValue === '') {
      return document.querySelector('.CodeMirror')?.classList.add('invalid')
    }

    const variables = {
      id: nanoid(5),
      title:
        TitleRef.current?.value === '' ? 'untitled' : TitleRef.current?.value,
      code: codeValue,
      language: LanguageRef.current?.value,
    }

    createPaste(variables)
      .then((result) => router.push(result.data.createSnippet.id))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <S.TitleBox>
        <S.TitleItems>
          <S.Title href="/">SnipBin</S.Title>
          <S.Lang ref={LanguageRef}>
            {langs.map((lang, index) => (
              <option key={index} value={lang.value}>
                {lang.lang}
              </option>
            ))}
          </S.Lang>
        </S.TitleItems>
      </S.TitleBox>
      <S.MainContainer>
        <S.TitleInput placeholder="Enter Title..." ref={TitleRef} />
        <CodeMirror
          options={{
            theme: 'tomorrow-night-bright',
            lineNumbers: true,
            keymap: 'sublime',
          }}
          onChange={(editor, data, value) => setCodeValue(value)}
        />
      </S.MainContainer>
      <Create click={CreatePaste} />
    </>
  )
}

export default withUrqlClient(
  () => ({
    url: 'http://localhost:3001/graphql',
  }),
  { ssr: true }
)(Editor)
