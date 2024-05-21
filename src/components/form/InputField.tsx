import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react'
import { InputFieldProps } from '../../types'

export const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  placeholder,
  name,
  label,
  register,
  error,
  inputLeftAddon,
}) => (
  <FormControl isInvalid={!!error}>
    {label && <FormLabel>{label}</FormLabel>}
    <InputGroup>
      {inputLeftAddon && <InputLeftAddon>$</InputLeftAddon>}

      <Input
        type={type}
        data-testid={id}
        placeholder={placeholder}
        {...register(name, {
          // Sigh, type must be wrong. Docs say it's a boolean. https://react-hook-form.com/docs/useform/register#options
          valueAsNumber: type === 'number' ? true : undefined,
        })}
      />
    </InputGroup>
    {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>
)
