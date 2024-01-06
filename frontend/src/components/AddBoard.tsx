import { getRandomPhoto } from "@/lib/utils"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Plus, Loader2 } from "lucide-react"

export default function AddBoard({ header, className }:{ header?:boolean, className?:string }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false)
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
        createBoard({ variables: { 
            title, 
            bg: await getRandomPhoto()
        } })
        setTitle('')
        setDescription('')
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
                <DialogTitle>Add a Board</DialogTitle>
                <DialogDescription>
                    Add a new board to your dashboard
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="sm:text-right">
                        Title
                    </Label>
                    <Input
                        id="title"
                        className="col-span-full sm:col-span-3"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="sm:text-right">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        className="col-span-full sm:col-span-3"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
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
