var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
    /* GET categories listing. */
router.get('/', async function(req, res, next) {
    let skip = req.query.skip
    let take = req.query.take
    let categories = await prisma.categorie.findMany()
    skip = skip || 0
    take = take || 10
    const u = [...categories]
    res.send(u.splice(skip, take));
});
/* GET categorie by id. */
router.get('/:id', async function(req, res, next) {
    const categorie = await prisma.categorie.findUnique({
        where: {
            id: +req.params.id
        }
    })

    if (categorie != {}) {
        res.status(200)
        res.send(categorie);
    } else {
        res.status(404)
        res.send({})
    }

});
/* POSt add categorie. */
router.post('/', async function(req, res, next) {
    try {
        const categorie = await prisma.categorie.create({
            data: req.body
        })
        res.status(200)
        res.send(categorie)
    } catch (e) {

        console.log(
            'email already exist !!'
        )
        throw e
    }

});
/* PAtCH update categorie. */
router.patch('/', async function(req, res, next) {

    const categorie = await prisma.categorie.update({
        where: { id: +req.body.id },
        data: req.body,
    })
    res.status(201)
    res.send(categorie)
});
/* delete categorie with id . */
router.delete('/:id', async function(req, res, next) {
    try {
        const u = await prisma.categorie.delete({
            where: { id: +req.params.id },
        })
        res.status(204)
        res.send(u)
    } catch (e) {

        console.log(
            'There is no categorie here with this id !!'
        )
        throw e
    }


});
module.exports = router;