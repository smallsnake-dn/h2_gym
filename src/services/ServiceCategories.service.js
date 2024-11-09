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
        const user = req.userLogin;
        await db.core_servicecategories.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                servicecategoriesid : data.servicecategoriesid
            }
        })
    }

}


module.exports = new ServiceCategoriesService();