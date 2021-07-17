const graphql = require('graphql');
const { BookType } = require('../schema/bookSchema');
const { authorSchema } = require('../schema/authorSchema');
const author = require('../mongooseSchema/author');

const { GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = graphql;

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
            resolve(parent, args) {
                //if(args.id) return fakeBookDatabase.find((item) => { return item.id == args.id});
                //if(args.name) return fakeBookDatabase.find((item) => { return item.name == args.name});
            }
        },
        author: {
            type: authorSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return fakeAuthorDatabase.find((item) => {return item.id == args.id; });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: authorSchema,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author1 = new author({
                    name: args.name,
                    age: args.age
                })
                return author1.save();
            } 
        }
    }
})

module.exports.rootQuery = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
})