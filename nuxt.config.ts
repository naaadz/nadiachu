// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        //pageTransition: { name: 'page', appear: true },
        pageTransition: false,
        layoutTransition: false
    },
    css: [
		'@/assets/css/style.css', '@/assets/scss/style.scss'
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
