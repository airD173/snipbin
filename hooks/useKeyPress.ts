import React from 'react'

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = React.useState(false)

  const downHandler = ({ key }: any): void => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }: any): void => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])
  return keyPressed
}

export default useKeyPress
