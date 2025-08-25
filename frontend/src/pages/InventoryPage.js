import { useParams } from 'react-router-dom'
import InventoryTabs from '../components/Inventory/InventoryTabs.js'

export default function InventoryPage() {
  const { id } = useParams()
  return (
    <div className="p-4">
      <InventoryTabs inventoryId={id} />
    </div>
  )
}
