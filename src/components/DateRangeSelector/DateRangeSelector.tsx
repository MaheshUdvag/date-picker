import React, { useContext } from 'react'
import { DATE_PRE_SELECT_RANGES } from '../../constants/DateConstants';
import './date-range-selector.css';
import { DatePickerContext } from '../../context/DatePicker.context';
import { returnDateRange } from '../../utils/date.range.util';

interface IDateRangeSelector {
    returnDates: () => void
}

const DateRangeSelector: React.FC<IDateRangeSelector> = ({ returnDates }) => {

    const { setDate1, setDate2 } = useContext(DatePickerContext);

    const selectRange = (range: string) => {
        const {startDate, endDate } = returnDateRange(new Date(),range);
        if(startDate && endDate) {
            const date1 = {
                year: startDate.getFullYear(),
                month: startDate.getMonth(),
                date: startDate.getDate()
            }
            setDate1(date1);
            const date2 = {
                year: endDate.getFullYear(),
                month: endDate.getMonth(),
                date: endDate.getDate()
            }
            setDate2(date2);
            returnDates();
        }
    }

    return (
        <div className='range-selector'>
            {DATE_PRE_SELECT_RANGES.map((range: string) => <div key={range} className='range' onClick={() => selectRange(range)}>{range}</div>)}
        </div>
    )
}

export default DateRangeSelector;