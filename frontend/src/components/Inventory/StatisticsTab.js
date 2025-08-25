export default function StatisticsTab({ inventoryId }) {
  // Placeholder stats
  const stats = { itemsCount: 10, likes: 25 }

  return (
    <div className="space-y-2">
      <div>Items Count: {stats.itemsCount}</div>
      <div>Total Likes: {stats.likes}</div>
    </div>
  )
}
