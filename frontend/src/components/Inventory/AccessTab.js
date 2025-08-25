import { useState } from 'react'

export default function AccessTab({ inventoryId }) {
  const [users, setUsers] = useState([{ id:1, name:'User1' }, { id:2, name:'User2' }])
  const [newUser, setNewUser] = useState('')

  const addUser = () => {
    if(newUser.trim()) {
      setUsers(prev => [...prev, { id: prev.length+1, name: newUser }])
      setNewUser('')
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input type="text" className="flex-1 p-2 border" placeholder="User email" value={newUser} onChange={e=>setNewUser(e.target.value)} />
        <button onClick={addUser} className="px-2 text-white bg-primary">Add</button>
      </div>
      <ul className="pl-5 list-disc">
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  )
}
