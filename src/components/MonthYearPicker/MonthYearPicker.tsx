import React, { useContext, useEffect, useRef } from 'react';
import './month-year-picker.css';
import { CALENDAR_TYPE, START_YEAR } from '../../constants/DateConstants';
import { DatePickerContext } from '../../context/DatePicker.context';

interface IMonthYearPicker {
    currentDate: Date | null;
    setCurrentDate: (date: Date) => void;
    setMonthYearPicker: (monthPicker: boolean) => void;
    currentMonth: string;
    calenderType: CALENDAR_TYPE
}

const MonthYearPicker: React.FC<IMonthYearPicker> = ({ currentDate, setCurrentDate, setMonthYearPicker, currentMonth, calenderType }) => {

    const { setNextMonthDate, setPrevMonthDate, prevMonthDate, nextMonthDate } = useContext(DatePickerContext);

    const ref = useRef<null | HTMLDivElement>(null);

    const setMonthYear = (year: number, month: number) => {
        const date = new Date(year,month,1);

        const isPreviousMonthGreaterOrEqual = prevMonthDate &&
            prevMonthDate?.getFullYear() >= date.getFullYear() &&
                prevMonthDate?.getMonth() >= date.getMonth();
        
        const isNextMonthLesserOrEqual = nextMonthDate &&
            nextMonthDate?.getFullYear() <= date.getFullYear() &&
            nextMonthDate?.getMonth() <= date.getMonth();

        if (calenderType === CALENDAR_TYPE.next && isPreviousMonthGreaterOrEqual) {
            const prevMonth = new Date(year, month - 1, 1);
            setPrevMonthDate(prevMonth);
            setNextMonthDate(date);
        }

        if (calenderType === CALENDAR_TYPE.prev && isNextMonthLesserOrEqual) {
            const prevMonth = new Date(year, month + 1, 1);
            setPrevMonthDate(date);
            setNextMonthDate(prevMonth);
        }
        setCurrentDate(date);
        setMonthYearPicker(false);
    }

    useEffect(() => {
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