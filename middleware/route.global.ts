export default defineNuxtRouteMiddleware((to, from) => {
    // Redirect root path to '/about' if not already there
    if (to.path === '/' && to.name !== 'about') {
      return navigateTo('/about')
    }
  
    // Remove trailing slash and redirect with 301 if it's not the root
    if (to.path !== '/' && to.path.endsWith('/')) {
      const { path, query, hash } = to
      const nextPath = path.replace(/\/+$/, '')
      return navigateTo({ path: nextPath, query, hash }, { redirectCode: 301 })
    }
  })