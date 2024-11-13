const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class ArticleService {
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
        await db.core_article.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_article.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                articleid : data.articleid
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
        const rs = await db.core_article.findMany({
            select : {
                articleid : true,
                articletagid : true,
                content : true,
                title : true
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


module.exports = new ArticleService();