export enum DAY_MAPPING {
    "Sunday"=0,
    "Monday"=1,
    "Tuesday"=2,
    "Wednesday"=3,
    "Thursday"=4,
    "Friday"=5,
    "Saturday"=6
}

export enum MONTH_MAPPING {
    "January"=0,
    "February"=1,
    "March"=2,
    "April"=3,
    "May"=4,
    "June"=5,
    "July"=6,
    "August"=7,
    "September"=8,
    "October"=9,
    "November"=10,
    "December"=11
}

export enum CALENDAR_TYPE {
    "single",
    "prev",
    "next"
}

export enum DATE_RANGE {
    TODAY='Today',
    YESTERDAY='Yesterday',
    THIS_WEEK='This Week',
    LAST_7_DAYS='Last 7 Days',
    LAST_30_DAYS='Last 30 Days',
    THIS_MONTH='This Month',
    LAST_MONTH='Last Month',
    THIS_YEAR='This Year',
    LAST_YEAR='Last Year',
    ALL_TIME='All Time'
}


export const MONTH_YEAR_SEPARATOR = ', ';

export const DAYS_OF_WEEK = ['Su','Mo','Tu','We','Th','Fr','Sa'];

export const DATE_PRE_SELECT_RANGES = ['Today','Yesterday','This Week','Last 7 Days','Last 30 Days','This Month','Last Month','This Year','Last Year','All Time'];

export const START_YEAR = 1970;