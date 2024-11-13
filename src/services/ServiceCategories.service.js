const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class ServiceCategoriesService {
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
        await db.core_servicecategories.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_servicecategories.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                servicecategoriesid: data.servicecategoriesid
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params
        const user = req.userLogin;
        await db.core_servicecategories.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                servicecategoriesid : parseInt(params.id)
            }
        })
    }

    async getByLimit(req) {
        const data = req.body.data;
        const params = req.params;
        const rs = await db.core_servicecategories.findMany({
            select : {
                servicecategoriesid : true,
                servicecategoriesname : true,
                icon : true,
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


module.exports = new ServiceCategoriesService();