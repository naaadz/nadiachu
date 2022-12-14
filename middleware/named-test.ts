export default defineNuxtRouteMiddleware((to) => {
    console.log('named test')

    onMounted(() => {
        console.log('named test mounted')
    })
})