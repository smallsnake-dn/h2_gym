const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class PackageInfoService {
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
        await db.core_package_info.createMany({
            data
        })
        return await db.core_package_info.findMany({
            select : {
                packageinfoid: true,
                packageid : true,
                packagetitle : true,
                packagevalue : true
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
        return await db.core_package_info.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                packageinfoid : parseInt(params.id)
            },
            select : {
                packageinfoid: true,
                packageid : true,
                packagetitle : true,
                packagevalue : true
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        await db.core_package_info.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                packageinfoid : parseInt(params.id)
            }
        })
    }


}


module.exports = new PackageInfoService();