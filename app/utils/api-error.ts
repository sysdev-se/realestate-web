// realestate-api answers errors with problem details ({ title, detail, status }).
export function apiErrorMessage(error: unknown, fallback: string): string {
    const data = (error as { data?: { detail?: string } } | null)?.data
    return data?.detail || fallback
}

export function apiErrorStatus(error: unknown): number | undefined {
    return (error as { statusCode?: number } | null)?.statusCode
}
