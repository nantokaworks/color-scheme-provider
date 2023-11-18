import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  ColorSchemeContext,
  ContextValue,
  SYSTEM_COLOR_SCHEME,
  SystemColorScheme,
  darkModePreference,
  isNotSSR,
} from '.'

type ProviderProps = {
  initialColorScheme?: string
  onChangeColorScheme?: (colorScheme?: string) => undefined
  onChangeSystemColorScheme?: (colorScheme: SystemColorScheme) => undefined
  children: ReactNode
}

export const ColorSchemeProvider = React.memo(
  ({
    initialColorScheme,
    onChangeColorScheme,
    onChangeSystemColorScheme,
    children,
  }: ProviderProps) => {
    const [currentColorScheme, setCurrentColorScheme] = useState<string | undefined>(
      initialColorScheme
    )
    const [systemColorScheme, setSystemColorScheme] = useState<SystemColorScheme | undefined>(
      undefined
    )

    const contextValue = useMemo<ContextValue>(() => {
      return {
        colorScheme: currentColorScheme || systemColorScheme || SYSTEM_COLOR_SCHEME.LIGHT,
        systemColorScheme: systemColorScheme || SYSTEM_COLOR_SCHEME.LIGHT,
        setColorScheme: (colorScheme?: string) => {
          setCurrentColorScheme(colorScheme)
          onChangeColorScheme ? onChangeColorScheme(colorScheme) : null
        },
      }
    }, [currentColorScheme, systemColorScheme])

    useEffect(() => {
      if (!isNotSSR) {
        setSystemColorScheme(SYSTEM_COLOR_SCHEME.LIGHT)
        return
      }

      setSystemColorScheme(
        darkModePreference?.matches ? SYSTEM_COLOR_SCHEME.DARK : SYSTEM_COLOR_SCHEME.LIGHT
      )

      const handleChange = (evenet: MediaQueryListEvent) => {
        const newSystemColorScheme = evenet.matches
          ? SYSTEM_COLOR_SCHEME.DARK
          : SYSTEM_COLOR_SCHEME.LIGHT
        setSystemColorScheme(newSystemColorScheme)
        onChangeSystemColorScheme ? onChangeSystemColorScheme(newSystemColorScheme) : null
      }
      darkModePreference?.addEventListener('change', handleChange)
      return () => darkModePreference?.removeEventListener('change', handleChange)
    }, [])

    return (
      <ColorSchemeContext.Provider value={contextValue}>{children}</ColorSchemeContext.Provider>
    )
  }
)
