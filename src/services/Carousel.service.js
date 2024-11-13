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
        const params = req.params;
        const user = req.userLogin;
        await db.core_carousellist.update({
            data: {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser: "test",
                isdeleted: true
            },
            where : {
                carousellistid : parseInt(params.id)
            }
        })
    }

    async getLimit(req) {
        console.log({req : req.params});
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        const rs = await db.core_carousellist.findMany({
            select : {
                carousellistid : true,
                carousellistname : true,
                carouselpath : true
            },
            where : {
                isactived : true,
                isdeleted : false
            }
            ,
            skip : 0,
            take : parseInt(params.limit)
        })
        return rs;
    }

}


module.exports = new CarouselService();