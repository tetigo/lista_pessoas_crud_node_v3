const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro-orm', 'root','',{
    dialect: 'mysql',
    host: 'localhost'
})

const fs = require('fs')
const path = require('path')
const models = {}

//testando conexão
//banco precisa existir primeiro ou erro
// sequelize.authenticate()
//  .then(()=>console.log('conectado'))
//  .finally(()=>{
//      sequelize.close()
//      console.log('desconectado')
//  })

//colocar cada model em seu devido arquivo separado
// const Pessoa = sequelize.define('Pessoa', {
//     nome: Sequelize.STRING,
//     cargo: Sequelize.STRING
// })

//ao invés de fazer require, sequelize
//tem funcao pra importar e já injeta na funcao
//o sequelize e datatypes
// const pessoaModel = require('./pessoa')

// ao importar, devemos alterar o model
// porque já injeta automatico o proprio 
// sequelize e tambem o DataTypes
// const pessoa = sequelize.import('./pessoa')

//ao invez de importar 1 por 1 cada model
//podemos automatizar 
fs
.readdirSync(__dirname)
.filter(file => file !== 'index.js')
.forEach(file=>{
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model
    console.log(model.name)
})
Object.keys(models)
.forEach((modelName) =>{
    console.log(modelName)
    if('associate' in models[modelName]){
        models[modelName].associate(models)
    }
})

// muito mais simples, mas mano a mano
// models.Pessoa.hasOne(models.Usuario)

//sincronizar com o banco
//na 1º vez vai criar o mesmo
//devemos exportar o sequelize para 
//sincronizar com o banco antes de startar
//o servidor na porta 3000
// sequelize.sync()
//  .then(()=>{console.log('sincronizado')})
//  .finally(()=>sequelize.close())

//ao invez de exportar apenas sequelize
//precisamos exportar todos os models
//entao exportamos um objeto contendo tudo
// module.exports = {
//     sequelize,
//     models: {
//         pessoa
//     }
// }

//ao invez de exportar models 1 por 1
//agora podemos exportar todos automaticamente
module.exports = {
    sequelize,
    models
}

