var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
    /* GET articles listing. */
router.get('/', async function(req, res, next) {
    let skip = req.query.skip
    let take = req.query.take
    let articles = await prisma.article.findMany()
    skip = skip || 0
    take = take || 10
    const u = [...articles]
    res.send(u.splice(skip, take));
});
/* GET article by id. */
router.get('/:id', async function(req, res, next) {
    const article = await prisma.article.findUnique({
        where: {
            id: +req.params.id
        }
    })

    if (article != {}) {
        res.status(200)
        res.send(article);
    } else {
        res.status(404)
        res.send({})
    }

});
/* POSt add article. */
router.post('/', async function(req, res, next) {
    try {
        const article = await prisma.article.create({
            data: req.body
        })
        res.status(200)
        res.send(article)
    } catch (e) {

        console.log(
            'email already exist !!'
        )
        throw e
    }

});
/* PAtCH update article. */
router.patch('/', async function(req, res, next) {

    const article = await prisma.article.update({
        where: { id: +req.body.id },
        data: req.body,
    })
    res.status(201)
    res.send(article)
});
/* delete article with id . */
router.delete('/:id', async function(req, res, next) {
    try {
        const u = await prisma.article.delete({
            where: { id: +req.params.id },
        })
        res.status(204)
        res.send(u)
    } catch (e) {

        console.log(
            'There is no article here with this id !!'
        )
        throw e
    }


});
module.exports = router;