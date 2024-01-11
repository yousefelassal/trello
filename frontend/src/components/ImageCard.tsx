import { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { X, ExternalLink } from "lucide-react";

export default function ImageCard({image, data, handleSetCover, handleRemoveCover, handleDeleteImage}:any) {//eslint-disable-line
  const [deleteImagePopover, setDeleteImagePopover] = useState(false);

  return (
    <a
        href={image?.url}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg hover:text-white ml-8 mr-4 flex flex-col sm:flex-row items-center hover:bg-gray-500/80 transition"
    >
        <div className="relative h-20 w-32 overflow-hidden rounded-md bg-black/60">
            <img
                src={image?.url}
                alt={image?.name}
                className="object-contain absolute inset-0 w-full h-full"
            />
        </div>
        <div className="flex-1 p-2 flex flex-col items-start">
            <div className="flex items-center gap-2">
                <span className="font-semibold">{image?.name}</span>
                <ExternalLink className="h-4 w-4" />
            </div>
            <span className="text-xs">Added at {new Date(parseInt(image?.uploaded_at)).toLocaleString()}</span>
            <div className="flex gap-3">
            {image?.url === data?.findCard?.cover 
                ? <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleRemoveCover()
                    }}
                    className="transition hover:underline-offset-4 text-xs justify-self-end underline hover:text-blue-400"
                    >
                    Remove cover
                    </button>
                : <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleSetCover(image?.url as string)
                    }}
                    className="transition hover:underline-offset-4 text-xs underline hover:text-blue-400"
                    >
                    Set as cover
                    </button>
            }
            <Popover open={deleteImagePopover} onOpenChange={setDeleteImagePopover}>
            <PopoverTrigger asChild>
            <button
                className="transition hover:underline-offset-4 text-xs underline hover:text-red-500"
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDeleteImagePopover(!deleteImagePopover)
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
                        setDeleteImagePopover(false)
                    }}
                    className="absolute px-2 py-0 rounded-xl right-1 top-1"
                >
                    <X className="h-5 w-5" />
                </Button>
                <span className="font-semibold">Delete image?</span>
                <span className="text-sm">Deleting an image is permanent. There is no undo.</span>
                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        className="rounded-lg py-0 flex w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeleteImage(image?.key as string, image?.id as string)
                            if(image?.url === data?.findCard?.cover) {
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
