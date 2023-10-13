export type TPasswordInput = {
  value: string
  placeholder?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  autoFocus?: boolean
}
