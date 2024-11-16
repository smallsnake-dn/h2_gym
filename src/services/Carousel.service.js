const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class CarouselService {
    async create(req) {
        let createDate = dateTimeUtil.getCurrentDateInTimeZone()
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                description : val.description ? val.description : "",
                createddate : createDate,
                createduser : "test user",
                isactived : true,
                isdeleted : false
            }
        });
        const user = req.userLogin;
        await db.core_carousellist.createMany({
            data
        })
        return await db.core_carousellist.findMany({
            select : {
                carousellistid : true,
                carousellistname : true,
                carouselpath : true,
                description : true
            },
            where : {
                createddate : createDate
            }
        })
    }

    async update(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        return await db.core_carousellist.update({
            data : {
                ...data,
                updateduser : "test",
                updateteddate : dateTimeUtil.getCurrentDateInTimeZone()
            },
            where : {
                carousellistid : parseInt(params.id)
            },
            select : {
                carousellistid : true,
                carousellistname : true,
                carouselpath : true,
                description : true
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

    async getById(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        const rs = await db.core_carousellist.findMany({
            select : {
                carousellistid : true,
                carousellistname : true,
                carouselpath : true,
                description: true
            },
            where : {
                isactived : true,
                isdeleted : false,
                carousellistid: parseInt(params.id)
            }
        })
        return rs;
    }
    
    async get(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        const rs = await db.core_carousellist.findMany({
            select : {
                carousellistid : true,
                carousellistname : true,
                carouselpath : true,
                description: true
            },
            where : {
                isactived : true,
                isdeleted : false
            }
        })
        return rs;
    }

}


module.exports = new CarouselService();