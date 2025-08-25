import { useState } from 'react'

export function useDragDrop(initialItems) {
  const [items, setItems] = useState(initialItems)

  const moveItem = (fromIndex, toIndex) => {
    const updated = [...items]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    setItems(updated)
  }

  return { items, moveItem, setItems }
}
