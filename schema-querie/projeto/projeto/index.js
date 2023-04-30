const {ApolloServer, gql}  = require('apollo-server')

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