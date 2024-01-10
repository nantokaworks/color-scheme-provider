import { ReactNode, useEffect, useMemo, useState } from 'react'
import { ColorSchemeContext, ContextValue, SYSTEM_COLOR_SCHEME, SystemColorScheme } from './context'
import { darkModePreference, isNotSSR } from './matchMediaQuery'

type onChangeColorSchemeFunction = (args: {
  colorScheme: string | undefined
  isSystem: boolean
}) => void

type ProviderProps = {
  initialColorScheme?: string
  onChangeColorScheme?: onChangeColorSchemeFunction
  children: ReactNode
}

export function ColorSchemeProvider({
  initialColorScheme,
  onChangeColorScheme,
  children,
}: ProviderProps) {
  const [currentColorScheme, setCurrentColorScheme] = useState<string | undefined>(
    initialColorScheme
  )
  const [systemColorScheme, setSystemColorScheme] = useState<SystemColorScheme | undefined>(
    undefined
  )

  // call onChangeClorScheme when colorScheme is changed
  useEffect(() => {
    if (!onChangeColorScheme) return
    const isSystem = currentColorScheme === undefined
    const colorScheme = currentColorScheme || systemColorScheme || SYSTEM_COLOR_SCHEME.LIGHT

    onChangeColorScheme({ colorScheme, isSystem })
  }, [onChangeColorScheme, currentColorScheme, systemColorScheme])

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
    }
    darkModePreference?.addEventListener('change', handleChange)
    return () => darkModePreference?.removeEventListener('change', handleChange)
  }, [])

  const contextValue = useMemo<ContextValue>(
    () => ({
      colorScheme: currentColorScheme || systemColorScheme || SYSTEM_COLOR_SCHEME.LIGHT,
      systemColorScheme: systemColorScheme || SYSTEM_COLOR_SCHEME.LIGHT,
      setColorScheme: (colorScheme?: string) => {
        setCurrentColorScheme(colorScheme)
      },
    }),
    [currentColorScheme, systemColorScheme]
  )

  return <ColorSchemeContext.Provider value={contextValue}>{children}</ColorSchemeContext.Provider>
}
