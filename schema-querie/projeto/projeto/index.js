const {ApolloServer, gql}  = require('apollo-server')

const usuarios = [
{
   id:1,
   nome: "joda silva",
   email: "joao@gmail.com",
   idade: 29
},
{
   id:2,
   nome: "tereza cristina",
   email: "terezacristina@gmail.com",
   idade: 49
},
{
   id:3,
   nome: "alan bida",
   email: "alan@gmail.com",
   idade: 19
},
]

const perfis = [
   {id:1, nome: "comun"},
   {id: 2, nome:"administrador"}
]



const typeDefs = gql`
   scalar Date


   #tpo personalizado 
   
   type User {
      id: ID
      nome: String! 
      email: String! 
      idade: Int
      salario: Float
      vip: Boolean
   }
   type Perfil{
      id: Int
      nome: String
   }


   type Produto{
      nome: String!
      preco: Float!
      desconto: Float
      precoComDesconto: Float
   }   


  # ponto de entrada do grafo  
 type Query {
    ola: String
    horaCerta: Date
    usuarioLogado: User
    produtoEmDestaque: Produto
    numerosMegaSena: [Int]!
    usuarios: [User]
    usuarioByID(id: ID): User
    perfis: [Perfil]
    perfisByID(id: Int): Perfil
   }
`

const resolvers = {
// #resolver nomes 
   User: {
      salario(usuario){
         console.log(usuario)
         return usuario.salario_real
      }
   },
   Produto: {
      precoComDesconto(produto){ 
         if(produto.desconto){
            return produto.preco * (1 - produto.desconto)
         }else{
            return produto.preco
         }
     },
     desconto(produto){
      if(produto.desconto){
         return produto.desconto * 100
      }else if(produto.desconto == null){
         return 0
      }
     }
   },


 // aqui vai a busca 
   Query: {
      ola(){
        return `aqui estou retornando a query ola`
      },
      horaCerta(){
        let data = new Date().toString()

        return new Date
      },

      usuarioLogado(){
            return {
               id: 1,
               nome: "RENAN",
               email: "renan@gmail.com",
               idade: 26,
               salario_real: 1.123,
               vip: true

            }
      },
      produtoEmDestaque(){
         return{
            nome: "Havaianas",
            preco: 44.90,
            
         }
      },
      numerosMegaSena(){
         // return [4,5,6,6,45,4]
         const crescente = (a,b) => a - b
         return Array(6).fill(0).map(n=> parseInt(Math.random() * 60 + 1)).sort(crescente)
      },
      usuarios(){
         return usuarios
      },
      usuarioByID(_, args){
         const selecionados = usuarios.filter(user => user.id == args.id)
         return selecionados ? selecionados[0] : null
      },

      perfis(){
         return  perfis
      },
      perfisByID(_, {id}){
         const selecionados = perfis.filter(perfil => perfil.id == id)
         return selecionados ? selecionados[0] : null
      }


   }

}

const server = new ApolloServer({
    typeDefs,
    resolvers

})

server.listen().then(({url}) => {
    console.log(`Executando servidor na porta ${url}`);

})