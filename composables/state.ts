
export const useConfigVariables = () => {
    const config = useRuntimeConfig()
}

export const useScreensize = () => {
	let windowWidth = ref(0)
	let isMobile = ref(false)
	let size = ref(null)

    const handleResize = () => {
        console.log('window.innerWidth', window.innerWidth)
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

export const usePages = () => {
    const router = useRouter()
    const routes = router.getRoutes()
    //put the routes in order of the nav
    return [routes[0], routes[3], routes[2], routes[1]]
}