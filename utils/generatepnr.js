generatePnr = () => {
    const no = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
    const flightPnr = 'PNR' + no
    return flightPnr
}

module.exports = { generatePnr }