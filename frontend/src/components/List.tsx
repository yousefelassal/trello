import { useState } from "react"
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "./ui/button";
import { X } from "lucide-react"

export default function List({list, index, addNewCard}: {list: any, index: number, addNewCard: (list:any, title:string) => void}) { //eslint-disable-line
  const [title, setTitle] = useState('')
  const [isAddingCard, setIsAddingCard] = useState(false)
  return (
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
                        onBlur={()=>{
                            setIsAddingCard(false)
                            if(title.trim() != '') {
                                addNewCard(list, title)
                                setTitle('')
                            }
                        }}
                    />
                    <div className="flex gap-2">
                        <Button onClick={()=>{
                            setIsAddingCard(false)
                            if(title.trim() != '') {
                                addNewCard(list, title)
                                setTitle('')
                            }
                        }}>Add Card</Button>
                        <Button className="hover:bg-gray-500/80 px-2" onClick={()=>{
                            setIsAddingCard(false)
                            setTitle('')
                        }} variant="ghost">
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
