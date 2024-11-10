const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class CustomerFeedBackService {
    async create(req) {
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                isactived : true,
                createduser : "test",
                createddate : dateTimeUtil.getCurrentDateInTimeZone(),
                isdeleted : false
            }
        });
        const user = req.userLogin
        await db.core_customerfeedback.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_customerfeedback.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                customerfeedbackid : data.customerfeedbackid
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_customerfeedback.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                customerfeedbackid : data.customerfeedbackid
            }
        })
    }

    async getByLimit(req) {
        const data = req.body.data;
        const params = req.params;
        const rs = await db.core_customerfeedback.findMany({
            select :{
                customerfeedbackid : true,
                avatar : true,
                content : true,
                customername : true,
                gender : true,
                numberofstar : true,
                videopath : true
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


module.exports = new CustomerFeedBackService();