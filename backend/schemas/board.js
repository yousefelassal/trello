const Board = require("../models/board")
const List = require("../models/list")
const Card = require("../models/card")
const Image = require("../models/image")
const Attachment = require("../models/attachment")
const { GraphQLError } = require('graphql')
const { getOpenGraphImage } = require('../utils/opengraph')

const typeDefs = `
    type Attachment {
        id: ID!
        url: String!
        name: String!
        uploaded_at: String!
        open_graph_image: String
    }

    type Image {
        id: ID!
        url: String!
        key: String!
        name: String!
        uploaded_at: String!
    }

    type Card {
        title: String!
        description: String
        id: ID!
        attachments: [Attachment!]
        images: [Image!]
        cover: String
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
        saved_at: String
        lists: [List!]!
        bg: String!
        uploaded_bgs: [Image!]
        id: ID!
        user: User!
        listsOrder: [List!]!
    }

    extend type Query {
        allBoards: [Board!]!
        findBoard(id: ID!): Board
        findCard(id: ID!): Card
        savedBoards: [Board!]!
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
            uploaded_bgs: [ID!]
            lists: [ID!]
            updated_at: String!
        ): Board

        saveBoard(
            id: ID!
            saved: Boolean!
            saved_at: String
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
            title: String
            description: String
            attachments: [ID!]
            images: [ID!]
            cover: String
        ): Card

        deleteCard(
            id: ID!
        ): Card

        addBgToBoard(
            boardId: ID!
            key: String!
            url: String!
            name: String!
            uploaded_at: String!
        ): Board

        addImageToCard(
            cardId: ID!
            key: String!
            url: String!
            name: String!
            uploaded_at: String!
        ): Card

        addAttachmentToCard(
            cardId: ID!
            url: String!
            name: String!
            uploaded_at: String!
        ): Card

        deleteImage(
            id: ID!
        ): Image

        deleteAttachment(
            id: ID!
        ): Attachment

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
                .populate({
                    path: 'lists',
                        populate: {
                            path: 'cards',
                                populate: {
                                    path: 'attachments',
                                    path: 'images'
                                }
                        }
                })
                .populate('uploaded_bgs');

            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            return board
        },
        findCard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated", {
                    extension: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const card = await Card.findById(args.id)
            .populate('attachments')
            .populate('images');

            return card
        },
        savedBoards: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                return []
            }

            const boards = await Board.find({ user: user._id, saved: true }).sort({ saved_at: -1 })
            return boards
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
                .populate({ path: 'lists', populate: { path: 'cards' }})
                .populate('uploaded_bgs');
            
            return updatedBoard
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

            await Board.findByIdAndDelete(args.id)
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
            await List.findByIdAndDelete(args.id)
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

            return list.populate({ path: 'cards', populate: { path: 'attachments', path: 'images' }})
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
                .populate('attachments')
                .populate('images');
            
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
            await Card.findByIdAndDelete(args.id)
            return card
        },
        addBgToBoard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated")
            }
            const board = await Board.findById(args.boardId)
            if(board.user.toString() !== user._id.toString()) {
                throw new GraphQLError("Not authenticated")
            }
            const image = new Image({ ...args })
            try {
                await image.save()
            } catch (error) {
                throw new GraphQLError(error.message)
            }

            board.uploaded_bgs = board.uploaded_bgs.concat(image._id)
            board.bg = image.url
            await board.save()

            return board.populate('uploaded_bgs')
        },
        addImageToCard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated")
            }
            const card = await Card.findById(args.cardId)
            const image = new Image({ ...args })
            try {
                await image.save()
            } catch (error) {
                throw new GraphQLError(error.message)
            }

            card.images = card.images.concat(image._id)
            card.cover = image.url
            await card.save()

            return card.populate('images')
        },
        addAttachmentToCard: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated")
            }

            const card = await Card.findById(args.cardId)
            const attachment = new Attachment({ ...args })
            try {
                await attachment.save()
            } catch (error) {
                throw new GraphQLError(error.message)
            }

            card.attachments = card.attachments.concat(attachment._id)

            const openGraphImage = await getOpenGraphImage(attachment.url)
            if(openGraphImage) {
                attachment.open_graph_image = openGraphImage
                await attachment.save()
                card.cover = openGraphImage
            }

            await card.save()

            return card.populate('attachments')
        },
        deleteImage: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated")
            }
            const image = await Image.findById(args.id)
            await Image.findByIdAndDelete(args.id)
            return image
        },
        deleteAttachment: async (root, args, context) => {
            const user = context.currentUser
            if(!user) {
                throw new GraphQLError("Not authenticated")
            }
            const attachment = await Attachment.findById(args.id)
            await Attachment.findByIdAndDelete(args.id)
            return attachment
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}