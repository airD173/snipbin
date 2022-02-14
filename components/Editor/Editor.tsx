import React from 'react'

import * as S from './Editor.style'
import { Numbers, LineNumber } from '@components/View/View.style'
import Palette from './Palette'

import { Snip as SnipType } from '.prisma/client'

const Editor: React.FC<{ snips: SnipType[] | undefined; text?: string }> = ({
  snips,
  text,
}) => {
  const [content, setContent] = React.useState('')

  // autoFocus doesn't work in React, https://stackoverflow.com/questions/49462561/autofocus-doesnt-work-in-react
  const EditorElement = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => EditorElement.current!.focus(), [])

  return (
    <>
      <Palette content={content} snips={snips} />
      <S.Wrapper>
        <Numbers>
          <LineNumber className='language-plaintext'>&gt;</LineNumber>
        </Numbers>
        <S.Editor
          defaultValue={text}
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
