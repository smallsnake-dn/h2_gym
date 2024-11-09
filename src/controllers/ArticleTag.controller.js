const articleTagService = require("../services/ArticleTag.service")

class ArticleTagController {
    async create(req ,res, next) {
        try {
            await articleTagService.create(req);
            res.send("OK");
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await articleTagService.update(req);
            res.send("OK");
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
