const articleService = require("../services/Article.service")
const ObjectResponse = require("./response/ObjectResponse")

class ArticleController {
    async create(req ,res, next) {
        try {
            let rs = await articleService.create(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            let rs = await articleService.update(req);
            res.send(ObjectResponse.ok(rs));
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

    async getByLimit(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await articleService.getByLimit(req)));
        } catch (error) {
            next(error)
        }
    }
    
    
    async getById(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await articleService.getById(req)));
        } catch (error) {
            next(error)
        }
    }
    
    async get(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await articleService.get(req)));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ArticleController()
