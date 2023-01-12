// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Nadia Chu, Front-end Developer',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/images/favicon.png' }
            ]
        }
    },
    css: [
		'@/assets/css/style.css', 
        '@/assets/scss/common.scss',
        '@/assets/scss/flower.scss',
        '@/assets/scss/logo.scss',
        '@/assets/scss/pages.scss',
        '@/assets/scss/projects.scss'
	],
    ssr:false,
    modules: [
		'@nuxtjs/tailwindcss',
    ],
    runtimeConfig: {
        firebaseInfo: process.env.FIREBASE_INFO
    }
})
