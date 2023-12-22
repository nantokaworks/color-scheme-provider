import type { ReactNode } from 'react'
import { ColorSchemeProvider, useColorScheme } from '.'

type ProviderProps = {
  children: ReactNode
}

export function SystemColorSchemeProvider({ children }: ProviderProps) {
  return (
    <ColorSchemeProvider>
      <InnerColorSchemaProvider>{children}</InnerColorSchemaProvider>
    </ColorSchemeProvider>
  )
}

function InnerColorSchemaProvider({ children }: ProviderProps) {
  const { colorScheme } = useColorScheme()

  return (
    <ColorSchemeProvider>
      <div data-color-mode={colorScheme}>{children}</div>
    </ColorSchemeProvider>
  )
}
