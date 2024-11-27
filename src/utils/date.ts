import { parseDate } from '@ark-ui/solid/date-picker'
import {
  differenceInYears,
  lightFormat,
  parseJSON,
  type DateArg
} from 'date-fns'

export const getNow = () => new Date()

export const calculateAge = (date: DateArg<Date>) =>
  differenceInYears(getNow(), date)

export const getFormattedDate = (date: DateArg<Date>) =>
  lightFormat(date, 'yyyy/MM/dd')

export const getInitialFormDate = (date: string) =>
  parseJSON(date) as unknown as string

export const parseToDatePickerFormat = (date: Date) =>
  parseDate(date).toString()
