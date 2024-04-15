import { DAYS_OF_WEEK } from '../../constants/DateConstants';
import './date-picker-week-header.css';

const DatePickerWeekHeader = () => {
    return (
        <div className='date-picker-week-header'>
            {DAYS_OF_WEEK.map((day: string) => <span key={day} className='date'>{day}</span>)}
        </div>
    )
}

export default DatePickerWeekHeader