const articleService = require("../services/Article.service")
const ObjectResponse = require("./response/ObjectResponse")

class ArticleController {
    async create(req ,res, next) {
        try {
            await articleService.create(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await articleService.update(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await articleService.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ArticleController()
