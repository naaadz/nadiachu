
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('i ran')
    if (to.path === '/') {
        return navigateTo('/about')
    }
    
  })