export interface GlobalState {
  name: string | undefined
  selected: string | undefined
}

export interface Theme {
  name: string
  id: string
}

export interface ThemeParameter {
  default?: string
  disable?: boolean
  values: Theme[]
}

export interface ThemeConfig {
  themes: Theme[] | null
  selectedThemeName: string | null
  defaultThemeName: string | null
  disable: boolean
}
