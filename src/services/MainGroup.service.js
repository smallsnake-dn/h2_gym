const db = require('../providers/db')


class MainGroupService {
    async insert (data) {
        db.md_maingroup.create({
            data : data
        })
    }

    async update (data) {
        db.md_maingroup.update({
            data : data,
            where : {
                maingroupid : data.maingroupid
            }
        })
    }

    async delete (data) {
        db.md_maingroup.delete({
            where : {
                maingroupid : data.maingroupid
            }
        })
    }
}

module.exports = new MainGroupService()