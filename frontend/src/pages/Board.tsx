import { useState } from "react";
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
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDocumentTitle } from '@uidotdev/usehooks'
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import List from "@/components/List";
import BoardHeader from "@/components/BoardHeader";
import { X } from "lucide-react"

export default function Board() {
  const { id } = useParams()
  const [title, setTitle] = useState('Trello 3al daya2')
  const [listTitle, setListTitle] = useState('')
  const [isAddingList, setIsAddingList] = useState(false)
  const [cancelClicked, setCancelClicked] = useState(false)

  const { data, loading, error } = useQuery<FindBoardQuery, FindBoardQueryVariables>(FindBoardDocument, {
    variables: { id: id as string },
    onCompleted(data) {
      setTitle(`${data.findBoard?.title as string} | Trello 3al daya2`)
    }
  })

  useDocumentTitle(title)

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
                    title: listTitle,
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

  if (loading) return <Loading className="min-h-[70vh]" />

  const addNewList = async () => {
    addList({
        variables: {
            boardId: id as string,
            title: listTitle
        }
    })
    setIsAddingList(false)
    setListTitle('')
  }

  const addNewCard = async (list:any, title:string) => { //eslint-disable-line
    addCard({
        variables: {
            listId: list.id,
            title: title
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
                        title: title,
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

    const newFinish = {
        __typename: "List",
        id: finish.id,
        title: finish.title,
        cards: finishTaskIds.map((cardId) => {
            return startAndFinish.find((card) => card.id === cardId) as any //eslint-disable-line
        })
    }

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
    <BoardHeader board={data?.findBoard} />
    <div className="w-screen mt-[108px] sm:container px-4 h-[calc(100dvh-108px)] overflow-auto py-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided:any) => ( //eslint-disable-line
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-2">
            {data?.findBoard?.lists?.map((list, index) => (
                <List list={list} index={index} addNewCard={addNewCard} key={list.id} />
            ))}
            {provided.placeholder}
            {isAddingList ? 
            <div className="flex flex-col gap-2">
              <input
                autoFocus
                type="text"
                placeholder="Enter list title..."
                className="rounded-lg p-2 bg-white transition min-w-[272px] text-black shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={listTitle}
                onChange={(e)=>setListTitle(e.target.value)}
                onFocus={()=>setCancelClicked(false)}
                onKeyDown={(e)=>{
                  if(e.key === 'Enter') {
                    if(listTitle.trim() !== '') {
                      addNewList()
                    }
                    setListTitle('')
                  }
                  if(e.key === 'Escape') {
                    setIsAddingList(false)
                    setListTitle('')
                  }
                }}
                onBlur={()=>{
                  if(!cancelClicked) {
                    setIsAddingList(false)
                    if(listTitle.trim() !== '') {
                      addNewList()
                    }
                    setListTitle('')
                  }
                  setCancelClicked(false)
                }}
                />
              <div className="flex gap-1">
                <Button onClick={()=>{
                  if(listTitle.trim() !== '') {
                    addNewList()
                  }
                  setListTitle('')
                }}>Add</Button>
                <Button
                  className="hover:bg-gray-500/80 px-2"
                  variant="ghost"
                  onMouseDown={(e)=>{
                    e.preventDefault()
                    setCancelClicked(true)
                    setIsAddingList(false)
                    setListTitle('')
                  }}
                >
                  <X />
                </Button>
              </div>
            </div>
            :
            <button
            onClick={()=>setIsAddingList(true)}
            className="bg-[#ffffff3d] hover:bg-[#ffffff2a] transition rounded-lg min-w-[272px] h-fit p-2 flex items-center shadow-lg"
            >
                {data?.findBoard?.lists?.length === 0 ? "Add your first list" : "Add another list"}
            </button>
            }
            </div>
        )}
        </Droppable>
      </DragDropContext>
    </div>
    </>
  )
}
