import { parseDate, type DatePickerRootProps } from '@ark-ui/solid/date-picker'
import {
  Index,
  Show,
  splitProps,
  type Component,
  type JSXElement
} from 'solid-js'
import { Portal } from 'solid-js/web'
import {
  DatePicker as DatePickerRoot,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerPositioner,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
  DatePickerLabel
} from './DatePickerPrimitives'

type DatePickerProps = Pick<DatePickerRootProps, 'disabled'> & {
  defaultValue?: Date
  value?: string
  min?: Date
  max?: Date
  onValueChange?: (value: string) => void
  label?: JSXElement
}

export const DatePicker: Component<DatePickerProps> = props => {
  const [localValues, rootProps] = splitProps(props, [
    'defaultValue',
    'value',
    'min',
    'max',
    'onValueChange',
    'label'
  ])

  return (
    <DatePickerRoot
      {...rootProps}
      defaultValue={
        localValues.defaultValue
          ? [parseDate(localValues.defaultValue)]
          : undefined
      }
      value={localValues.value ? [parseDate(localValues.value)] : undefined}
      min={localValues.min ? parseDate(localValues.min) : undefined}
      max={localValues.max ? parseDate(localValues.max) : undefined}
      onValueChange={value => {
        const stringValue = value.valueAsString[0]

        if (localValues.onValueChange && stringValue) {
          localValues.onValueChange(stringValue)
        }
      }}
      class="flex flex-col items-start gap-2"
    >
      <Show when={localValues.label}>
        {label => (
          <DatePickerLabel class="text-black/50">{label()}</DatePickerLabel>
        )}
      </Show>
      <DatePickerControl>
        <DatePickerInput />
        <DatePickerTrigger />
      </DatePickerControl>
      <Portal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerContext>
                {context => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableHead>
                        <DatePickerTableRow>
                          <Index each={context().weekDays}>
                            {weekDay => (
                              <DatePickerTableHeader>
                                {weekDay().short}
                              </DatePickerTableHeader>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      </DatePickerTableHead>
                      <DatePickerTableBody>
                        <Index each={context().weeks}>
                          {week => (
                            <DatePickerTableRow>
                              <Index each={week()}>
                                {day => (
                                  <DatePickerTableCell value={day()}>
                                    <DatePickerTableCellTrigger>
                                      {day().day}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerContext>
                {context => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index
                          each={context().getMonthsGrid({
                            columns: 4,
                            format: 'short'
                          })}
                        >
                          {months => (
                            <DatePickerTableRow>
                              <Index each={months()}>
                                {month => (
                                  <DatePickerTableCell value={month().value}>
                                    <DatePickerTableCellTrigger>
                                      {month().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerContext>
                {context => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index
                          each={context().getYearsGrid({
                            columns: 4
                          })}
                        >
                          {years => (
                            <DatePickerTableRow>
                              <Index each={years()}>
                                {year => (
                                  <DatePickerTableCell value={year().value}>
                                    <DatePickerTableCellTrigger>
                                      {year().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </Portal>
    </DatePickerRoot>
  )
}
