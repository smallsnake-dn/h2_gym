const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class CustomerFeedBackService {
    async create(req) {
        let createDate = dateTimeUtil.getCurrentDateInTimeZone()
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                isactived : true,
                createduser : "test",
                createddate : createDate,
                isdeleted : false
            }
        });
        const user = req.userLogin
        await db.core_customerfeedback.createMany({
            data
        })
        return await db.core_customerfeedback.findMany({
            select : {
                customerfeedbackid : true,
                customername : true,
                avatar : true,
                content : true,
                gender : true,
                numberofstar : true,
                videopath : true
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
        return await db.core_customerfeedback.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                customerfeedbackid : parseInt(params.id)
            },
            select : {
                customerfeedbackid : true,
                customername : true,
                avatar : true,
                content : true,
                gender : true,
                numberofstar : true,
                videopath : true
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        await db.core_customerfeedback.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                customerfeedbackid : parseInt(params.id)
            }
        })
    }

    async getById(req) {
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
                isdeleted : false,
                customerfeedbackid: parseInt(params.id)
            }
        })
        return rs;
    }
    
    async get(req) {
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
            }
        })
        return rs;
    }
}


module.exports = new CustomerFeedBackService();