import { createContext } from 'react'

type ConstEnum<T, V = string> = Extract<T[keyof T], V>

export const SYSTEM_COLOR_SCHEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const
export type SystemColorScheme = ConstEnum<typeof SYSTEM_COLOR_SCHEME>

export type ContextValue = {
  colorScheme?: string
  systemColorScheme: SystemColorScheme
  setColorScheme: (colorScheme: string) => void
}

const defaultValue: ContextValue = {
  colorScheme: undefined, // undefined = system
  systemColorScheme: SYSTEM_COLOR_SCHEME.LIGHT,
  setColorScheme: (_colorScheme?: string) => undefined,
}

export const ColorSchemeContext = createContext<ContextValue>(defaultValue)
