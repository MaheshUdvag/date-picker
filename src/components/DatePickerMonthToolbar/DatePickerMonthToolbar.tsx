import React from "react";
import { TRAVERSE_NEXT_MONTH, TRAVERSE_PREV_MONTH } from "../../constants/DateConstants";

interface IDatePickerMonthToolbarProps {
    currentMonth: string | undefined;
    traverseNextMonth: () => void;
    traversePrevMonth: () => void;
    setMonthYearPicker: (monthPicker: boolean) => void;
}

const DatePickerMonthToolbar: React.FC<IDatePickerMonthToolbarProps> = ({ currentMonth,traversePrevMonth,traverseNextMonth,setMonthYearPicker }) => {

    return (
        <div className='date-picker-month-toolbar'>
            <button onClick={traversePrevMonth}>{TRAVERSE_PREV_MONTH}</button>
            <span onClick={() => setMonthYearPicker(true)}>{currentMonth}</span>
            <button onClick={traverseNextMonth}>{TRAVERSE_NEXT_MONTH}</button>
        </div>
    )
}

export default DatePickerMonthToolbar