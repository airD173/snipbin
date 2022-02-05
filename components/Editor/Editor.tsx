import React from 'react'

import * as S from './Editor.style'
import Palette from './Palette'

import { Snip as SnipType } from '.prisma/client'
import Link from 'next/link'

const Editor: React.FC<{ snips: SnipType[] | undefined }> = ({ snips }) => {
  const [content, setContent] = React.useState('')

  // autoFocus doesn't work in React, https://stackoverflow.com/questions/49462561/autofocus-doesnt-work-in-react
  const EditorElement = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => EditorElement.current!.focus(), [])

  return (
    <>
      <Palette content={content} snips={snips} />
      <S.Wrapper>
        <S.Editor
          autoCorrect='false'
          spellCheck='false'
          placeholder='Start typing...'
          ref={EditorElement}
          onChange={() => setContent(EditorElement.current!.value)}
        />
      </S.Wrapper>
    </>
  )
}

export default Editor
