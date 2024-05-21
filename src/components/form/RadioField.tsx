import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import { RadioFieldProps, RadioItem } from '../../types'

export const RadioField: React.FC<RadioFieldProps> = ({
  name,
  label,
  items,
  defaultValue,
  register,
  error,
  children,
}) => (
  <FormControl isInvalid={!!error}>
    <Flex alignItems="baseline">
      {label && <FormLabel>Price Type</FormLabel>}
      {children}
    </Flex>
    <RadioGroup defaultValue={defaultValue}>
      <Flex gap={4}>
        {items.map(({ value, label }: RadioItem) => (
          <Radio
            value={value}
            {...register(name)}
            key={value}
            data-testid={`${value}-type`}
          >
            {label}
          </Radio>
        ))}
      </Flex>
    </RadioGroup>
    {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>
)
