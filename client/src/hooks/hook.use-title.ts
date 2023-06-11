import { useEffect, useState } from 'react'

export const useTitle = (titleValue: string) => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    window.document.title = titleValue
    setTitle(titleValue)
  }, [])

  return { title }
}
