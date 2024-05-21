import { FieldError, UseFormRegister } from 'react-hook-form'

export type PriceAmount = {
  min?: number | null
  max?: number | null
}

export type FormData = {
  name: string
  label?: string
  email: string
  price?: {
    type: 'range' | 'fixed'
    amount?: PriceAmount | number | null
  }
}

export type InputFieldProps = {
  id: string
  type: string
  placeholder: string
  name: ValidFieldNames
  label?: string
  register: UseFormRegister<FormData>
  error: FieldError | undefined
  inputLeftAddon?: string
}

export type RadioFieldProps = {
  name: ValidFieldNames
  label?: string
  items: RadioItem[]
  defaultValue?: string
  register: UseFormRegister<FormData>
  error?: FieldError | undefined
  children: React.ReactNode
}

export type RadioItem = {
  label: string
  value: string
}

export type ValidFieldNames =
  | 'price.type'
  | 'price.amount'
  | 'price.amount.min'
  | 'price.amount.max'
  | 'name'
  | 'label'
  | 'email'
