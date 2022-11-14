// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
		'@/assets/css/style.css',
	],
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
