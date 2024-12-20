const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class ArticleService {
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
        await db.core_article.createMany({
            data
        })
        return await db.core_article.findMany({
            select : {
                articleid : true,
                articletagid : true,
                content : true,
                title : true,
                imagepath : true,
                summary : true,
                createddate : true
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
        return await db.core_article.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                articleid : parseInt(params.id)
            },
            select : {
                articleid : true,
                articletagid : true,
                content : true,
                title : true,
                imagepath : true,
                summary : true,
                createddate : true
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        await db.core_article.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                articleid : parseInt(params.id)
            }
        })
    }

    async getByLimit(req) {
        const data = req.body.data;
        const params = req.params;
        const limit = data.limit;
        const rs = await db.core_article.findMany({
            select : {
                articleid : true,
                articletagid : true,
                content : true,
                title : true,
                summary : true,
                createddate : true
            },
            where : {
                isactived : true,
                isdeleted : false
            },
            take : limit
            // take : parseInt(params.limit)
        })
        return rs;
    }
    
    
    async getById(req) {
        const data = req.body.data;
        const params = req.params;
        const rs = await db.core_article.findMany({
            select : {
                articleid : true,
                articletagid : true,
                content : true,
                title : true,
                imagepath : true,
                summary : true,
                createddate : true
            },
            where : {
                isactived : true,
                isdeleted : false,
                articleid : {
                    equals: parseInt(params.id)
                }
            },
            // take : parseInt(params.limit)
        })
        return rs;
    }
    
    async get(req) {
        const data = req.body.data;
        const params = req.params;
        const rs = await db.core_article.findMany({
            select : {
                articleid : true,
                articletagid : true,
                content : true,
                title : true,
                imagepath : true,
                summary : true,
                createddate : true
            },
            where: {
                isactived: true,
                isdeleted: false
            }
        })
        return rs;
    }

}


module.exports = new ArticleService();