function parseDate(dateStr) {
    const date = new Date(dateStr)
    var options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
}

export { parseDate }