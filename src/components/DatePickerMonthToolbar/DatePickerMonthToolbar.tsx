import React from "react";
import { TRAVERSE_NEXT_MONTH, TRAVERSE_PREV_MONTH } from "../../constants/DateConstants";
import './date-picker-month-toolbar.css';

interface IDatePickerMonthToolbarProps {
    currentMonth: string | undefined;
    traverseNextMonth: () => void;
    traversePrevMonth: () => void;
    setMonthYearPicker: (monthPicker: boolean) => void;
}

const DatePickerMonthToolbar: React.FC<IDatePickerMonthToolbarProps> = ({ currentMonth,traversePrevMonth,traverseNextMonth,setMonthYearPicker }) => {

    return (
        <div className='date-picker-month-toolbar'>
            <button onClick={traversePrevMonth} className="month-button">{TRAVERSE_PREV_MONTH}</button>
            <button onClick={() => setMonthYearPicker(true)} className="month-button">{currentMonth}</button>
            <button onClick={traverseNextMonth} className="month-button">{TRAVERSE_NEXT_MONTH}</button>
        </div>
    )
}

export default DatePickerMonthToolbar