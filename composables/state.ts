export const useConfigVariables = () => {
    const config = useRuntimeConfig()
}

export const useScreensize = () => {
	let windowWidth = ref(0)
	let isMobile = ref(false)
	let size = ref(null)

    const handleResize = () => {
		windowWidth.value = window.innerWidth

		if (windowWidth.value >= 1024) {
			isMobile.value = false
		} else {
			isMobile.value = true
		}

		switch (true) {
			case windowWidth.value >= 1280:
				size.value = "xl"
				break
			case windowWidth.value >= 1024:
				size.value = "lg"
				break
			case windowWidth.value >= 768:
				size.value = "md"
				break
			case windowWidth.value >= 640:
				size.value = "sm"
				break
			default:
				size.value = "default"
		}

        console.log('isMobile', isMobile.value)
    }

	onMounted(() => {
        window.addEventListener("resize", debounce(handleResize, 2000))
		handleResize()
	})

	return { isMobile, size }
}

const debounce = (callback, delay) => {
    let timeoutId;
  
    return () => {
      // cancel the debounce if it has not yet been executed
      clearTimeout(timeoutId)
      // specify the delay time for the debounce
      timeoutId = setTimeout(() => {
        // call the callback function
        callback()
      }, delay)
    }
  }

// export const useGoTo = (to, callback) => {
//     const route = useRoute()
//     const router = useRouter()

//     const from = route.name
//     console.log('state goTo: route:', to)

//     if (from !== to) {
//         //route changed so do something
//         callback
//     }
// }