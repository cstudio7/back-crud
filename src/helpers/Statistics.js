import moment from 'moment';
import Stats from '../helpers/Stat'



export default class Statistics {
    static week(arr) {

        const data = {
            Monday: Stats.calWeek(arr, 1),
            Tuesday: Stats.calWeek(arr, 2),
            Wednesday: Stats.calWeek(arr, 3),
            Thursday: Stats.calWeek(arr, 4),
            Friday: Stats.calWeek(arr, 5),
            Saturday: Stats.calWeek(arr, 6),
            Sunday: Stats.calWeek(arr, 7)
        }
       return data;
    }

    static weeks(arr) {

        const data = {
            Monday: Stats.calWeeks(arr, 1),
            Tuesday: Stats.calWeeks(arr, 2),
            Wednesday: Stats.calWeeks(arr, 3),
            Thursday: Stats.calWeeks(arr, 4),
            Friday: Stats.calWeeks(arr, 5),
            Saturday: Stats.calWeeks(arr, 6),
            Sunday: Stats.calWeeks(arr, 7)
        }
        return data;
    }

    static calMonth(arr) {
        const data = {
            January: Stats.calMonth(arr, 1),
            Febuary: Stats.calMonth(arr, 2),
            March: Stats.calMonth(arr, 3),
            April: Stats.calMonth(arr, 4),
            May: Stats.calMonth(arr, 5),
            June: Stats.calMonth(arr, 6),
            July: Stats.calMonth(arr, 7),
            August: Stats.calMonth(arr, 8),
            September: Stats.calMonth(arr, 9),
            October: Stats.calMonth(arr, 10),
            November: Stats.calMonth(arr, 11),
            December: Stats.calMonth(arr, 12)
        }
        return data;
    }

    static calMonths(arr) {
        const data = {
            January: Stats.calMonths(arr, 1),
            Febuary: Stats.calMonths(arr, 2),
            March: Stats.calMonths(arr, 3),
            April: Stats.calMonths(arr, 4),
            May: Stats.calMonths(arr, 5),
            June: Stats.calMonths(arr, 6),
            July: Stats.calMonths(arr, 7),
            August: Stats.calMonths(arr, 8),
            September: Stats.calMonths(arr, 9),
            October: Stats.calMonths(arr, 10),
            November: Stats.calMonths(arr, 11),
            December: Stats.calMonths(arr, 12)
        }
        return data;
    }


    static calYear(arr) {
        const data = {
            2020: Stats.calYear(arr, 2020),
            2021: Stats.calYear(arr, 2021),
            2022: Stats.calYear(arr, 2022),
            2023: Stats.calYear(arr, 2023),
            2024: Stats.calYear(arr, 2024),
            2025: Stats.calYear(arr, 2025)
        }
        return data;
    }

    static calYears(arr) {
        const data = {
            2020: Stats.calYears(arr, 2020),
            2021: Stats.calYears(arr, 2021),
            2022: Stats.calYears(arr, 2022),
            2023: Stats.calYears(arr, 2023),
            2024: Stats.calYears(arr, 2024),
            2025: Stats.calYears(arr, 2025)
        }
        return data;
    }
}
