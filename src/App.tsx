import './App.css'
import { DatePickerInput } from './components/DatePickerInput/DatePickerInput';

function App() {

  const getSelectedDates = (startEndDates: string[], weekendDates: string[]) => {
    console.log(startEndDates);
    console.log(weekendDates);
}

  return (
    <>
      <h1>Date Picker</h1>
      <DatePickerInput getSelectedDates={getSelectedDates}/>
    </>
  )
}

export default App
