import { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { X, ExternalLink } from "lucide-react";

export default function ImageCard({attachment, data, handleSetCover, handleRemoveCover, handleDeleteAttachment}:any) {//eslint-disable-line
  const [deleteAttachmentPopover, setDeleteAttachmentPopover] = useState(false);

  return (
    <a
        href={attachment?.url}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg hover:text-white ml-8 mr-4 flex flex-col justify-center sm:flex-row items-center hover:bg-gray-500/80 transition"
    >
        {attachment?.open_graph_image &&
        <div className="relative h-24 w-full sm:h-20 sm:w-32 overflow-hidden rounded-md bg-black/60">
            <img
                src={attachment?.open_graph_image}
                alt={attachment?.name}
                className="object-contain absolute inset-0 w-full h-full"
            />
        </div>
        }
        <div className="flex-1 p-2 flex flex-col justify-start items-start">
            <div className="flex items-center gap-2">
                <span className="font-semibold">{attachment?.name}</span>
                <ExternalLink className="h-4 w-4" />
            </div>
            <span className="text-xs">Added at {new Date(parseInt(attachment?.uploaded_at)).toLocaleString()}</span>
            <div className="flex gap-3">
            {attachment?.open_graph_image === data?.findCard?.cover && 
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleRemoveCover()
                    }}
                    className="transition hover:underline-offset-4 text-xs justify-self-end underline hover:text-blue-400"
                    >
                    Remove cover
                </button>
            }
            {attachment?.open_graph_image && attachment?.open_graph_image !== data?.findCard?.cover &&
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleSetCover(attachment?.open_graph_image as string)
                    }}
                    className="transition hover:underline-offset-4 text-xs underline hover:text-blue-400"
                    >
                    Set as cover
                </button>
            }
            <Popover open={deleteAttachmentPopover} onOpenChange={setDeleteAttachmentPopover}>
            <PopoverTrigger asChild>
            <button
                className="transition hover:underline-offset-4 text-xs underline hover:text-red-500"
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDeleteAttachmentPopover(!deleteAttachmentPopover)
                }}
                >
                Delete
            </button>
            </PopoverTrigger>
            <PopoverContent className="flex relative item-center gap-2 flex-col w-60 p-3">
                <Button
                    variant="ghost"
                    onClick={(e) => {
                        e.preventDefault();
                        setDeleteAttachmentPopover(false)
                    }}
                    className="absolute px-2 py-0 rounded-xl right-1 top-1"
                >
                    <X className="h-5 w-5" />
                </Button>
                <span className="font-semibold">Delete attachment?</span>
                <span className="text-sm">Deleting an attachment is permanent. There is no undo.</span>
                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        className="rounded-lg py-0 flex w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeleteAttachment(attachment?.id as string)
                            if(attachment?.open_graph_image === data?.findCard?.cover) {
                                handleRemoveCover()
                            }
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </PopoverContent>
            </Popover>
            </div>
        </div>
    </a>
  )
}
