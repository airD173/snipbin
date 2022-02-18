import { useEffect } from 'react'

const useClickOutside = (id: string, handler: () => void) => {
  useEffect(() => {
    const listener = (e: Event) => {
      if (e.target instanceof Element && e.target.id === 'dialogue') handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [id, handler])
}

export default useClickOutside
