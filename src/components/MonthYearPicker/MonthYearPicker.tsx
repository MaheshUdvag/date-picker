import React, { useContext, useEffect, useRef } from 'react';
import './month-year-picker.css';
import { CALENDAR_TYPE, START_YEAR } from '../../constants/DateConstants';
import { DatePickerContext } from '../../context/DatePicker.context';

interface IMonthYearPicker {
    currentDate: Date | null;
    setMonthYearPicker: (monthPicker: boolean) => void;
    currentMonth: string;
    calenderType: CALENDAR_TYPE
}

const MonthYearPicker: React.FC<IMonthYearPicker> = ({ currentDate, setMonthYearPicker, currentMonth, calenderType }) => {

    const { setNextMonthDate, setPrevMonthDate } = useContext(DatePickerContext);

    const ref = useRef<null | HTMLDivElement>(null);

    /**
     * This method sets the selected month and 
     * year for the calender.
     * @param year 
     * @param month 
     */
    const setMonthYear = (year: number, month: number) => {
        const date = new Date(year,month,1);

        if (calenderType === CALENDAR_TYPE.next) {
            const prevMonth = new Date(year, month - 1, 1);
            setPrevMonthDate(prevMonth);
            setNextMonthDate(date);
        }

        if (calenderType === CALENDAR_TYPE.prev) {
            const nextMonth = new Date(year, month + 1, 1);
            setNextMonthDate(nextMonth);
            setPrevMonthDate(date);
        }
        setMonthYearPicker(false);
    }

    useEffect(() => {
        /**
         * Scroll into the current year and month
         * on load of the component.
         */
        if(ref) {
            ref.current?.scrollIntoView({behavior: 'auto'});
        }
    }, [ref]);

    return (
        <div className='month-year-picker'>
            <div className='current-month-year'>{currentMonth}</div>
            <div className='month-year-list'>
            {[...Array(1000).keys()].map((i) => {
            const isCurrentYear = currentDate?.getFullYear() === START_YEAR + i ;
            const props = isCurrentYear ? {ref} : {};
            return (<div {...props} key={START_YEAR + i} className="year-month-separator">
                <div className={`year${isCurrentYear ? ' current-year': ''}`}>{START_YEAR + i}</div>
                <div className='month-wrapper'>
                {[...Array(12).keys()].map((j) => <span key={START_YEAR + i + j} onClick={() => setMonthYear(START_YEAR + i, j)} className={`month${isCurrentYear && j === currentDate.getMonth() ? " selected-month" : ""}`}>{j+1}</span>)}
                </div>
            </div>)
            })}
            </div>
            
        </div>
    )
}

export default MonthYearPicker