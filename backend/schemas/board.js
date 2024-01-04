const Board = require("../models/board")
const List = require("../models/list")
const Card = require("../models/card")
const { GraphQLError } = require('graphql')

const typeDefs = `
    type Card {
        title: String!
        description: String
        id: ID!
    }

    type List {
        title: String!
        cards: [Card!]!
        id: ID!
    }

    type Board {
        title: String!
        description: String
        created_at: String
        updated_at: String
        saved: Boolean
        lists: [List!]!
        bg: String!
        id: ID!
        user: User!
        listsOrder: [List!]!
    }

    extend type Query {
        allBoards: [Board!]!
        findBoard(id: ID!): Board
        saveBoard(id: ID!): Board
    }

    extend type Mutation {
        createBoard(
            title: String!
            description: String
            bg: String!
        ): Board

        updateBoard(
            id: ID!
            title: String
            description: String
            bg: String
            lists: [ID!]
            updated_at: String!
        ): Board

        saveBoard(
            id: ID!
            saved: Boolean!
        ): Board

        deleteBoard(
            id: ID!
        ): Board

        addList(
            boardId: ID!
            title: String!
        ): Board

        updateList(
            id: ID!
            title: String
            cards: [ID!]
        ): List

        moveCardFromToList(
            boardId: ID!
            fromListId: ID!
            toListId: ID!
            fromCards: [ID!]!
            toCards: [ID!]!
            updated_at: String!
        ): Board

        deleteList(
            id: ID!
        ): List

        addCard(
            listId: ID!
            title: String!
            description: String
        ): List

        updateCard(
            id: ID!
            title: String!
            description: String
        ): Card

        deleteCard(
            id: ID!
        ): Card
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

            const board = await Board.findById(args.id).populate({ path: 'lists', populate: { path: 'cards' }})

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
            return updatedBoard.populate({ path: 'lists', populate: { path: 'cards' }})
        },
        moveCardFromToList: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extension: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            
            const board = await Board.findById(args.boardId)
            board.updated_at = args.updated_at
            await board.save()

            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated", {
                    extension: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const fromList = await List.findById(args.fromListId)
            fromList.cards = args.fromCards
            await fromList.save()

            const toList = await List.findById(args.toListId)
            toList.cards = args.toCards
            await toList.save()

            return board.populate({ path: 'lists', populate: { path: 'cards' }})
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
        },
        addList: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const board = await Board.findById(args.boardId)
            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const list = new List({ ...args })
            try {
                await list.save()
            } catch (error) {
                throw new GraphQLError(error.message)
            }

            board.lists = board.lists.concat(list._id)
            board.listsOrder = board.listsOrder.concat(list._id)
            await board.save()

            return board.populate({ path: 'lists', populate: { path: 'cards' }})
        },
        updateList: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                }) 
            }
            const updatedList = await List.findByIdAndUpdate(args.id, { ...args }, { new: true })
            return updatedList.populate('cards')
        },
        deleteList: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const list = await List.findById(args.id)
            await List.findByIdAndRemove(args.id)
            return list
        },
        addCard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const list = await List.findById(args.listId)
            const card = new Card({ ...args })
            try {
                await card.save()
            } catch (error) {
                throw new GraphQLError(error.message)
            }

            list.cards = list.cards.concat(card._id)
            await list.save()

            return list.populate('cards')
        },
        updateCard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const updatedCard = await Card.findByIdAndUpdate(args.id, { ...args }, { new: true })
            return updatedCard
        },
        deleteCard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const card = await Card.findById(args.id)
            await Card.findByIdAndRemove(args.id)
            return card
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}