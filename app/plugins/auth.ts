import { reactive } from 'vue'

const STORAGE_KEY = 'realestate.session'

interface Session {
    // The api's tokens carry no name or email, so the username is the email used to sign in.
    username: string
    accessToken: string
    refreshToken: string
}

// Who is signed in. Kept in localStorage, so it only exists in the browser: on the server
// (SSR) nobody is signed in. Components read it as this.$auth.
class AuthStore {
    session: Session | null = null

    constructor(private readonly baseURL: string) {
    }

    get signedIn(): boolean {
        return this.session !== null
    }

    get username(): string | null {
        return this.session?.username ?? null
    }

    get isAdmin(): boolean {
        return this.session !== null && rolesOf(this.session.accessToken).includes('ADMIN')
    }

    get accessToken(): string | null {
        return this.session?.accessToken ?? null
    }

    restore(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            this.session = stored ? JSON.parse(stored) as Session : null
        }
        catch {
            this.session = null
        }
    }

    async signIn(email: string, password: string): Promise<void> {
        const tokens = await $fetch<TokenResponse>('/api/v1/auth/signin', {
            baseURL: this.baseURL,
            method: 'POST',
            body: { email, password },
        })
        this.save({ username: email, ...tokens })
    }

    // A new access token from the refresh token; false (and signed out) if that fails.
    async refresh(): Promise<boolean> {
        if (!this.session) {
            return false
        }
        try {
            const { accessToken } = await $fetch<AccessTokenResponse>('/api/v1/auth/refresh', {
                baseURL: this.baseURL,
                method: 'POST',
                body: { refreshToken: this.session.refreshToken },
            })
            this.save({ ...this.session, accessToken })
            return true
        }
        catch {
            this.signOut()
            return false
        }
    }

    signOut(): void {
        this.session = null
        try {
            localStorage.removeItem(STORAGE_KEY)
        }
        catch {
            // Storage blocked: the session just isn't remembered.
        }
    }

    private save(session: Session): void {
        this.session = session
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
        }
        catch {
            // Storage blocked: signed in until the page is reloaded.
        }
    }
}

// Reads the roles claim without verifying the token: only used to decide what to show; the
// api checks the token on every admin call.
function rolesOf(token: string): string[] {
    try {
        const payload = token.split('.')[1]!.replace(/-/g, '+').replace(/_/g, '/')
        const claims = JSON.parse(atob(payload)) as { roles?: string[] }
        return claims.roles ?? []
    }
    catch {
        return []
    }
}

export type { AuthStore }

export default defineNuxtPlugin({
    name: 'auth',
    setup(): { provide: { auth: AuthStore } } {
        const auth = reactive(new AuthStore(useRuntimeConfig().public.apiBase)) as AuthStore
        if (import.meta.client) {
            auth.restore()
        }
        return { provide: { auth } }
    },
})
