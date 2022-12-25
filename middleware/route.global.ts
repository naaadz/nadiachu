
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('i ran')
    if (to.path === '/') {
        return navigateTo('/about')
    }

    // remove trailing slash in url if it got there somehow
    //otherwise, nuxt will try to add a child route to it with next() 
    //in the beforeEach hook

    if (to.path !== '/' && to.path.endsWith('/')) {
        const { path, query, hash } = to
        const nextPath = path.replace(/\/+$/, '') || '/'
        const nextRoute = { path: nextPath, query, hash }
        return navigateTo(nextRoute, { redirectCode: 301 })
      }
    
  })