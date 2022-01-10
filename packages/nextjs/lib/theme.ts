import { createContext } from 'react'

export const theme = {
  default: {
    title: 'black',
  },
  pages: {
    cowsay: {
      title: 'gold',
    },
  }
}

export const ThemeContext = createContext(theme)
