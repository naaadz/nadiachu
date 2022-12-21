// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        //pageTransition: { name: 'page', appear: true },
        pageTransition: false,
        layoutTransition: false
    },
    css: [
		'@/assets/css/style.css', 
        '@/assets/scss/common.scss',
        '@/assets/scss/flower.scss',
        '@/assets/scss/logo.scss',
        '@/assets/scss/pages.scss'
	],
    ssr:false,
    modules: [
		'@nuxtjs/tailwindcss'
	],
    runtimeConfig: {
        sportRadarAPIkey: process.env.SPORT_RADAR_API_KEY,
        firebaseInfo: process.env.FIREBASE_INFO,
        public: {

        }
    }
})
