import './App.css'
import { DatePickerInput } from './components/DatePickerInput/DatePickerInput';
import { DATE_RANGE } from './constants/DateConstants';

function App() {

  const getSelectedDates = (startEndDates: string[], weekendDates: string[]) => {
    console.log(startEndDates);
    console.log(weekendDates);
  }

  return (
    <>
      <h1>Date Picker</h1>
      <h4>Date Picker with all options</h4>
      <DatePickerInput getSelectedDates={getSelectedDates} preDefinedRanges={Object.values(DATE_RANGE)}/>
      <h4>Date Picker with Fewer options</h4>
      <DatePickerInput getSelectedDates={getSelectedDates} preDefinedRanges={[DATE_RANGE.YESTERDAY, DATE_RANGE.LAST_30_DAYS,DATE_RANGE.LAST_7_DAYS,DATE_RANGE.THIS_MONTH]}/>
    </>
  )
}

export default App
