import React, { useState } from 'react'
import DatePicker from '../DatePicker/DatePicker';
import './date-picker-input.css';

interface IDatePickerInput {
    getSelectedDates: (startEndDates: string[], weekendDates: string[]) => void,
    preDefinedRanges?: string[]
}

export const DatePickerInput: React.FC<IDatePickerInput> = ({ getSelectedDates, preDefinedRanges }) => {

    const [value, setValue] = useState<string>("");
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const returnSelectedDates = (startEndDates: string[], weekendDates: string[]) => {
        setValue(startEndDates[0] + ' ~ ' + startEndDates[1]);
        setShowPicker(false);
        getSelectedDates(startEndDates, weekendDates);
    }


    return (
        <>
            <div className="date-picker-input" >
                <input type="text" value={value} onChange={() => setValue("")} readOnly />
                {!value && <i onClick={() => setShowPicker(!showPicker)} className="fa fa-calendar date-picker-icon"></i>}
                {value && <i onClick={() => setValue("")} className="fa fa-close date-picker-icon"></i>}
            </div>
            {showPicker && <DatePicker preDefinedRanges={preDefinedRanges} returnSelectedDates={returnSelectedDates} setShowPicker={setShowPicker} />}
        </>
    )
}
