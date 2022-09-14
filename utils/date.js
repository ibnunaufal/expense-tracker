export default function getDate(date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

export function getMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}