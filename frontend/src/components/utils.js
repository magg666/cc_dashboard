export function formatShortTime(dateString) {
    let date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

export function formatTime(hour, minutes, seconds) {
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    return hour + ':' + minutes + ':' + seconds
}

export function formatDate(dateString) {
    let date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }).format(date)
}

/**
 * Formats dateString as [weekday (full name) month (shortcut) day (number)]
 * @param dateString
 * @returns {string}
 */
export function formatCalendarDate(dateString) {
    let date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        month: 'short',
        day: '2-digit'
    }).format(date)
}

/**
 * Counts days from today to date defined by dateString
 * @param dateString
 * @returns {number}
 */
export function countDaysFromToday(dateString) {
    const oneDay = 1000 * 3600 * 24;
    const today = new Date();
    const someDate = new Date(dateString);
    const start = Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate());
    const end = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    return (start - end) / oneDay;
}

/**
 * Selects message accordingly to number of days left to startDate
 * @param startDate
 * @returns {string}
 */
export function adjustMessageToEvent(startDate) {
    let difference_In_Days = countDaysFromToday(startDate);
    if (difference_In_Days === 1) {
        return "It will be tomorrow"
    } else if (difference_In_Days >= 2) {
        return `in ${difference_In_Days} days`
    } else {
        return "It's today"
    }
}





