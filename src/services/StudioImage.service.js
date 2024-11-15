const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class StudioImageService {
    async create(req) {
        // const data = req.body.data.map(async (val, index, arr) => {
        //     return {
        //         ...val,
        //         studioimagepath : await upToFirebase(req),
        //         description : val.description ? val.description : "",
        //         isactived : true,
        //         createduser : "test",
        //         createddate : dateTimeUtil.getCurrentDateInTimeZone(),
        //         isdeleted : false
        //     }
        // });
        const data = req.body
        const user = req.userLogin
        console.log({req});
        await db.core_studioimage.createMany({
            data : {
                ...data,
                studioimagepath : await upToFirebase(req),
                description : data.description ? data.description : "",
                isactived : true,
                createduser : "test",
                createddate : dateTimeUtil.getCurrentDateInTimeZone(),
                isdeleted : false
            }
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