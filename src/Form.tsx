import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Stack, Button, Heading, Text } from '@chakra-ui/react'
import { FormData, RadioItem } from './types'
import { InputField, RadioField, PriceTypePopover } from './components'
import { formSchema } from './schema'
import { useState } from 'react'

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
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const priceType: string | undefined = watch('price.type')
  const priceTypeDefault: string | undefined = getValues('price.type')

  // The callback to use when the form is submitted
  const saveData = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <Stack spacing={8} padding={8} maxWidth="30rem" margin={'0 auto'}>
        <Stack spacing={4}>
          <Flex justifyContent="center">
            <Text fontSize="6xl" lineHeight="1">
              💸
            </Text>
          </Flex>
          <Heading as="h1" size="4xl">
            Remuneration
          </Heading>
          <Text fontSize="xl">
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
                error={errors?.price?.amount || errors?.price?.amount?.max}
                inputLeftAddon="$"
              />
            </Flex>
          )}
        </Stack>
        <Flex flexDirection={['column', 'row-reverse']}>
          <Button type="submit" colorScheme="blue" data-testid="submit-button">
            Submit
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}
