const luxon = require("luxon")

module.exports = {
    getCurrentDateInTimeZone : () => {
        const date = new Date()
        return new Date(date.getTime() + 7 * 60 * 60 * 1000)
    },
    getCurrentTimeLuxon : () => luxon.DateTime.now().plus()
}