import React, { useContext, useEffect, useState } from 'react';
import { IDate } from '../../Interface/IDate';
import { DatePickerContext } from '../../context/DatePicker.context';
import { compareDates, isDateBetweenDates, isDateWeekDay, sortDates } from '../../utils/date.util';
import { CALENDAR_TYPE } from '../../constants/DateConstants';

interface IDatePickerDays {
    dates: IDate[][] | undefined;
    calenderType: CALENDAR_TYPE;
    currentDate: Date | null;
    traverseNextMonth: () => void;
    traversePrevMonth: () => void;
}

const DatePickerDays: React.FC<IDatePickerDays> = ({ dates, calenderType, currentDate, traverseNextMonth, traversePrevMonth }) => {

    const { date1, setDate1, date2, setDate2, setNextMonthDate, setPrevMonthDate } = useContext(DatePickerContext);
    
    const [endRangeDate, setEndRangeDate] = useState<IDate | null>();

    const selectDate = (date: IDate) => {
        const isWeekDay = isDateWeekDay(date);
        let resetDate = false;
        let datesSelected = false;
        if(isWeekDay) {
            if(date1 && date2) {
                setDate1(date);
                setDate2(null);
                resetDate = true;
            } else if(date1) {
                setDate2(date);
                datesSelected = true;
            } else {
                setDate1(date);
                if(calenderType === CALENDAR_TYPE.next) {
                    resetDate=true;
                }
            }
            const currentMonth = currentDate?.getMonth();

            if(resetDate && calenderType === CALENDAR_TYPE.next) {
                const prevMonth = new Date(date.year,date.month,date.date);
                setPrevMonthDate(prevMonth);
                const nextMonth = new Date(date.year,date.month,date.date);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                setNextMonthDate(nextMonth);
            } else {
                if(calenderType === CALENDAR_TYPE.prev && currentMonth) {
                    if(date.month > currentMonth && !datesSelected) {
                        traverseNextMonth();
                    }
                    if (date.month < currentMonth) {
                        traversePrevMonth();
                    }
                }
                if(calenderType === CALENDAR_TYPE.next && currentMonth) {
                    if(date.month < currentMonth) {
                        traversePrevMonth();
                    } 
                    if(date.month > currentMonth) {
                        traverseNextMonth();
                    }
                }
            }
            
        }
    }

    const highlightDate = (date: IDate) => {
        const today = new Date();
        let className = 'date';

        if(date1 && date2) {
            const isWeekDay = isDateWeekDay(date);
            const [startDate,endDate] = sortDates(date1,date2);
            const isBetweenDates = isDateBetweenDates(date,startDate,endDate);
            if(isBetweenDates && isWeekDay && date.month === currentDate?.getMonth()) {
                className += ' hover';
            }
        } else if(date1 && endRangeDate) {
            const isWeekDay = isDateWeekDay(date);
            const start = date1;
            const [startDate,endDate] = sortDates(start,endRangeDate);
            const isBetweenDates = isDateBetweenDates(date,startDate,endDate);
            if(isBetweenDates && isWeekDay && date.month === currentDate?.getMonth()) {
                className += ' hover';
            }
        }

        if(date.month !== currentDate?.getMonth()) {
            className += ' opacity';
        }

        const highlightCurrentDate =  today.getDate() === date.date &&
         today.getMonth() === date.month &&
         today.getFullYear() === date.year;

         if(date1) {
            const isCurrentDate1 = compareDates(date,date1);
            if(isCurrentDate1 === 0 && date.month === currentDate?.getMonth()) {
                className += ' selected-date';
            }
         } 

         if(date2) {
            const isCurrentDate2 = compareDates(date,date2);
            if(isCurrentDate2 === 0 && date.month === currentDate?.getMonth()) {
                className += ' selected-date';
            }
         } 
        

         if(highlightCurrentDate) {
            className += ' highlight';
         }
        return className;
    }

    const mouseHover = (date: IDate) => {
        setEndRangeDate(date);
    }

    useEffect(() => {
        setEndRangeDate(null);
    },[date1,date2]);

    return (
        <>
            {dates?.map((week, index) => <div key={`week${index}`} className='date-picker-week-days'>
                {week.map((date) => <span key={`day${date.date + date.month + date.year}`} className={highlightDate(date)} onClick={() => selectDate(date)} onMouseOver={() => mouseHover(date)}>{date.date}</span>)}
            </div>)}</>
    )
}

export default DatePickerDays