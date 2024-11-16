const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class ServiceCategoriesService {
    async create(req) {
        const createDate = dateTimeUtil.getCurrentDateInTimeZone()
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                description : val.description ? val.description : "",
                isactived : true,
                createduser : "test",
                createddate : createDate,
                isdeleted : false
            }
        });
        const user = req.userLogin
        await db.core_servicecategories.createMany({
            data
        })
        return await db.core_servicecategories.findMany({
            select : {
                servicecategoriesid : true,
                servicecategoriesname : true,
                icon : true,
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
        return await db.core_servicecategories.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                servicecategoriesid: parseInt(params.id)
            },
            select : {
                servicecategoriesid : true,
                servicecategoriesname : true,
                icon : true,
                description : true
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

    async getById(req) {
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
                isdeleted : false,
                servicecategoriesid: parseInt(params.id)
            }
        })
        return rs;
    }
    
    async get(req) {
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
            }
        })
        return rs;
    }

}


module.exports = new ServiceCategoriesService();