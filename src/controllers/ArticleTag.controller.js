const articleTagService = require("../services/ArticleTag.service")
const ObjectResponse = require("./response/ObjectResponse")

class ArticleTagController {
    async create(req ,res, next) {
        try {
            let rs = await articleTagService.create(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            const ts = await articleTagService.update(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await articleTagService.delete(req);
            res.send("OK");
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ArticleTagController()
