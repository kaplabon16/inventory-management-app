import prisma from '../config/db.js'

// Add this missing function for getting current user profile
export async function getCurrentUser(req, res) {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: req.user.id },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        isAdmin: true, 
        blocked: true,
        theme: true,
        language: true,
        createdAt: true
      }
    })
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({ message: 'Failed to get user profile' })
  }
}

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({ 
      select: { 
        id: true, 
        name: true, 
        email: true, 
        isAdmin: true, 
        blocked: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Failed to get users' })
  }
}

export async function blockUser(req, res) {
  try {
    const { id } = req.params
    const user = await prisma.user.update({ 
      where: { id: parseInt(id) }, 
      data: { blocked: true },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        isAdmin: true, 
        blocked: true
      }
    })
    res.json(user)
  } catch (error) {
    console.error('Block user error:', error)
    res.status(500).json({ message: 'Failed to block user' })
  }
}

export async function unblockUser(req, res) {
  try {
    const { id } = req.params
    const user = await prisma.user.update({ 
      where: { id: parseInt(id) }, 
      data: { blocked: false },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        isAdmin: true, 
        blocked: true
      }
    })
    res.json(user)
  } catch (error) {
    console.error('Unblock user error:', error)
    res.status(500).json({ message: 'Failed to unblock user' })
  }
}

export async function makeAdmin(req, res) {
  try {
    const { id } = req.params
    const user = await prisma.user.update({ 
      where: { id: parseInt(id) }, 
      data: { isAdmin: true },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        isAdmin: true, 
        blocked: true
      }
    })
    res.json(user)
  } catch (error) {
    console.error('Make admin error:', error)
    res.status(500).json({ message: 'Failed to make user admin' })
  }
}

export async function removeAdmin(req, res) {
  try {
    const { id } = req.params
    const user = await prisma.user.update({ 
      where: { id: parseInt(id) }, 
      data: { isAdmin: false },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        isAdmin: true, 
        blocked: true
      }
    })
    res.json(user)
  } catch (error) {
    console.error('Remove admin error:', error)
    res.status(500).json({ message: 'Failed to remove admin rights' })
  }
}