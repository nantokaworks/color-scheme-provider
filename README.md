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
    onChangeColorScheme={(colorScheme) => {
      console.log(`!! colorScheme -> ${colorScheme}`)
    }}
    onChangeSystemColorScheme={(colorScheme) => {
      console.log(`!! system colorScheme -> ${colorScheme}`)
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
