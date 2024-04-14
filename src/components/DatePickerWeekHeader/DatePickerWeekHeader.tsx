import { DAYS_OF_WEEK } from '../../constants/DateConstants'

const DatePickerWeekHeader = () => {
    return (
        <div className='date-picker-days'>
            <div className='date-picker-week-header'>
                {DAYS_OF_WEEK.map((day: string) => <span key={day} className='date'>{day}</span>)}
            </div>
        </div>
    )
}

export default DatePickerWeekHeader