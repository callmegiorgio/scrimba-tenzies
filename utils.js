export function addLeadingZero(number, count) {
    return String(number).padStart(count, '0')
}

export function formatDate(date) {
    const day      = addLeadingZero(date.getDay(),   2)
    const month    = addLeadingZero(date.getMonth(), 2)
    const year     = String(date.getFullYear())
    const hours    = addLeadingZero(date.getHours(),   2)
    const minutes  = addLeadingZero(date.getMinutes(), 2)
    const seconds  = addLeadingZero(date.getSeconds(), 2)
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export function secondsToHms(secs) {
    const hours = Math.floor(secs / (60 * 60));

    const divisorForMinutes = secs % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    return `${addLeadingZero(hours, 2)}:${addLeadingZero(minutes, 2)}:${addLeadingZero(seconds, 2)}`
}