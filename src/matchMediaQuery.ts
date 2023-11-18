export const isNotSSR = typeof window !== 'undefined'

export const darkModePrefersMQ = '(prefers-color-scheme: dark)'
export const darkModePreference = isNotSSR ? window.matchMedia(darkModePrefersMQ) : undefined
