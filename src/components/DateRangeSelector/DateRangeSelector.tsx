import React, { useContext, useEffect, useState } from 'react'
import { DATE_RANGE } from '../../constants/DateConstants';
import './date-range-selector.css';
import { DatePickerContext } from '../../context/DatePicker.context';
import { START_END_DATE, initializeRangeMap, returnDateRange } from '../../utils/date.range.util';

interface IDateRangeSelector {
    returnDates: () => void,
    preDefinedRanges?: string[]
}

type RANGE_LIST = { [key: string]: START_END_DATE };

const DateRangeSelector: React.FC<IDateRangeSelector> = ({ returnDates, preDefinedRanges }) => {

    const { setDate1, setDate2 } = useContext(DatePickerContext);
    const [rangeMap, setRangeMap] = useState<RANGE_LIST>(initializeRangeMap);
    const [rangeToBeDisplayed, setRangeToBeDisplayed] = useState<string[]>([]);

    /**
     * Sets the predefined date range.
     * @param range 
     */
    const selectRange = (range: string) => {
        const { startDate, endDate } = rangeMap[range];
        if (startDate && endDate) {
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

    const isValidRange = (range: string) => {
        if (rangeMap) {
            const { startDate, endDate } = rangeMap[range];
            if (startDate !== null && endDate !== null) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {

        /**
         * Display only the predefined 
         * ranges if provided.
         */
        let preDefinedRangesToBeDisplayed = Object.values(DATE_RANGE);
        if(preDefinedRanges) {
            preDefinedRangesToBeDisplayed = Object.values(DATE_RANGE)
            .filter((range) => preDefinedRanges.includes(range));
        } 

        /**
         * Populates the list of dates for 
         * all the predefined date ranges
         */
        const rangeList: RANGE_LIST = {};
        preDefinedRangesToBeDisplayed.forEach((range: string) => {
            rangeList[range] = returnDateRange(new Date(), range);
        });
        setRangeMap(rangeList);
        setRangeToBeDisplayed(preDefinedRangesToBeDisplayed);
    }, []);

    return (
        <div className='range-selector'>
            {rangeToBeDisplayed.map((range: string) => <button key={range} disabled={!isValidRange(range)} className='range' onClick={() => selectRange(range)}>{range}</button>)}
        </div>
    )
}

export default DateRangeSelector;