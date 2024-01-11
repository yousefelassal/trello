import { useState } from "react"
import { useMutation } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    DeleteListDocument,
    DeleteListMutation,
    DeleteListMutationVariables,
    UpdateListDocument,
    UpdateListMutation,
    UpdateListMutationVariables
} from "@/generated/graphql";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"  
import { X, MoreHorizontal, Loader2, Trash, Pen } from "lucide-react"
import { Separator } from "./ui/separator";
import { IconBoxMultiple, IconAlignJustified, IconPaperclip, IconPhoto } from "@tabler/icons-react"

export default function List({list, index, addNewCard}: {list: any, index: number, addNewCard: (list:any, title:string) => void}) { //eslint-disable-line
  const [title, setTitle] = useState('')
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cancelClicked, setCancelClicked] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [listTitle, setListTitle] = useState(list.title)
  const form = useForm()
  const location = useLocation()

  const [deleteList] = useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, {
    update: (cache) => {
        cache.evict({ id: `List:${list.id}` })
        cache.gc()
    }
  })

  const [updateList] = useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument)

  const handleDelete = async () => {
    await deleteList({
        variables: {
            id: list.id
        }
    })
  }

  const handleUpdate = async () => {
    await updateList({
        variables: {
            id: list.id,
            title: listTitle
        },
        optimisticResponse: {
            __typename: "Mutation",
            updateList: {
                __typename: "List",
                id: list.id,
                title: listTitle,
                cards: list.cards
            }
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
            <div 
                {...provided.dragHandleProps}
                className="flex justify-between items-center"
            >
                {isEditing ?
                <input
                    autoFocus
                    type="text"
                    className="rounded-lg border-2 border-[#22272B] p-2 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter') {
                            setIsEditing(false)
                            if(listTitle.trim() != '' || listTitle != list.title) {
                                handleUpdate()
                            }
                        }
                        if(e.key === 'Escape') {
                            setIsEditing(false)
                            setListTitle(list.title)
                        }
                    }}
                    onBlur={()=>{
                        setIsEditing(false)
                        if(listTitle.trim() != '' || listTitle != list.title) {    
                            handleUpdate()
                        }
                    }}
                />
                : <h3
                    className="text-xl w-full flex-1 font-bold"
                    >
                    {list.title}
                </h3>
                }
                <Popover>
                    <PopoverTrigger asChild>
                        <Button title="Open list actions" variant="ghost" className="py-0 px-[10px] rounded-lg hover:bg-gray-500/80">
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        onOpenAutoFocus={(e)=>{
                            e.preventDefault()
                        }}
                        className="w-60 p-2"
                    >
                        <div className="flex flex-col gap-2">
                            <h2 className="place-self-center">List actions</h2>
                            <Separator />
                            <Button
                                variant="ghost"
                                className="justify-start gap-1"
                                onClick={()=>setIsEditing(true)}
                            >
                                <Pen className="h-[16px] w-[16px]" />
                                Update Title
                            </Button>
                            <Popover open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="hover:bg-gray-500/80 gap-1 items-center hover:text-red-500 justify-start"
                                    >
                                        <Trash className="h-[16px] w-[16px]" /> Delete List
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-60 p-3">
                                    <div className="flex items-center flex-col gap-3">
                                        <h3 className="text-lg font-semibold">Are you sure?</h3>
                                        <p className="text-sm text-gray-200">This action cannot be undone.</p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                onClick={()=>setIsDeleteOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={()=>{
                                                    setIsDeleteOpen(false)
                                                    form.handleSubmit(handleDelete)()
                                                }}
                                                className="gap-1 items-center justify-center"
                                                disabled={form.formState.isSubmitting}
                                            >
                                                {form.formState.isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Deleting...</> : "Delete"}
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
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
                            flex rounded-lg border-2 border-[#22272B] hover:border-blue-500 justify-center pr-[2px] pl-2 py-[2px] shadow-2xl flex-col`}
                        >
                        {card.cover && 
                            <div className="flex-1 relative rounded-lg h-[100px] w-full">
                                <img
                                    src={card.cover}
                                    className="absolute inset-0 object-cover "
                                />
                            </div>
                        }
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-bold">{card.title}</h4>
                            <div className="flex gap-1">
                                <Link
                                    to={`/${location.pathname.split('/')[1]}/${card.id}`}
                                    state={{ previousLocation: location }}
                                >
                                    <Button title="Open card dialog" variant="ghost" className="py-0 px-[10px] rounded-lg hover:bg-gray-500/80">
                                        <IconBoxMultiple className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {card.description || card.images || card.attachments &&
                            <div className="flex gap-2">
                                {card.description && <IconAlignJustified />}
                                {card.images && <IconPhoto />}
                                {card.attachments && <IconPaperclip />}
                            </div>
                        }
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
