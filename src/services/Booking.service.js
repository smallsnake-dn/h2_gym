const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class BookingService {
    async create(req) {
        const data = req.body.data.map((val, index, arr) => {
            return {
                statusid : 0,
                description : val.description ? val.description : "",
                isactived : true,
                createduser : "test",
                createddate : dateTimeUtil.getCurrentDateInTimeZone(),
                isdeleted : false,
                ...val,
                apointmenttime : new Date(val.apointmenttime)
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
        const params = req.params;
        const user = req.userLogin;
        await db.core_booking.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                bookingid : parseInt(params.id)
            }
        })
    }

    async getByLimit(req) {
        const data = req.body.data;
        const params = req.params;
        const rs = await db.core_booking.findMany({
            select : {
                bookingid : true,
                apointmenttime : true,
                customername : true,
                createddate : true,
                phone : true,
                statusid : true,
                statusnote : true,
                description : true
            },
            where : {
                isactived : true,
                isdeleted : false
            }, 
            take : parseInt(params.limit)
        })
        return rs;
    }

}


module.exports = new BookingService();