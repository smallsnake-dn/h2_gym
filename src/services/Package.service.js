

const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")

class PackageService {
    async create(req) {
        let createDate = dateTimeUtil.getCurrentDateInTimeZone()
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                isactived : true,
                createddate : createDate,
                createduser : "test user",
                isdeleted : false
            }
        });
        const user = req.userLogin;
        await db.core_package.createMany({
            data
        })
        return await db.core_package.findMany({
            select : {
                packageid : true,
                title : true,
                description : true,
                servicecategoriesid : true,
                imagepath : true,
                core_package_info : {
                    select : {
                        packageinfoid : true,
                        packagetitle : true,
                        packagevalue : true
                    },
                    where : {
                        isactived : true,
                        isdeleted : false
                    }
                }
            },
            where : {
                createddate : createDate
            }
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        return await db.core_package.update({
            data : {
                ...data,
                updateddate: dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser: "test"
            },
            where : {
                packageid : data.packageid
            },
            select : {
                packageid : true,
                title : true,
                description : true,
                servicecategoriesid : true,
                imagepath : true,
                core_package_info : {
                    select : {
                        packageinfoid : true,
                        packagetitle : true,
                        packagevalue : true
                    },
                    where : {
                        isactived : true,
                        isdeleted : false
                    }
                }
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
                servicecategoriesid : true,
                imagepath : true,
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
