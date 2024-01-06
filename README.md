# color-scheme-provider

```shell
pnpm add color-scheme-provider
npm install color-scheme-provider
yarn add color-scheme-provider
```

React で OS のカラースキーム(テーマ)変更に対応する

React to support OS color scheme (theme) changes.

```js
import { ColorSchemeProvider, useColorScheme } from 'color-scheme-provider'

return (
  <ColorSchemeProvider
    initialColorScheme={undefined}
    onChangeColorScheme={(colorScheme, isSystemColorScheme) => {
      console.log(`!!! colorScheme -> ${colorScheme} / isSystem -> ${isSystemColorScheme}`)
    }}
  >
    ~~~
  </ColorSchemeProvider>
)

const { colorScheme } = useColorScheme()

return (
  <html
    lang='en'
    data-color-mode={colorScheme}
  >
~~~
</html>
```
