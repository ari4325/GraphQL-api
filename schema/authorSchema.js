const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt } = graphql;


const authorSchema = new GraphQLObjectType({
    name: "authorSchema",
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        age: { type: GraphQLInt }
    })
});

module.exports.authorSchema = authorSchema;