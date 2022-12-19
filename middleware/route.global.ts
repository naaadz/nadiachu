
export default defineNuxtRouteMiddleware((to, from) => {
    //console.log('middleware:', to.path)

    if (to.path === '/') {
        return navigateTo('/about')
    }
    
    return
    
  })