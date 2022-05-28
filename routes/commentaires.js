var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
    /* GET commentaires listing. */
router.get('/', async function(req, res, next) {
    let skip = req.query.skip
    let take = req.query.take
    let commentaires = await prisma.commentaire.findMany()
    skip = skip || 0
    take = take || 10
    const u = [...commentaires]
    res.send(u.splice(skip, take));
});
/* GET commentaire by id. */
router.get('/:id', async function(req, res, next) {
    const commentaire = await prisma.commentaire.findUnique({
        where: {
            id: +req.params.id
        }
    })

    if (commentaire != {}) {
        res.status(200)
        res.send(commentaire);
    } else {
        res.status(404)
        res.send({})
    }

});
/* POSt add commentaire. */
router.post('/', async function(req, res, next) {
    try {
        const commentaire = await prisma.commentaire.create({
            data: req.body
        })
        res.status(200)
        res.send(commentaire)
    } catch (e) {

        console.log(
            'email already exist !!'
        )
        throw e
    }

});
/* PAtCH update commentaire. */
router.patch('/', async function(req, res, next) {

    const commentaire = await prisma.commentaire.update({
        where: { id: +req.body.id },
        data: req.body,
    })
    res.status(201)
    res.send(commentaire)
});
/* delete commentaire with id . */
router.delete('/:id', async function(req, res, next) {
    try {
        const u = await prisma.commentaire.delete({
            where: { id: +req.params.id },
        })
        res.status(204)
        res.send(u)
    } catch (e) {

        console.log(
            'There is no commentaire here with this id !!'
        )
        throw e
    }


});
module.exports = router;