import { useState } from 'react'
import ItemsTab from './ItemsTab.jsx'
import DiscussionTab from './DiscussionTab.js'
import SettingsTab from './SettingsTab.jsx'
import FieldsEditorTab from './FieldsEditorTab.js'
import CustomIDTab from './CustomIDTab.js'
import AccessTab from './AccessTab.js'
import StatisticsTab from './StatisticsTab.jsx'

export default function InventoryTabs({ inventoryId }) {
  const tabs = ['Items', 'Discussion', 'Settings', 'Custom IDs', 'Access', 'Fields', 'Statistics']
  const [active, setActive] = useState('Items')

  const renderTab = () => {
    switch(active){
      case 'Items': return <ItemsTab inventoryId={inventoryId} />
      case 'Discussion': return <DiscussionTab inventoryId={inventoryId} />
      case 'Settings': return <SettingsTab inventoryId={inventoryId} />
      case 'Fields': return <FieldsEditorTab inventoryId={inventoryId} />
      case 'Custom IDs': return <CustomIDTab inventoryId={inventoryId} />
      case 'Access': return <AccessTab inventoryId={inventoryId} />
      case 'Statistics': return <StatisticsTab inventoryId={inventoryId} />
      default: return null
    }
  }

  return (
    <div>
      <div className="flex mb-4 border-b">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`p-2 ${active===tab ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActive(tab)}
          >{tab}</button>
        ))}
      </div>
      <div>{renderTab()}</div>
    </div>
  )
}
