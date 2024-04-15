import React, { useEffect, useState } from 'react';
import './date-picker.css';
import DatePickerMonth from '../DatePickerMonth/DatePickerMonth';
import { IDate } from '../../Interface/IDate';
import { DatePickerContext } from '../../context/DatePicker.context';
import { CALENDAR_TYPE } from '../../constants/DateConstants';
import DateRangeSelector from '../DateRangeSelector/DateRangeSelector';
import { formatIDate, getWeekendsBetweenDates, sortDates } from '../../utils/date.util';

interface IDatePicker {
  returnSelectedDates: (startEndDates: string[], weekendDates: string[]) => void,
  setShowPicker: (pickerState: boolean) => void
}

const DatePicker: React.FC<IDatePicker> = ({ returnSelectedDates, setShowPicker }) => {

  const [date1, setDate1] = useState<IDate | null>(null);
  const [date2, setDate2] = useState<IDate | null>(null);
  const currentDate = new Date();
  const nextDate = new Date();
  nextDate.setMonth(currentDate.getMonth() + 1);
  const [prevMonthDate, setPrevMonthDate] = useState<Date>(currentDate);
  const [nextMonthDate, setNextMonthDate] = useState<Date>(nextDate);
  const [returnDateRange, setReturnDateRange] = useState<boolean>(false);
  const [endRangeDate, setEndRangeDate] = useState<IDate | null>(null);

  const returnDates = () => {
    if (date1 && date2) {

      const [startDate, endDate] = sortDates(date1, date2);

      const formattedStartDate = formatIDate(startDate);
      const formattedEndDate = formatIDate(endDate);

      const weekendDates = getWeekendsBetweenDates(startDate, endDate);
      returnSelectedDates([formattedStartDate, formattedEndDate], weekendDates);
      setShowPicker(false);
    }
  }

  useEffect(() => {
    if (date1 && date2 && returnDateRange) {
      returnDates();
    }
  }, [date1, date2, returnDateRange]);

  return (
    <DatePickerContext.Provider value={{ date1, setDate1, setDate2, date2, setPrevMonthDate, setNextMonthDate, prevMonthDate, nextMonthDate, endRangeDate, setEndRangeDate }}>
      <div className='date-picker'>
        <div className='date-picker-calender'>
          <DatePickerMonth calenderType={CALENDAR_TYPE.prev} />
          <DatePickerMonth calenderType={CALENDAR_TYPE.next} />
        </div>
        <div className='date-picker-selectors'>
          <DateRangeSelector returnDates={() => setReturnDateRange(true)} />
          <button className='date-picker-button' disabled={!date1 || !date2} onClick={() => setReturnDateRange(true)}>OK</button>
        </div>
      </div>
    </DatePickerContext.Provider>
  )
}

export default DatePicker;