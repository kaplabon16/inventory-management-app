import { useEffect, useState } from 'react'
import { getInventory, updateInventory } from '../../api/inventory.js'
import { useAutosave } from '../../hooks/useAutosave.js'

export default function SettingsTab({ inventoryId }) {
  const [settings, setSettings] = useState({ title: '', description: '', category: '', tags: '' })

  useEffect(() => {
    const fetchData = async () => {
      const res = await getInventory(inventoryId)
      setSettings({ 
        title: res.data.title, 
        description: res.data.description, 
        category: res.data.category,
        tags: res.data.tags.join(', ')
      })
    }
    fetchData()
  }, [inventoryId])

  useAutosave(async () => {
    await updateInventory(inventoryId, { ...settings, tags: settings.tags.split(',').map(t => t.trim()) })
  }, 8000, [settings])

  return (
    <div className="space-y-2">
      <input type="text" className="w-full p-2 border" placeholder="Title" value={settings.title} onChange={e => setSettings({...settings, title: e.target.value})} />
      <textarea className="w-full p-2 border" placeholder="Description" value={settings.description} onChange={e => setSettings({...settings, description: e.target.value})} />
      <input type="text" className="w-full p-2 border" placeholder="Category" value={settings.category} onChange={e => setSettings({...settings, category: e.target.value})} />
      <input type="text" className="w-full p-2 border" placeholder="Tags (comma separated)" value={settings.tags} onChange={e => setSettings({...settings, tags: e.target.value})} />
    </div>
  )
}
