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
      <DatePickerInput getSelectedDates={getSelectedDates} preDefinedRanges={Object.values(DATE_RANGE)}/>
    </>
  )
}

export default App
