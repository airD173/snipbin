import { useEffect } from 'react'

const useShortcut = (key: string, ctrl: boolean, handler: () => void) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (ctrl) {
        if (e.ctrlKey && e.key === key) {
          e.preventDefault()
          handler()
        }
      } else {
        if (e.key === key) {
          e.preventDefault()
          handler()
        }
      }
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [key, handler])
}

export default useShortcut
