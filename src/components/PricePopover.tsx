import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

export const PriceTypePopover = () => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <InfoOutlineIcon />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>What is the Price Type?</PopoverHeader>
        <PopoverBody>
          Price can either be a fixed amount or a range. Choose the option that
          you think will get you the job.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
