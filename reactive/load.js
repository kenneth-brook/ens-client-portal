async function loadRoleBasedFeatures(userData) {
  let roleModule

  switch (userData.role) {
    case 'Super Admin':
      roleModule = await import('../roles/superAdmin.js')
      break
    case 'Admin':
      roleModule = await import('../roles/admin.js')
      break
    case 'User':
      roleModule = await import('../roles/user.js')
      break
    default:
      console.error('Unknown role:', userData.role)
      return // Optionally, handle unknown roles
  }

  // Assuming each module exports an init function named `init<Role>Features`
  if (roleModule && roleModule.initFeatures) {
    roleModule.initFeatures()
  } else {
    console.error('Initialization function missing for role:', userData.role)
  }
}

export { loadRoleBasedFeatures }
