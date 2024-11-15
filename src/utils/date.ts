import { differenceInYears, lightFormat, type DateArg } from 'date-fns'

export const getNow = () => new Date()

export const calculateAge = (date: DateArg<Date>) =>
  differenceInYears(getNow(), date)

export const getFormattedDate = (date: DateArg<Date>) =>
  lightFormat(date, 'yyyy/MM/dd')
