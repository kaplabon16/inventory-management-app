import InventoryTable from '../components/Inventory/InventoryTable.js'

export default function HomePage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Latest Inventories</h1>
      <InventoryTable type="latest" />
      <h1 className="mt-8 text-2xl font-bold">Popular Inventories</h1>
      <InventoryTable type="popular" />
    </div>
  )
}
