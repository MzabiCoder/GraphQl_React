const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const _ = require("lodash");

const books = [
  {
    id: "1",
    name: "book1",
    genre: "horror",
    authID: "1",
  },
  {
    id: "2",
    name: "book2",
    genre: "comedy",
    authID: "2",
  },
  {
    id: "3",
    name: "book3",
    genre: "love",
    authID: "3",
  },
  {
    id: "4",
    name: "book4",
    genre: "horror",
    authID: "2",
  },
  {
    id: "5",
    name: "book5",
    genre: "comedy",
    authID: "3",
  },
  {
    id: "6",
    name: "book6",
    genre: "love",
    authID: "3",
  },
];

const authors = [
  {
    id: "1",
    name: "author1",
    age: 76,
  },
  {
    id: "2",
    name: "author2",
    age: 23,
  },
  {
    id: "3",
    name: "author3",
    age: 98,
  },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    author: {
      type: AuthType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { authID: parent.id });
      },
    },
  }),
});

const AuthType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, {
          id: args.id,
        });
      },
    },
    author: {
      type: AuthType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(authors, {
          id: args.id,
        });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
