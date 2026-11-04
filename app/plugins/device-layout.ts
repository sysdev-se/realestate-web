import { reactive } from 'vue'

export type DeviceLayout = 'mobile' | 'tablet' | 'desktop'

// Tailwind's sm and lg breakpoints: mobile < 640px <= tablet < 1024px <= desktop.
const TABLET_QUERY = '(min-width: 640px)'
const DESKTOP_QUERY = '(min-width: 1024px)'

const COOKIE = 'device-layout'

function isDeviceLayout(value: unknown): value is DeviceLayout {
    return value === 'mobile' || value === 'tablet' || value === 'desktop'
}

// First visit (no cookie yet): a guess from the user agent. Wrong guesses are corrected in the
// browser right after the page loads.
function guessFromUserAgent(userAgent: string | undefined): DeviceLayout {
    if (!userAgent) {
        return 'desktop'
    }
    if (/iPad|Tablet/i.test(userAgent) || (/Android/i.test(userAgent) && !/Mobile/i.test(userAgent))) {
        return 'tablet'
    }
    return /Mobi|iPhone|Android/i.test(userAgent) ? 'mobile' : 'desktop'
}

// Picks the layout (layouts/mobile.vue, tablet.vue, desktop.vue) from the screen width. Only the
// browser knows the width, so it stores its layout in a cookie and the server renders that one
// on the next request. app.vue reads it as this.$deviceLayout.current.
export default defineNuxtPlugin({
    name: 'device-layout',
    setup(nuxtApp): { provide: { deviceLayout: { current: DeviceLayout } } } {
        const cookie = useCookie<string | undefined>(COOKIE, { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
        const initial = isDeviceLayout(cookie.value)
            ? cookie.value
            : guessFromUserAgent(useRequestHeaders(['user-agent'])['user-agent'] ?? (import.meta.client ? navigator.userAgent : undefined))
        const deviceLayout = reactive({ current: initial as DeviceLayout })

        if (import.meta.client) {
            const tablet = window.matchMedia(TABLET_QUERY)
            const desktop = window.matchMedia(DESKTOP_QUERY)
            const update = () => {
                deviceLayout.current = desktop.matches ? 'desktop' : tablet.matches ? 'tablet' : 'mobile'
                cookie.value = deviceLayout.current
            }
            // After hydration, so the first browser render matches the server's HTML.
            nuxtApp.hook('app:mounted', () => {
                update()
                tablet.addEventListener('change', update)
                desktop.addEventListener('change', update)
            })
        }

        return { provide: { deviceLayout } }
    },
})
