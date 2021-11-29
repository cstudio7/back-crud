import moment from 'moment';

export default class Stats {
    static calWeek (arr, day) {
        let ar = arr.filter( (num => moment(num.createdAt).day() === day) )

        let sum = 0
        for(let i = 0; i<ar.length; i++){
            let co = parseInt(ar[i].readingValue.split('-')[0], 10)
            sum+= co
        }
        return sum
    }

    static calWeeks (arr, day) {
        let ar = arr.filter( (num => moment(num.createdAt).day() === day) )

        let sum = 0
        for(let i = 0; i<ar.length; i++){
            let co = parseInt(ar[i].bpm.split('-')[0], 10)
            sum+= co
        }
        return sum
    }

    static calMonth(arr, month) {
        let ar = arr.filter( (num => moment(num.createdAt).month() + 1 === month))
        let sum = 0
        for(let i = 0; i<ar.length; i++){
            let co = parseInt(ar[i].readingValue.split('-')[0], 10)
            sum+= co
        }
        return sum
    }

    static calMonths(arr, month) {
        let ar = arr.filter( (num => moment(num.createdAt).month() + 1 === month))
        let sum = 0
        for(let i = 0; i<ar.length; i++){
            let co = parseInt(ar[i].bpm.split('-')[0], 10)
            sum+= co
        }
        return sum
    }

    static calYear(arr, year) {
        let ar = arr.filter( (num => moment(num.createdAt).year() === year) )
        let sum = 0
        for(let i = 0; i<ar.length; i++){
            let co = parseInt(ar[i].readingValue.split('-')[0], 10)
            sum+= co
        }
        return sum
    }

    static calYears(arr, year) {
        let ar = arr.filter( (num => moment(num.createdAt).year() === year) )
        let sum = 0
        for(let i = 0; i<ar.length; i++){
            let co = parseInt(ar[i].bpm.split('-')[0], 10)
            sum+= co
        }
        return sum
    }
}
