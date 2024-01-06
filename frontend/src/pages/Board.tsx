import { useParams } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client'
import {
    FindBoardQuery,
    FindBoardDocument,
    FindBoardQueryVariables,
    AddListDocument,
    AddListMutation,
    AddListMutationVariables,
    AddCardDocument,
    AddCardMutation,
    AddCardMutationVariables,
    UpdateBoardDocument,
    UpdateBoardMutation,
    UpdateBoardMutationVariables,
    UpdateListDocument,
    UpdateListMutation,
    UpdateListMutationVariables,
    MoveCardsDocument,
    MoveCardsMutation,
    MoveCardsMutationVariables
} from "@/generated/graphql"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Board() {
  const { id } = useParams()

  const { data, loading, error } = useQuery<FindBoardQuery, FindBoardQueryVariables>(FindBoardDocument, {
    variables: { id: id as string }
  })

  const [addList] = useMutation<AddListMutation, AddListMutationVariables>(AddListDocument,{
    optimisticResponse: {
        __typename: "Mutation",
        addList: {
            __typename: "Board",
            id: id as string,
            title: data?.findBoard?.title as string,
            bg: data?.findBoard?.bg as string,
            description: data?.findBoard?.description as string,
            lists: [
                ...data?.findBoard?.lists as any[] || [], //eslint-disable-line
                {
                    __typename: "List",
                    id: `temp-${Date.now()}`,
                    title: "New List",
                    cards: []
                }
            ]
        }
    }
  })

  const [addCard] = useMutation<AddCardMutation, AddCardMutationVariables>(AddCardDocument)

  const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument)

  const [updateList] = useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument)

  const [moveCards] = useMutation<MoveCardsMutation, MoveCardsMutationVariables>(MoveCardsDocument)

  if (error) return <div>{error.message}</div>

  if (loading) return <div>Loading...</div>

  const addNewList = async () => {
    addList({
        variables: {
            boardId: id as string,
            title: `New List`
        }
    })
  }

  const addNewCard = async (list:any) => { //eslint-disable-line
    addCard({
        variables: {
            listId: list.id,
            title: '7aga gdeeda'
        },
        optimisticResponse: {
            __typename: "Mutation",
            addCard: {
                __typename: "List",
                id: list.id,
                title: list.title,
                cards: [
                    ...list.cards as any[], //eslint-disable-line
                    {
                        __typename: "Card",
                        id: `temp-${Date.now()}`,
                        title: '7aga gdeeda',
                        description: ""
                    }
                ]
            }
        }
    })
  }

  const onDragEnd = async (result:any) => { //eslint-disable-line
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Moving columns
    if (type === 'column') {
      const newColumnOrder = Array.from(data?.findBoard?.lists?.map((list) => list.id) as string[] || []) //eslint-disable-line
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      await updateBoard({
        variables: {
            updateBoardId: id as string,
            updated_at: new Date().toISOString(),
            title: data?.findBoard?.title as string,
            bg: data?.findBoard?.bg as string,
            description: data?.findBoard?.description as string,
            lists: newColumnOrder
        },
        optimisticResponse: {
            __typename: "Mutation",
            updateBoard: {
                __typename: "Board",
                id: id as string,
                title: data?.findBoard?.title as string,
                bg: data?.findBoard?.bg as string,
                updated_at: new Date().toISOString(),
                description: data?.findBoard?.description as string,
                lists: newColumnOrder.map((listId) => {
                    return data?.findBoard?.lists?.find((list) => list.id === listId) as any //eslint-disable-line
                })
            }
        }
      })
      return;
    }

    const start = data?.findBoard?.lists?.find((list) => list.id === source.droppableId) as any //eslint-disable-line
    const finish = data?.findBoard?.lists?.find((list) => list.id === destination.droppableId) as any //eslint-disable-line

    if(start === finish) {
      const newTaskIds = Array.from(start.cards?.map((card:any) => card.id) as string[] || []) //eslint-disable-line
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      await updateList({
        variables: {
            id: start.id,
            title: start.title,
            cards: newTaskIds
        },
        optimisticResponse: {
            __typename: "Mutation",
            updateList: {
                __typename: "List",
                id: start.id,
                title: start.title,
                cards: newTaskIds.map((cardId) => {
                    return start.cards?.find((card:any) => card.id === cardId) as any //eslint-disable-line
                })
            }
        }
      })
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.cards?.map((card:any) => card.id) as string[] || []) //eslint-disable-line
    startTaskIds.splice(source.index, 1);
    const finishTaskIds = Array.from(finish.cards?.map((card:any) => card.id) as string[] || []) //eslint-disable-line
    finishTaskIds.splice(destination.index, 0, draggableId);

    const startAndFinish = [...start.cards as any[], ...finish.cards as any[]] //eslint-disable-line

    const newStart = {
        __typename: "List",
        id: start.id,
        title: start.title,
        cards: startTaskIds.map((cardId) => {
            return startAndFinish.find((card) => card.id === cardId) as any //eslint-disable-line
        })
    }

    console.log(newStart)


    const newFinish = {
        __typename: "List",
        id: finish.id,
        title: finish.title,
        cards: finishTaskIds.map((cardId) => {
            return startAndFinish.find((card) => card.id === cardId) as any //eslint-disable-line
        })
    }

    console.log(newFinish)

    const newList = data?.findBoard?.lists?.map((list) => {
        if(list.id === newStart.id) {
            return newStart
        }
        if(list.id === newFinish.id) {
            return newFinish
        }
        return list
    }) as any[] //eslint-disable-line
    

    await moveCards({
        variables: {
            boardId: id as string,
            fromListId: start.id,
            toListId: finish.id,
            fromCards: startTaskIds,
            toCards: finishTaskIds,
            updatedAt: new Date().toISOString()
        },
        optimisticResponse: {
            __typename: "Mutation",
            moveCardFromToList: {
                __typename: "Board",
                id: id as string,
                title: data?.findBoard?.title as string,
                bg: data?.findBoard?.bg as string,
                updated_at: new Date().toISOString(),
                description: data?.findBoard?.description as string,
                lists: newList.map((list) => {
                    return {
                        __typename: "List",
                        id: list.id,
                        title: list.title,
                        cards: list.cards?.map((card:any) => { //eslint-disable-line
                            return {
                                __typename: "Card",
                                id: card.id,
                                title: card.title,
                                description: card.description
                            }
                        })
                    }
                })
            }
        }
    })
    }


  return (
    <>
        <div className="-z-10 fixed inset-0 overflow-hidden">
            <img src={data?.findBoard?.bg} alt="board background" className="object-cover absolute w-screen h-screen inset-0" />
        </div>
        <div className="fixed px-6 backdrop-blur-sm py-2 w-screen shadow -mt-4 bg-black/60">
            <div className="flex items-center gap-2">
                <h2 className="text-2xl w-fit p-2 py-1 hover:bg-gray-700 rounded-lg font-bold">{data?.findBoard?.title}</h2>
                [Star]
            </div>
        </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided:any) => ( //eslint-disable-line
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="container pt-16 flex gap-2">
            {data?.findBoard?.lists?.map((list, index) => (
                <Draggable draggableId={list.id} index={index} key={list.id}>
                {(provided:any) => ( //eslint-disable-line
                <div 
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  className="flex p-2 flex-col min-w-[272px] h-fit rounded-2xl shadow-2xl border border-[#201f1f] bg-[#101204] gap-2"
                >
                    <h3
                        className="text-xl w-full font-bold"
                        {...provided.dragHandleProps}
                    >
                        {list.title}
                    </h3>
                    <Droppable droppableId={list.id} type="task">
                    {(provided:any, snapshot:any) => ( //eslint-disable-line
                    <div 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col rounded-lg gap-2 transition ${snapshot.isDraggingOver ? 'bg-[#595956]' : ''}`}
                    >
                        {list.cards?.map((card, index) => (
                            <Draggable draggableId={card.id} index={index} key={card.id}>
                            {(provided:any, snapshot:any) => ( //eslint-disable-line
                                <div 
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`${snapshot.isDragging ? 'bg-[#353f48] border-blue-500' : 'bg-[#22272B]' }
                                  flex rounded-lg border-2 border-[#22272B] hover:border-blue-500 justify-center px-2 py-1 shadow-2xl flex-col`}
                                >
                                <h4 className="text-lg font-bold">{card.title}</h4>
                                <div>{card.description}</div>
                            </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                        )}
                        </Droppable>
                        <button
                            onClick={() => addNewCard(list)}
                            className="bg-[#ffffff3d] hover:bg-[#ffffff2a] transition rounded-lg h-fit p-2 flex items-center shadow-lg"
                        >
                            {list.cards?.length === 0 ? "Add a card" : "Add another card"}
                        </button>
                </div>
                )}
                </Draggable>
            ))}
            {provided.placeholder}
            <button
            onClick={addNewList}
            className="bg-[#ffffff3d] hover:bg-[#ffffff2a] transition rounded-lg min-w-[272px] h-fit p-2 flex items-center shadow-lg"
            >
                {data?.findBoard?.lists?.length === 0 ? "Add your first list" : "Add another list"}
            </button>
            </div>
        )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
