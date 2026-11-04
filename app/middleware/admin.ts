// Pages for admins only. The api enforces it anyway; this just keeps others off the forms.
export default defineNuxtRouteMiddleware(() => {
    if (!useNuxtApp().$auth.isAdmin) {
        return navigateTo('/')
    }
})
