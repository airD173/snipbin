import React from 'react'

import * as S from '@components/Editor/Editor.style'
import Palette from './Palette'

import { Snip as SnipType } from '.prisma/client'

const Editor: React.FC<{ snip: SnipType; snips: SnipType[] }> = ({
  snip,
  snips,
}) => {
  const [content, setContent] = React.useState(snip.content)

  // autoFocus doesn't work in React, https://stackoverflow.com/questions/49462561/autofocus-doesnt-work-in-react
  const EditorElement = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    EditorElement.current!.focus()
  }, [])

  return (
    <>
      <Palette snip={snip} content={content} snips={snips} />
      <S.Wrapper>
        <S.Editor
          autoCorrect='false'
          spellCheck='false'
          placeholder='Start typing...'
          defaultValue={snip.content}
          ref={EditorElement}
          onChange={() => setContent(EditorElement.current!.value)}
        />
      </S.Wrapper>
    </>
  )
}

export default Editor
