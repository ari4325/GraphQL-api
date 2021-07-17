const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt } = graphql;

const BookType = new GraphQLObjectType({
 name: 'Book',
 fields: () => ({
     id: { type: GraphQLID  },
     name: { type: GraphQLString }, 
     pages: { type: GraphQLInt }
 })
});

module.exports.BookType = BookType;