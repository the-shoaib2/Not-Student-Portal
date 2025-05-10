"use client";

import React, { useState, useEffect } from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  showOutsideDays?: boolean;
  className?: string;
  classNames?: {
    calendar?: string;
  };
  date?: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  fromDate?: Date;
  toDate?: Date;
  id?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  showOutsideDays = true,
  className = "",
  classNames = {},
  date,
  setDate,
  placeholder = "Pick a date",
  fromDate,
  toDate,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;

    // Validate date range
    if (fromDate && newDate < fromDate) {
      console.error("Date is before minimum allowed date");
      return;
    }
    if (toDate && newDate > toDate) {
      console.error("Date is after maximum allowed date");
      return;
    }

    setSelectedDate(newDate);
    setDate(newDate);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "MMMM d, yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[320px] p-4 shadow-lg rounded-lg">
        <div className="flex gap-2 mb-3">
          <Select 
            onValueChange={(month) => {
              if (!month) return;
              const newDate = setMonth(selectedDate || new Date(), months.indexOf(month));
              handleDateChange(newDate);
            }} 
            value={selectedDate ? months[getMonth(selectedDate)] : months[getMonth(new Date())]}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            onValueChange={(year) => {
              if (!year) return;
              const newDate = setYear(selectedDate || new Date(), parseInt(year, 10));
              handleDateChange(newDate);
            }} 
            value={selectedDate ? getYear(selectedDate).toString() : getYear(new Date()).toString()}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date: Date | undefined) => {
            if (date) {
              handleDateChange(date);
              setOpen(false);
            }
          }}
          initialFocus
          month={selectedDate || new Date()}
          onMonthChange={(date: Date | undefined) => {
            if (date) handleDateChange(date);
          }}
          showOutsideDays={showOutsideDays}
          className={cn("rounded-md border p-2", classNames?.calendar)}
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
