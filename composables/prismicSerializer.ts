import { linkResolver } from '~/prismic/linkResolver'

// Create the composable to return the serializer and manage event listeners
export function usePrismicSerializer() {
  const router = useRouter()

  const serializer = {
    hyperlink: ({ node, children }) => {
      const url = usePrismic().asLink(node.data, { linkResolver })

      // For internal links, render a button with a data-url attribute
      if (node.data.link_type === 'Document') {
        return `<button class="internal-link" data-url="${url}">${children}</button>`
      }

      // For external links, return a standard anchor tag
      return `<a href="${url}" target="_blank" rel="noopener">${children}</a>`
    }
  }

  // Handle click events for internal buttons
  const handleClick = (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('internal-link')) {
      const targetUrl = event.target.getAttribute('data-url')
      router.push(targetUrl)
    }
  }

  // Add event listeners for internal link buttons
  onMounted(() => {
    document.addEventListener('click', handleClick)
  })

  // Clean up the event listener when the component is destroyed
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick)
  })

  return { serializer }
}
