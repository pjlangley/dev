import { createContext } from 'react'

export const theme = {
  default: {
    title: 'black',
  },
  pages: {
    cowsay: {
      title: 'rgb(167 243 208)',
    },
  }
}

export const ThemeContext = createContext(theme)
