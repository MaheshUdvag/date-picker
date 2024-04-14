import React, { useState } from 'react'
import DatePicker from '../DatePicker/DatePicker';
import './date-picker-input.css'

export const DatePickerInput = () => {

    const [value, setValue] = useState<string>("");
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const getSelectedDates = (startEndDates: string[], weekendDates: string[]) => {
        console.log(startEndDates);
        console.log(weekendDates);
        setValue(startEndDates[0] + ' ~ ' + startEndDates[1]);
        setShowPicker(false);
    }

    return (
        <>
            <div className="date-picker-input" >
                <input type="text" value={value} onChange={() => setValue("")} readOnly/>
                {!value && <i onClick={() => setShowPicker(!showPicker)} className="fa fa-calendar date-picker-icon"></i>}
                {value && <i onClick={() => setValue("")} className="fa fa-close date-picker-icon"></i>}
            </div>
            {showPicker && <DatePicker returnSelectedDates={getSelectedDates} setShowPicker={setShowPicker} />}
        </>
    )
}
