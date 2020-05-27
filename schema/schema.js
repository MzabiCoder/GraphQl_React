const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require("lodash");
const Author = require('../models/Author')
const Book = require('../models/Book')


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
        // return _.find(authors, { authID: parent.id });
        return Author.findById(parent.authorID)
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
        return Book.find({
          authorID: parent.id
        })
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
        // return _.find(books, {
        //   id: args.id,
        // });
        return Book.findById(args.id)
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
        // return _.find(authors, {
        //   id: args.id,
        // });
        return Author.findById(args.id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //  return books;
        return Book.find({})
      },
    },
    authors: {
      type: new GraphQLList(AuthType),
      resolve(parent, args) {
        // return authors;
        return Author.find({})
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve(parent, args) {
        const {
          name,
          age
        } = args
        let author = new Author({
          name,
          age
        })
        return author.save()
      }

    },

    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorID: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        const {
          name,
          genre,
          authorID
        } = args
        let book = new Book({
          name,
          genre,
          authorID
        })
        return book.save()
      }

    }

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});