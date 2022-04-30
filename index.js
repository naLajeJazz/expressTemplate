const express = require('express');  
const app = express();
const bodyParser= require('body-parser');
const connection=require('./database/database');
const Dados= require('./database/dados')


// faz a conexão Database

connection
        .authenticate()
        .then(()=>{
                console.log("Conexão com o banco de dados ok!")
        })
        .catch((err)=>{
                console.log(err)
        });


app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rota home
app.get("/",function(req,res) {

        let mostraTxt=true
res.render("home/index",{

        texto:'Isso é uma variavel string',
        mostra:mostraTxt
})  
});


//rota home
app.get("/home",function(req,res) {

        let mostraTxt=true
res.render("home/index",{

        texto:'Isso é uma variavel string',
        mostra:mostraTxt
})  
});


//rota arte
app.get("/arte",function(req,res) {

        let mostraTxt=true
res.render("arte/index",{

        texto:'Isso é uma variavel string',
        mostra:mostraTxt
})  
});

//rota devportifolio
app.get("/dev",function(req,res) {

        let mostraTxt=true
res.render("dev/index",{

        texto:'Isso é uma variavel string',
        mostra:mostraTxt
})  
});


//rota contato
app.get("/contato",function(req,res) {

        
res.render("contato/index",{

       
})  
});


//rota sobre
app.get("/sobre",function(req,res) {

        
res.render("sobre/index",{

       
})  
});
//rota contatosubmit
app.get("/contatosubmit",function(req,res) {

        
res.render("contatosubmit/index",{

       
})  
});
//rota contatosubmit
app.get("/admin",function(req,res) {

        var adminMode=true;
        
        let lista=[
                {nome:"Rod",email:"lala@lala"},
                {nome:"Naima",email:"lala@lala"},
                {nome:"Nuita",email:"lala@lala"},
                {nome:"Rod",email:"lala@lala"},
                {nome:"Naima",email:"lala@lala"},
                {nome:"Nuita",email:"lala@lala"},
                {nome:"Tab",email:"lala@lala"}
                
        ]
        
res.render("admin/index",{

       mode:adminMode,
       lista:lista,
       
});

});

//rota dados(direciona dados do formulario)
app.post("/dados" , function(req,res){
        var adminMode=true;
        let meuNome="rod"
        let meuEmail="lala@lala";
        let minhaSenha="aaa";
        //variaveis recebem dados do formulario
        let nome=req.body.nome;
        let email=req.body.email;
        let senha=req.body.senha;

         //coloco esses dados em uma lista de objetos
         let dadosUsuario=[
                {nome:nome,
                 email:email,
                 senha:senha
                }
                
        ];
        ///cria tabela no banco de dados mysql
        Dados.create({
               nome:nome,
               email:email,
               senha:senha         
        }).then(()=>{


                if (email == meuEmail && senha == minhaSenha && nome == meuNome ){
                        adminMode=false };
        
                if (adminMode==false){
        
                        res.render("admin/index",{
        
                                mode:adminMode,
                                lista:dadosUsuario
                                
                        });
                };





                
        })
       
        
       
});


app.listen(process.env.PORT || 1321,function(erro){

erro ? 
console.log("opa aconteceu um erro!") :
console.log("oba servidor rodando!");

});