import { Button, Code, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField, PriceTypePopover, RadioField } from './components'
import { formSchema } from './schema'
import { FormData, RadioItem } from './types'

const defaultValues: FormData = {
  name: '',
  email: '',
  price: { type: 'range', amount: null },
}

const radioItems: RadioItem[] = [
  { value: 'range', label: 'Range' },
  { value: 'fixed', label: 'Fixed' },
]

export const Form = () => {
  const [formData, setFormData] = useState<FormData>()
  const [amount, setAmount] = useState<number>()

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const priceType: string | undefined = watch('price.type')
  const priceTypeDefault: string | undefined = getValues('price.type')

  const onSubmit = (data: FormData) => {
    setFormData(data)

    if (typeof data?.price?.amount === 'number') {
      setAmount(data.price.amount)
    } else if (
      typeof data?.price?.amount === 'object' &&
      data?.price?.amount?.max
    ) {
      setAmount(data?.price?.amount?.max)
    }
  }

  const resetPage = () => {
    setFormData(undefined)
    reset()
  }

  return (
    <Flex padding={8} justifyContent="center">
      {!formData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8} maxWidth={['unset', '30em']} margin={'0 auto'}>
            <Stack spacing={4}>
              <Flex justifyContent="center">
                <Text fontSize="6xl" lineHeight="1">
                  💸
                </Text>
              </Flex>
              <Heading as="h1" size="3xl" noOfLines={1} textAlign="center">
                Remuneration
              </Heading>
              <Text fontSize="xl" textAlign="center">
                How much do you want to get paid for working at Ignition?
              </Text>
            </Stack>
            <Stack spacing={4}>
              <InputField
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                register={register}
                error={errors.name}
              />

              <InputField
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                register={register}
                error={errors.email}
              />

              <RadioField
                name="price.type"
                label="Price Type"
                defaultValue={priceTypeDefault}
                items={radioItems}
                register={register}
              >
                <PriceTypePopover />
              </RadioField>

              {priceType === 'fixed' && (
                <InputField
                  id="fixed-amount"
                  name="price.amount"
                  label="Amount"
                  type="number"
                  placeholder="Enter amount"
                  register={register}
                  error={errors?.price?.amount}
                  inputLeftAddon="$"
                />
              )}

              {priceType === 'range' && (
                <Flex gap={4}>
                  <InputField
                    id="min-amount"
                    name="price.amount.min"
                    label="Min"
                    type="number"
                    placeholder="Enter min amount"
                    register={register}
                    // @todo: Can't work out why TS doesn't like the errors at this depth.
                    // @ts-ignore
                    error={errors?.price?.amount || errors?.price?.amount?.min}
                    inputLeftAddon="$"
                  />
                  <InputField
                    id="max-amount"
                    name="price.amount.max"
                    label="Max"
                    type="number"
                    placeholder="Enter max amount"
                    register={register}
                    // @todo: Can't work out why TS doesn't like the errors at this depth.
                    // @ts-ignore
                    error={errors?.price?.amount || errors?.price?.amount?.max}
                    inputLeftAddon="$"
                  />
                </Flex>
              )}
            </Stack>
            <Flex flexDirection={['column', 'row-reverse']}>
              <Button
                type="submit"
                colorScheme="blue"
                data-testid="submit-button"
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </form>
      )}
      {formData && (
        <Stack spacing={16}>
          <Stack alignItems="center" spacing={8}>
            <Heading as="h1" size="4xl">
              Congratulations, {formData.name}
            </Heading>
            <Heading as="h2" size="2xl">
              You got the job!
            </Heading>
          </Stack>

          <Text fontSize="xl" textAlign="center">
            <>
              We are prepared to offer you ${amount} for the role of Senior
              Frontend Engineer
            </>
          </Text>
          <Stack spacing={4}>
            <Heading as="h3" size="md">
              Data submitted:
            </Heading>

            <Code padding={4}>
              <pre>
                {JSON.stringify(JSON.parse(JSON.stringify(formData)), null, 2)}
              </pre>
            </Code>
          </Stack>
          <Button
            onClick={resetPage}
            colorScheme="red"
            background="rgb(223, 50, 12)" // Ignition orange ;)
          >
            Try again
          </Button>
        </Stack>
      )}
    </Flex>
  )
}
