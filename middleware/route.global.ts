
export default defineNuxtRouteMiddleware((to, from) => {
    // const a = 1
    console.log('middleware:', to.path)
    

    if (to.path === '/') {
        return navigateTo('/about')
    }

    // gsap.timeline()
    //     .to()

    // setTimeout(() => {
    //     console.log('animate-to global')
    //     return navigateTo("/projects")
    // },5000)
    

    // onMounted(() => {
    //     console.log('how to mount in middlware?')
    // })
    

    return
    
  })