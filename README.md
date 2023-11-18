# @ichiql/react-color-scheme

```shell
pnpm add @ichiql/react-color-scheme
npm install @ichiql/react-color-scheme
yarn add @ichiql/react-color-scheme
```

React で OS のカラースキーム(テーマ)変更に対応する

React to support OS color scheme (theme) changes.

```js
import { ColorSchemeProvider, useColorScheme } from '@ichiql/react-color-scheme'

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
