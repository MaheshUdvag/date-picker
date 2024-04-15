import { createContext } from "react";
import { IDate } from "../Interface/IDate";

interface IDatePickerContext {
    date1: IDate | null;
    date2: IDate | null;
    setDate1: (date: IDate | null) => void;
    setDate2: (date: IDate | null) => void;
    setNextMonthDate: (date: Date) => void;
    setPrevMonthDate: (date: Date) => void;
    nextMonthDate: Date | null;
    prevMonthDate: Date | null;
    endRangeDate: IDate | null;
    setEndRangeDate: (date: IDate | null) => void
}


export const DatePickerContext = createContext<IDatePickerContext>({
    date1: null,
    date2: null,
    setDate1: () => null,
    setDate2: () => null,
    setNextMonthDate: () => null,
    setPrevMonthDate: () => null,
    nextMonthDate: null,
    prevMonthDate: null,
    endRangeDate: null,
    setEndRangeDate: () => null
});