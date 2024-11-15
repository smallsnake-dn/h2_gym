const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class StudioImageService {
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
        await db.core_studioimage.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_studioimage.update({
            data : {
                ...data,
                updateddated : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                studioimageid : data.studioimageid
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        await db.core_studioimage.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                studioimageid : parseInt(params.id)
            }
        })
    }

    async getByLimit (req) {
        const data = req.body.data;
        const params = req.params;
        const rs = db.core_studioimage.findMany({
            select :  {
                studioimageid : true,
                studioimagename : true,
                studioimagepath : true,
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


module.exports = new StudioImageService();