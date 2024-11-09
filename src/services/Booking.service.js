const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class BookingService {
    async create(req) {
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                description : val.description ? val.description : "",
                isactived : true,
                createduser : "test",
                createddate : dateTimeUtil.getCurrentDateInTimeZone(),
                isdeleted : false
            }
        });
        const user = req.userLogin
        await db.core_booking.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_booking.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                bookingid : data.bookingid 
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_booking.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                bookingid : data.bookingid
            }
        })
    }

}


module.exports = new BookingService();