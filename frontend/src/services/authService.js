export async function loginUser({email, password}){
  const res = await fetch('/api/auth/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email,password})
  })
  if(!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function registerUser({name,email,password}){
  const res = await fetch('/api/auth/register',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,email,password})
  })
  if(!res.ok) throw new Error('Register failed')
  return res.json()
}

export async function getCurrentUser(){
  const res = await fetch('/api/auth/me')
  if(!res.ok) throw new Error('No user')
  return res.json()
}
