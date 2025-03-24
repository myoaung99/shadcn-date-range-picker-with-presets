"use client";

import * as React from "react";
import { addMonths, format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const presets = [
  {
    label: "Last 7 Days",
    getValue: () => ({
      from: subDays(new Date(), 7),
      to: new Date(),
    }),
  },
  {
    label: "Last 14 Days",
    getValue: () => ({
      from: subDays(new Date(), 14),
      to: new Date(),
    }),
  },
  {
    label: "Last 30 Days",
    getValue: () => ({
      from: subDays(new Date(), 30),
      to: new Date(),
    }),
  },
  {
    label: "Last 90 Days",
    getValue: () => ({
      from: subDays(new Date(), 90),
      to: new Date(),
    }),
  },
];

function MonthYearSelect({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (date: Date) => void;
}) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return {
      label: format(date, "MMMM"),
      value: i.toString(),
    };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => ({
    label: (currentYear - 5 + i).toString(),
    value: (currentYear - 5 + i).toString(),
  }));

  return (
    <div className="flex gap-2">
      <Select
        value={date.getMonth().toString()}
        onValueChange={(value) => {
          const newDate = new Date(date);
          newDate.setMonth(Number.parseInt(value));
          onDateChange(newDate);
        }}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={date.getFullYear().toString()}
        onValueChange={(value) => {
          const newDate = new Date(date);
          newDate.setFullYear(Number.parseInt(value));
          onDateChange(newDate);
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface AdvancedDateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
}

export function AdvancedDateRangePicker({
  className,
  value,
  onChange,
  ...props
}: AdvancedDateRangePickerProps) {
     const [internalDate, setInternalDate] = React.useState<
       DateRange | undefined
     >({
       from: new Date(2025, 0, 25),
       to: new Date(2025, 1, 24),
     });

  const date = value ?? internalDate;
  const handleDateChange = (newDate: DateRange | undefined) => {
    onChange && onChange(newDate);
    if (!value) {
      setInternalDate(newDate);
    }
  };

  const [leftMonth, setLeftMonth] = React.useState<Date>(
    date?.from || new Date()
  );
  const [rightMonth, setRightMonth] = React.useState<Date>(
    addMonths(date?.from || new Date(), 1)
  );

  // Ensure the right month stays one month ahead of the left month
  const handleLeftMonthChange = (newDate: Date) => {
    setLeftMonth(newDate);
    setRightMonth(addMonths(newDate, 1));
  };

  // Ensure the left month stays one month behind the right month
  const handleRightMonthChange = (newDate: Date) => {
    setRightMonth(newDate);
    setLeftMonth(addMonths(newDate, -1));
  };

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* preset dates */}
            <div className="border-r p-3 w-[150px]">
              <div className="space-y-2 font-medium">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start font-normal"
                    onClick={() => {
                      const range = preset.getValue();
                      handleDateChange(range);
                      setLeftMonth(range.from);
                      setRightMonth(addMonths(range.from, 1));
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-3">
              {/* year and month selectors */}
              <div className="flex gap-12 mb-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Start date</p>
                  <MonthYearSelect
                    date={leftMonth}
                    onDateChange={handleLeftMonthChange}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">End date</p>
                  <MonthYearSelect
                    date={rightMonth}
                    onDateChange={handleRightMonthChange}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {/* start date calendar  */}
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={handleDateChange}
                  month={leftMonth}
                  onMonthChange={handleLeftMonthChange}
                  numberOfMonths={1}
                  showOutsideDays={false}
                  classNames={{
                    cell: cn(
                      "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                    ),
                    day: cn(
                      "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
                    ),
                    day_range_start: "day-range-start rounded",
                    day_range_end: "day-range-end rounded",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground ",
                    day_today: "bg-accent text-accent-foreground rounded",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle:
                      "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />

                {/* end date calendar  */}
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={handleDateChange}
                  month={rightMonth}
                  onMonthChange={handleRightMonthChange}
                  numberOfMonths={1}
                  showOutsideDays={false}
                  classNames={{
                    cell: cn(
                      "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                    ),
                    day: cn(
                      "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
                    ),
                    day_range_start: "day-range-start rounded",
                    day_range_end: "day-range-end rounded",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle:
                      "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
