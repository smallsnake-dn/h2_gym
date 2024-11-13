

const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")

class PackageService {
    async create(req) {
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                isactived : true,
                createddate : dateTimeUtil.getCurrentDateInTimeZone(),
                createduser : "test user",
                isdeleted : false
            }
        });
        const user = req.userLogin;
        await db.core_package.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_package.update({
            data : {
                ...data,
                updateddate: dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser: "test"
            },
            where : {
                packageid : data.packageid
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        await db.core_package.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where : {
                packageid : parseInt(params.id)
            }
        })
    }

    async getByLimit(req) {
        const data = req.body.data;
        const params = req.params;
        const rs = db.core_package.findMany({
            select : {
                packageid : true,
                title : true,
                description : true,
                core_package_info : {
                    select : {
                        packageinfoid : true,
                        packagetitle : true,
                        packagevalue : true
                    },
                    where : {
                        isactived : true,
                        isdeleted : false
                    },
                    take : parseInt(params.limit),
                    orderBy : {
                        createddate : "desc"
                    }
                }
            },
            where : {
                isactived : true,
                isdeleted : false
            }
        })
        return rs;
    }
}

module.exports = new PackageService();
