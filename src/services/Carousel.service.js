const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class CarouselService {
    async create(req) {
        console.log(req.body.data);
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                description : val.description ? val.description : "",
                createddate : dateTimeUtil.getCurrentDateInTimeZone(),
                createduser : "test user",
                isactived : true,
                isdeleted : false
            }
        });
        const user = req.userLogin;
        await db.core_carousellist.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_carousellist.update({
            data : {
                ...data,
                updateduser : "test",
                updateteddate : dateTimeUtil.getCurrentDateInTimeZone()
            },
            where : {
                carousellistid : data.carousellistid
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_carousellist.update({
            data: {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser: "test",
                isdeleted: true
            },
            where : {
                carousellistid : data.carousellistid
            }
        })
    }

}


module.exports = new CarouselService();