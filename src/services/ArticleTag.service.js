const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class ArticleTagService {
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
        await db.core_articletag.createMany({
            data
        })
        return await db.core_articletag.findMany({
            select : {
                articletagid : true,
                articletagname : true
            },
            where : {
                createddate : createDate
            }
        })
    }

    async update(req) {
        const data = req.body.data;
        const params = req.params
        const user = req.userLogin;
        return await db.core_articletag.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                articletagid : parseInt(params.id)
            },
            select : {
                articletagid : true,
                articletagname : true
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params
        const user = req.userLogin;
        await db.core_articletag.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                articletagid : parseInt(params.id)
            }
        })
    }
    
    
    async getById(req) {
        const data = req.body.data;
        const params = req.params
        const user = req.userLogin;
        return await db.core_articletag.findMany({
            select : {
                articletagid : true,
                articletagname : true
            },
            where: {
                articletagid : parseInt(params.id)
            }
        })
    }
    
    
    async get(req) {
        const data = req.body.data;
        const params = req.params
        const user = req.userLogin;
        return await db.core_articletag.findMany({
            select : {
                articletagid : true,
                articletagname : true
            },
            where: {
                isactived : true,
                isdeleted : false
            }
        })
    }

}


module.exports = new ArticleTagService();