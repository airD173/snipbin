import React from 'react'

import { useRouter } from 'next/router'

import { gql, useQuery } from 'urql'
import { withUrqlClient } from 'next-urql'

import Head from '@components/Head'
import Loading from './../../pages/404'
import * as S from '@components/Editor/Editor.style'

import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/tomorrow-night-bright.css'
import 'codemirror/keymap/sublime'

const Paste = gql`
  query ($id: String!) {
    findSnippet(id: $id) {
      id
      title
      code
      language
    }
  }
`

const View: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const [pasteResult, getPaste] = useQuery({
    query: Paste,
    variables: {
      id: id,
    },
  })

  if (pasteResult.data != undefined) {
    pasteResult.data.findSnippet.language === 'text'
      ? S.White()
      : require(`codemirror/mode/${pasteResult.data.findSnippet.language}/${pasteResult.data.findSnippet.language}`)

    return (
      <>
        <Head title={pasteResult.data.findSnippet.title} />
        <S.TitleBox>
          <S.TitleItems>
            <S.Title href="/">SnipBin</S.Title>
          </S.TitleItems>
        </S.TitleBox>
        <S.MainContainer>
          <S.TitleInput value={pasteResult.data.findSnippet.title} />
          <CodeMirror
            value={pasteResult.data.findSnippet.code}
            options={{
              theme: 'tomorrow-night-bright',
              lineNumbers: true,
              keymap: 'sublime',
              readOnly: true,
              language: pasteResult.data.findSnippet.language,
            }}
          />
        </S.MainContainer>
      </>
    )

    console.log(pasteResult.data.findSnippet.language)
  } else {
    return <Loading />
  }
}

export default withUrqlClient(
  () => ({
    url: 'http://localhost:3001/graphql',
  }),
  { ssr: true }
)(View)
