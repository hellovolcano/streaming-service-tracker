module.exports = {
    format_date: date => {
        if(date) {
            const dateArr = date.split('-')
        const newDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0]
        return newDate
        }
        
        return 'N/A'
    }
}