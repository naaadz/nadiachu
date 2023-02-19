<template>
	<div class="stc-flower" :class="props.static ? 'static' : 'animated'">
		<svg
			id="layer-flower"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 48.35 45.34"
            @mouseenter="shootSprayIn"
            @mouseleave="shootSprayOut"
            ref="flower"
		>
			<defs>
				<clipPath id="clippath-00">
					<path
						class="cls-5"
						d="M38.86,35.75c.27-.1,.4-.39,.31-.66,0,0,0-.01,0-.02-.86-2.79,.2-5.81,2.62-7.45,.96-.62,2.08-.93,3.06-1.51,1.57-.94,2.72-2.73,1.73-4.53-.69-1.23-2.15-1.78-3.48-1.33,.7-4.33-3.14-5.38-5.3-2.41-2.23,3.06-2.49,7.22-1.89,11.05,.41,1.86,.64,3.65,.15,7.43,.48,1.27,2.4,1.21,2.82-.58Z"
					/>
				</clipPath>
				<clipPath id="clippath-100">
					<path
						class="cls-5"
						d="M38.86,35.75c.27-.1,.4-.39,.31-.66,0,0,0-.01,0-.02-.24-.76-.31-1.54-.27-2.31-1.31-1.2-2.89-3.16-2.87-3.07-3.42-4.51-3.33-7.43-4.41-9.88-2.57-5.81-8.86-2.92-7.27,1.7-4.73-2.01-7.37,1.78-4.63,5.41,2.08,2.76,5.43,4,8.64,5.15-.05,0,6.54,3.56,7.35,4.1,.1,.03,.2,.05,.3,.08,.42,1.37,2.43,1.33,2.86-.5Z"
					/>
				</clipPath>
				<clipPath id="clippath-200">
					<path
						class="cls-5"
						d="M28.35,32.07c-3.39-.41-6.75,.93-8.93,3.56-2.99,4.02,.08,8.22,3.31,7.1,.51,2.21,3.87,2.65,5.43-1.02,.41-.97,.62-2.02,1.13-2.95,1.3-2.39,4.16-3.46,6.71-2.5,.42,1.37,2.43,1.33,2.86-.5,.27-.1,.4-.39,.31-.66,0,0,0-.01,0-.02-.13-.44-.21-.88-.25-1.32-5.28-1.04-8.62-1.52-10.69-1.73,.04,.02,.09,.03,.13,.05Z"
					/>
				</clipPath>
			</defs>
			<g class="petal" id="petal-3">
				<g class="cls-8">
					<path
						class="cls-3"
						d="M37.19,39.69s-2.73-10.06,7.94-22.48"
					/>
				</g>
			</g>
			<g class="petal" id="petal-2">
				<g class="cls-7">
					<line
						class="cls-2"
						x1="39.89"
						y1="38.72"
						x2="16.32"
						y2="12.93"
					/>
				</g>
			</g>
			<g class="petal" id="petal-1">
				<g class="cls-6">
					<path
						class="cls-4"
						d="M41.66,35.79s-17.34-8.68-22.6,10.01"
					/>
				</g>
			</g>
			<line
				id="splash-3"
				class="cls-1 splash"
				x1="35.31"
				y1="12.96"
				x2="36.5"
				y2="3.13"
			/>
			<line
				id="splash-2"
				class="cls-1 splash"
				x1="19.24"
				y1="15.5"
				x2="13.01"
				y2="7.56"
			/>
			<line
				id="splash-1"
				class="cls-1 splash"
				x1="12.48"
				y1="30.84"
				x2="2.65"
				y2="29.65"
			/>
		</svg>
	</div>
</template>

<script setup>
import gsap from "gsap"

const flower = ref(null)

const props = defineProps({
	static: {
		type: Boolean,
		default: false,
	}
})

const emit = defineEmits(['flowerTL'])
const flowerTL = gsap.timeline({ paused: true })
const sprayTL = gsap.timeline({ paused: true })
const petalsTL = gsap.timeline({ 
    paused: true, 
    onComplete: () => {
            gsap.timeline().add(sprayTL.restart().play())
    }
})

const shootSprayIn = () => {
    gsap.timeline()
        .add(gsap.to(flower.value, { duration: .2, scale: 1.1, transformOrigin: '50%' }))
        .add(sprayTL.restart().play())
}

const shootSprayOut = () => {
    gsap.timeline()
        .add(gsap.to(flower.value, { duration: .2, scale: 1, transformOrigin: '50%' }))
}

const defineTimelines = () => {
    const petals = flower.value.querySelectorAll('.petal > g > *')
    const splashes = flower.value.querySelectorAll('.splash')

    gsap.set(petals, { strokeDasharray: 30, strokeDashoffset: 30})
    gsap.set(splashes, { strokeDasharray: 15, strokeDashoffset: 15})

    petalsTL  
        .to(petals, { duration: .5, strokeDashoffset: 0, stagger: .1 })

    sprayTL
        .to(splashes, { strokeDashoffset: -15 }, '>-20%')

    flowerTL
        .add(petalsTL.play())
}

onMounted(() => {
    defineTimelines()

    emit('flowerTL', flowerTL)

})
</script>
