import InventoryTable from '../components/Inventory/InventoryTable.js'

export default function UserPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Inventories</h1>
      <InventoryTable type="latest" />
      <h1 className="mt-8 text-2xl font-bold">Shared With Me</h1>
      <InventoryTable type="popular" />
    </div>
  )
}
