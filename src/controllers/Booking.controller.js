const bookingService = require("../services/Booking.service")
const ObjectResponse = require("./response/ObjectResponse")

class BookingController {
    async create(req ,res, next) {
        try {
            let rs = await bookingService.create(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            let rs = await bookingService.update(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await bookingService.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await bookingService.getById(req)));
        } catch (error) {
            next(error)
        }
    }
    
    async get(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await bookingService.get(req)));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new BookingController()