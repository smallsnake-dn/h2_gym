const db = require("../providers/db")
const dateTimeUtil = require("../utils/DateTime.util")

class CoachService {
    async create(req) {
        const data = req.body.data.map((val, index, arr) => {
            return {
                ...val,
                dob : new Date(val.dob),
                startdate : new Date(val.startdate),
                phone : val.phone? val.phone : "",
                email : val.email,
                isactived : true,
                createddate : dateTimeUtil.getCurrentDateInTimeZone(),
                createduser : "test user",
                isdeleted : false
            }
        });
        const user = req.userLogin;
        await db.core_coachlist.createMany({
            data
        })
    }

    async update(req) {
        const data = req.body.data;
        const user = req.userLogin;
        await db.core_coachlist.update({
            data : {
                ...data,
                updateddate: dateTimeUtil.getCurrentDateInTimeZone(),
                updateduser: "test"
            },
            where : {
                coachlistid : data.coachlistid
            }
        })
    }

    async delete(req) {
        const data = req.body.data;
        const params = req.params;
        const user = req.userLogin;
        await db.core_coachlist.update({
            data : {
                deleteddate : dateTimeUtil.getCurrentDateInTimeZone(),
                deleteduser : "test",
                isdeleted: true
            },
            where : {
                coachlistid : parseInt(params.id)
            }
        })
    }

    async getByLimit(req) {
        const data = req.body.data;
        const params = req.params;
        const rs = db.core_coachlist.findMany({
            select : {
                coachlistid : true,
                avatar : true,
                dob: true,
                email : true,
                experience : true,
                startdate : true,
                firstname : true,
                lastname : true,
                phone : true
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

module.exports = new CoachService();