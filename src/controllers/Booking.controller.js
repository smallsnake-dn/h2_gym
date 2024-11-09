const bookingService = require("../services/Booking.service")

class BookingController {
    async create(req ,res, next) {
        try {
            await bookingService.create(req);
            res.send("OK");
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await bookingService.update(req);
            res.send("OK");
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await bookingService.delete(req);
            res.send("OK");
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new BookingController()