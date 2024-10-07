// linkResolver.js
export const linkResolver = (doc) => {
  // Define the routing logic for different Prismic document types
  if (doc.type === 'about') {
    return '/about'
  }
  if (doc.type === 'projects') {
    return '/projects'
  }
  if (doc.type === 'contact') {
    return '/contact'
  }
  if (doc.type === 'resume') {
    return '/resume'
  }

  // Fallback for any other documents
  return `/${doc.uid}`
}
