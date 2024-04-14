import React from "react";

interface IDatePickerMonthToolbarProps {
    currentMonth: string | undefined;
    traverseNextMonth: () => void;
    traversePrevMonth: () => void;
    setMonthYearPicker: (monthPicker: boolean) => void;
}

const DatePickerMonthToolbar: React.FC<IDatePickerMonthToolbarProps> = ({ currentMonth,traversePrevMonth,traverseNextMonth,setMonthYearPicker }) => {

    return (
        <div className='date-picker-month-toolbar'>
            <button onClick={traversePrevMonth}>{'<'}</button>
            <span onClick={() => setMonthYearPicker(true)}>{currentMonth}</span>
            <button onClick={traverseNextMonth}>{'>'}</button>
        </div>
    )
}

export default DatePickerMonthToolbar