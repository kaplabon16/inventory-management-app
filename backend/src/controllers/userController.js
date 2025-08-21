import prisma from '../prisma/client.js'

export async function getUsers(req,res){
  const users = await prisma.user.findMany({ select:{id,name,email,isAdmin,blocked} })
  res.json(users)
}

export async function blockUser(req,res){
  const { id } = req.params
  const user = await prisma.user.update({ where:{id:parseInt(id)}, data:{blocked:true} })
  res.json(user)
}

export async function unblockUser(req,res){
  const { id } = req.params
  const user = await prisma.user.update({ where:{id:parseInt(id)}, data:{blocked:false} })
  res.json(user)
}

export async function makeAdmin(req,res){
  const { id } = req.params
  const user = await prisma.user.update({ where:{id:parseInt(id)}, data:{isAdmin:true} })
  res.json(user)
}

export async function removeAdmin(req,res){
  const { id } = req.params
  const user = await prisma.user.update({ where:{id:parseInt(id)}, data:{isAdmin:false} })
  res.json(user)
}
