const Board = require("../models/board")
const { GraphQLError } = require('graphql')

const typeDefs = `
    type Board {
        title: String!
        content: String
        created_at: String
        updated_at: String
        saved: Boolean
        bg: String!
        id: ID!
        user: User!
    }

    extend type Query {
        allBoards: [Board!]!
        findBoard(id: ID!): Board
        saveBoard(id: ID!): Board
    }

    extend type Mutation {
        createBoard(
            title: String!
            content: String
            bg: String
        ): Board

        updateBoard(
            id: ID!
            title: String!
            content: String
            bg: String
        ): Board

        saveBoard(
            id: ID!
            saved: Boolean!
        ): Board

        deleteBoard(
            id: ID!
        ): Board
    }
`

const resolvers = {
    Query: {
        allBoards: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const boards = await Board.find({ user: user._id }).sort({ updated_at: -1 })
            return boards
        },
        findBoard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const board = await Board.findById(args.id)
            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            return board
        }
    },
    Mutation: {
        createBoard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const board = new Board({ ...args, user: user._id })
            try {
                await board.save()
            } catch (error) {
                throw new GraphQLError(error.message)
            }

            user.boards = user.boards.concat(board._id)
            await user.save()

            return board
        },
        updateBoard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const board = await Board.findById(args.id)
            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const updatedBoard = await Board.findByIdAndUpdate(args.id, { ...args }, { new: true })
            return updatedBoard
        },
        saveBoard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const board = await Board.findById(args.id)
            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const updatedBoard = await Board.findByIdAndUpdate(args.id, { saved: args.saved }, { new: true })
            return updatedBoard
        },
        deleteBoard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const board = await Board.findById(args.id)
            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            await Board.findByIdAndRemove(args.id)
            return board
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}