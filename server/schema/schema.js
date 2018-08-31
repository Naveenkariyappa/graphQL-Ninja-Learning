const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book.js');
const Author = require('../models/author.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// var books = [
//   { name: "Book1", genre: "fantacy", id: "1", authorid: "1" },
//   { name: "Book2", genre: "fantacy", id: "2", authorid: "2" },
//   { name: "Book3", genre: "Sci-Fi", id: "3", authorid: "3" },
//   { name: "Book4", genre: "fantacy", id: "4", authorid: "2" },
//   { name: "Book5", genre: "fantacy", id: "5", authorid: "3" },
//   { name: "Book6", genre: "Sci-Fi", id: "6", authorid: "3" }
// ];

// var authors = [
//     { name: "authors1", age: 25, id: "1" },
//     { name: "authors2", age: 35, id: "2" },
//     { name: "authors3", age: 67, id: "3" }
// ];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author:{
            type: AuthorType,
            resolve(parent,args){
                // return _.find(authors,{
                //     id:parent.authorid
                // })
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        //   return _.filter(books, {
        //     authorid: parent.id
        // });
        return Book.find({authorId: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // Code to get date from the Db
        // return _.find(books, { id: args.id }); //query
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // Code to get date from the Db
        // return _.find(authors, { id: args.id }); //query
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
        type: new GraphQLList(AuthorType),
      resolve(parent, args) {
          // return authors;
          return Author.find({});
      }
    }
  }
});

// Mutations 

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addAuthor:{
      type:AuthorType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent,args){
        let author = new Author({
          name :args.name,
          age:args.age,
        });
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
          authorId: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(parent, args) {
          let book = new Book({
            name: args.name,
            genre: args.genre,
            authorId: args.authorId
          });
          return book.save()
        }
      },
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})