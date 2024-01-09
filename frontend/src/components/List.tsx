import { useState } from "react"
import { useMutation } from "@apollo/client";
import {
    DeleteListDocument,
    DeleteListMutation,
    DeleteListMutationVariables,
} from "@/generated/graphql";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"  
import { X, MoreHorizontal } from "lucide-react"

export default function List({list, index, addNewCard}: {list: any, index: number, addNewCard: (list:any, title:string) => void}) { //eslint-disable-line
  const [title, setTitle] = useState('')
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cancelClicked, setCancelClicked] = useState(false)

  const [deleteList] = useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, {
    update: (cache) => {
        cache.evict({ id: `List:${list.id}` })
        cache.gc()
    }
  })

  const handleDelete = async () => {
    await deleteList({
        variables: {
            id: list.id
        }
    })
  }

  return (
    <Draggable draggableId={list.id} index={index} key={list.id}>
        {(provided:any) => ( //eslint-disable-line
        <div 
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="flex p-2 flex-col min-w-[272px] h-fit rounded-2xl shadow-2xl border border-[#201f1f] bg-[#101204] gap-2"
        >   
            <div className="flex justify-between items-center">
                <h3
                    className="text-xl w-full flex-1 font-bold"
                    {...provided.dragHandleProps}
                    >
                    {list.title}
                </h3>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="py-0 px-[10px] rounded-lg hover:bg-gray-500/80">
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                        <div className="flex flex-col gap-2">
                            <Button variant="ghost" className="hover:bg-gray-500/80" onClick={handleDelete}>Delete List</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <Droppable droppableId={list.id} type="task">
            {(provided:any, snapshot:any) => ( //eslint-disable-line
            <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex flex-col min-h-[2px] rounded-lg gap-2 transition ${snapshot.isDraggingOver ? 'bg-[#595956]' : ''}`}
            >
                {list.cards?.map((card:any, index:any) => ( //eslint-disable-line
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
                {isAddingCard ?
                <div className="flex flex-col gap-2">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Enter a title for this card..."
                        className="rounded-lg border-2 border-[#22272B] p-2 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={()=>setCancelClicked(false)}
                        onKeyDown={(e)=>{
                            if(e.key === 'Enter') {
                                setIsAddingCard(false)
                                if(title.trim() != '') {
                                    addNewCard(list, title)
                                    setTitle('')
                                }
                            }
                            if(e.key === 'Escape') {
                                setIsAddingCard(false)
                                setTitle('')
                            }
                        }}
                        onBlur={()=>{
                            if(!cancelClicked) {
                                setIsAddingCard(false)
                                if(title.trim() != '') {
                                    addNewCard(list, title)
                                    setTitle('')
                                }
                            }
                            setCancelClicked(false)
                        }}
                    />
                    <div className="flex gap-1">
                        <Button onClick={()=>{
                            setIsAddingCard(false)
                            if(title.trim() != '') {
                                addNewCard(list, title)
                                setTitle('')
                            }
                        }}>Add Card</Button>
                        <Button
                            className="hover:bg-gray-500/80 px-2"
                            onMouseDown={(e)=>{
                                e.preventDefault()
                                setCancelClicked(true)
                                setIsAddingCard(false)
                                setTitle('')
                            }} 
                            variant="ghost"
                        >
                            <X />
                        </Button>
                    </div>
                </div>
                :
                <button
                    onClick={() => setIsAddingCard(true)}
                    className="bg-[#ffffff3d] hover:bg-[#ffffff2a] transition rounded-lg h-fit p-2 flex items-center shadow-lg"
                >
                    {list.cards?.length === 0 ? "Add a card" : "Add another card"}
                </button>
                }
        </div>
        )}
    </Draggable>
  )
}
