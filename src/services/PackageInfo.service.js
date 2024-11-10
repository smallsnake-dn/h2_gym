const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")


class PackageInfoService {
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
        await db.core_package_info.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_package_info.update({
            data : {
                ...data,
                updateddate : dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser : "test"
            },
            where : {
                packageinfoid : data.packageinfoid
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_package_info.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where: {
                packageinfoid : data.packageinfoid
            }
        })
    }


}


module.exports = new PackageInfoService();