import type {
  DatePickerContentProps,
  DatePickerControlProps,
  DatePickerInputProps,
  DatePickerRangeTextProps,
  DatePickerRootProps,
  DatePickerTableCellProps,
  DatePickerTableCellTriggerProps,
  DatePickerTableHeaderProps,
  DatePickerTableProps,
  DatePickerTableRowProps,
  DatePickerTriggerProps,
  DatePickerViewControlProps,
  DatePickerViewProps,
  DatePickerViewTriggerProps
} from '@ark-ui/solid/date-picker'
import { DatePicker as DatePickerPrimitive } from '@ark-ui/solid/date-picker'
import type { VoidProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { getFormattedDate } from '~/utils/date'
import { cn } from '~/utils/styles'
import { buttonVariants } from '../Button'
import { cardVariants } from '../Card'
import { Icon } from '../Icon'

export const DatePickerLabel = DatePickerPrimitive.Label
export const DatePickerTableHead = DatePickerPrimitive.TableHead
export const DatePickerTableBody = DatePickerPrimitive.TableBody
export const DatePickerClearTrigger = DatePickerPrimitive.ClearTrigger
export const DatePickerYearSelect = DatePickerPrimitive.YearSelect
export const DatePickerMonthSelect = DatePickerPrimitive.MonthSelect
export const DatePickerContext = DatePickerPrimitive.Context
export const DatePickerRootProvider = DatePickerPrimitive.RootProvider
export const DatePickerPositioner = DatePickerPrimitive.Positioner

export const DatePicker = (props: DatePickerRootProps) => {
  return (
    <DatePickerPrimitive.Root
      format={e => getFormattedDate(e.toString())}
      {...props}
    />
  )
}

export const DatePickerView = (props: DatePickerViewProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.View
      class={cn('flex flex-col gap-4', local.class)}
      {...rest}
    />
  )
}

export const DatePickerViewControl = (props: DatePickerViewControlProps) => {
  const [local, rest] = splitProps(props, ['class', 'children'])

  return (
    <DatePickerPrimitive.ViewControl
      class={cn('flex justify-between gap-4', local.class)}
      {...rest}
    >
      <DatePickerPrimitive.PrevTrigger class={cn(buttonVariants(), 'p-2')}>
        <Icon
          icon="chevron"
          class="size-4 rotate-180"
        />
      </DatePickerPrimitive.PrevTrigger>
      {local.children}
      <DatePickerPrimitive.NextTrigger class={cn(buttonVariants(), 'p-2')}>
        <Icon
          icon="chevron"
          class="size-4"
        />
      </DatePickerPrimitive.NextTrigger>
    </DatePickerPrimitive.ViewControl>
  )
}

export const DatePickerRangeText = (
  props: VoidProps<DatePickerRangeTextProps>
) => <DatePickerPrimitive.RangeText {...props} />

export const DatePickerTable = (props: DatePickerTableProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.Table
      class={cn('w-full border-collapse', local.class)}
      {...rest}
    />
  )
}

export const DatePickerTableRow = (props: DatePickerTableRowProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.TableRow
      class={cn('mt-1 flex w-full gap-1', local.class)}
      {...rest}
    />
  )
}

export const DatePickerTableHeader = (props: DatePickerTableHeaderProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.TableHeader
      class={cn('w-8 flex-1 text-sm font-normal text-black/50', local.class)}
      {...rest}
    />
  )
}

export const DatePickerTableCell = (props: DatePickerTableCellProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.TableCell
      class={cn('flex-1', local.class)}
      {...rest}
    />
  )
}

export const DatePickerTableCellTrigger = (
  props: DatePickerTableCellTriggerProps
) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.TableCellTrigger
      class={cn(
        buttonVariants({ variant: 'link' }),
        'size-8 w-full p-0 data-[selected]:opacity-100',
        'data-[today]:bg-white/50',
        '[&:is([data-today][data-selected])]:bg-white',
        'data-[selected]:bg-white data-[selected]:hover:bg-white',
        'data-[disabled]:opacity-50',
        'data-[outside-range]:opacity-50',
        '[&:is([data-outside-range][data-in-range])]:opacity-30',
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerViewTrigger = (props: DatePickerViewTriggerProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.ViewTrigger
      class={cn(
        buttonVariants({ variant: 'primary' }),
        'w-full py-1',
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerContent = (props: DatePickerContentProps) => {
  const [local, rest] = splitProps(props, ['class', 'children'])

  return (
    <DatePickerPrimitive.Content
      class={cn(
        cardVariants(),
        'rounded-md bg-white p-4 backdrop-blur-none',
        local.class
      )}
      {...rest}
    >
      {local.children}
    </DatePickerPrimitive.Content>
  )
}

export const DatePickerControl = (props: DatePickerControlProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.Control
      class={cn('inline-flex gap-2', local.class)}
      {...rest}
    />
  )
}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.Input
      class={cn(
        'font-secondary w-28 min-w-0 flex-1 shrink rounded-md border-transparent bg-white px-4 py-2 text-sm font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50',
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <DatePickerPrimitive.Trigger
      class={cn(buttonVariants(), 'p-2', local.class)}
      {...rest}
    >
      <Icon
        icon="calendar"
        class="size-5 fill-current/75"
      />
    </DatePickerPrimitive.Trigger>
  )
}
