import { cn } from "@/lib/utils";
import { useState } from "react"
import { useMutation } from "@apollo/client"
import {
    CreateBoardDocument,
    CreateBoardMutationVariables,
    CreateBoardMutation,
    AllBoardsDocument
} from "@/generated/graphql"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useRandomPhotos from "@/hooks/useRandomPhotos";
import { Plus, Loader2 } from "lucide-react"
import Placeholder from "./Placeholder";

export default function AddBoard({ header, className }:{ header?:boolean, className?:string }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  const { photos, isLoading, selectedBg, handleBgChange } = useRandomPhotos()
  const form = useForm()

    const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, {
        onCompleted(data) {
            if (data.createBoard) {
                navigate(`/${data.createBoard.id}`)
            }
            setOpen(false)
        },
        update: (cache, response) => {
            cache.updateQuery({ query: AllBoardsDocument }, (data) => {
                if (response.data?.createBoard) {
                    return {
                        allBoards: [response.data.createBoard, ...data.allBoards]
                    }
                }
                return data
            })
        }
    })

    const submit = async () => {
        await createBoard({ variables: { 
            title, 
            bg: selectedBg
        } })
        setTitle('')
    }

  return (
    <div className="flex items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={cn('', className)}>
                    {header ? 
                        <Plus />
                        : <><Plus /> <span>Create new board</span></>
                    }
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle className="items-center flex justify-center">Add a Board</DialogTitle>
                </DialogHeader>
                <div className="flex w-full flex-col items-center gap-4 py-4">
                {isLoading && (
                    <div className="w-full flex-1 flex items-center flex-col gap-4">
                        <div className="relative rounded-lg h-36 w-48 overflow-hidden animate-pulse">
                            <div className="bg-gray-200 animate-pulse w-full h-full" />
                        </div>
                        <div className="flex gap-2">
                            <div className="animate-pulse flex-1 flex items-center justify-center rounded-md h-12 w-16 overflow-hidden">
                                <div className="bg-gray-200 animate-pulse w-full h-full" />
                            </div>
                            <div className="animate-pulse flex-1 flex items-center justify-center rounded-md h-12 w-16 overflow-hidden">
                                <div className="bg-gray-200 animate-pulse w-full h-full" />
                            </div>
                            <div className="animate-pulse flex-1 flex items-center justify-center rounded-md h-12 w-16 overflow-hidden">
                                <div className="bg-gray-200 animate-pulse w-full h-full" />
                            </div>
                            <div className="animate-pulse flex-1 flex items-center justify-center rounded-md h-12 w-16 overflow-hidden">
                                <div className="bg-gray-200 animate-pulse w-full h-full" />
                            </div>
                        </div>
                    </div>
                )}
                { !isLoading && (
                    <div className="w-full flex-1 flex items-center flex-col gap-4">
                        <div className="relative rounded-lg h-36 w-48 overflow-hidden">
                            <img src={selectedBg} alt="" className="object-cover absolute w-full h-full shadow-md" />
                            <Placeholder />
                        </div>
                        <div className="flex gap-2">
                            {photos.map((bg:any, i:any) => (//eslint-disable-line
                                <button
                                    key={i}
                                    className={cn('relative rounded-md h-12 w-16 overflow-hidden', selectedBg === bg ? 'border-2 border-blue-500' : '')}
                                    onClick={() => handleBgChange(bg)}
                                >
                                    {selectedBg === bg && (
                                        <div className="absolute z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
                                    )}
                                    <img src={bg} alt="" className="object-cover absolute inset-0 w-full h-full shadow-md" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-4 w-full items-center gap-4">
                    <Label htmlFor="title" className="">
                        Title
                    </Label>
                    <Input
                        autoFocus
                        id="title"
                        className="col-span-full text-white focus:outline-2 outline-blue-500 shadow-md transition"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            onClick={form.handleSubmit(submit)}
                            className="flex gap-1"
                        >
                            {form.formState.isSubmitting ? <> <Loader2 className="animate-spin" /> Adding...</> : 'Add'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
