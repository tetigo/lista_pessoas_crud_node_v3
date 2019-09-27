// const model2 = require('../models/pessoas')
// const model = require('../models/index')
const print = (msg) => console.log(msg)

const index = async({Pessoa}, req, res)=>{
// const index = async(req, res)=>{
    // const pessoas = await model.models.pessoa.findAll()
    // print(model2.lista1)
    const pessoas = await Pessoa.findAll()
    res.render('pessoas/index', {pessoas})
}

const createForm = (req, res)=>{
    res.render('pessoas/create')
}

const createProcess = async({Pessoa}, req, res)=>{
    const dados = req.body
    await Pessoa.create(dados)
    // res.send(dados)
    res.redirect('/pessoas')
}

const deleteOne = async({Pessoa}, req, res)=>{
    await Pessoa.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pessoas')
}

const about = (req, res)=>{
    // print(model2.lista2)
    res.render('pessoas/about')
}

const editForm = async({Pessoa}, req, res)=>{
    console.log(req.params.id)
    const pessoa = await Pessoa.findByPk(req.params.id)
    res.render('pessoas/edit', {pessoa})
}

const editProcess = async({Pessoa}, req, res)  =>{
    await Pessoa.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pessoas')
}

module.exports = {
    index,
    about,
    createForm,
    createProcess,
    deleteOne,
    editForm,
    editProcess
}

