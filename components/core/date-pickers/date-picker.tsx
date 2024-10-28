'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { ControllerRenderProps } from 'react-hook-form'

export type DatePickerProps = {
    inputSize?: 'sm' | 'md'
    isLoading?: boolean
    field: ControllerRenderProps
}

const DatePicker = ({ inputSize, field, isLoading }: DatePickerProps) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    return (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-full justify-start text-left font-normal leading-[normal] hover:bg-transparent',
                            !field.value &&
                                'text-muted-foreground hover:text-muted-foreground',
                            inputSize === 'sm'
                                ? 'h-9'
                                : inputSize === 'md'
                                  ? 'h-10'
                                  : 'h-12'
                        )}
                    >
                        {field.value ? (
                            format(new Date(field.value), 'MM/dd/yyyy')
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) =>
                        field.onChange(date ? date.toISOString() : '')
                    }
                    disabled={isLoading}
                    initialFocus
                    onDayClick={() => setIsCalendarOpen(false)}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
