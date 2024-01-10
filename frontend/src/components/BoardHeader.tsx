import { useState } from "react";
import { useMutation } from "@apollo/client"
import {
    SaveDocument,
    SaveMutation,
    SaveMutationVariables,
    GetSavedDocument,
    DeleteBoardDocument,
    DeleteBoardMutation,
    DeleteBoardMutationVariables,
    UpdateBoardDocument,
    UpdateBoardMutation,
    UpdateBoardMutationVariables
} from "@/generated/graphql"
import Star from "./Star"
import UploadBackground from "./UploadBackground"
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Trash, MoreHorizontal } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
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
import { Separator } from "./ui/separator";
import { Loader2 } from "lucide-react";

export default function BoardHeader({board}:{board:any}) { //eslint-disable-line
    const navigate = useNavigate()
    const form = useForm()
    const [title, setTitle] = useState(board.title)
    const [isEditing, setIsEditing] = useState(false)

    const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument)

    const [save] = useMutation<SaveMutation, SaveMutationVariables>(SaveDocument,{
        update: (cache, response) => {
          cache.updateQuery({ query: GetSavedDocument }, (data) => {
            if (response.data?.saveBoard?.saved) {
              return {
                savedBoards: [response.data.saveBoard, ...data.savedBoards]
              }
            }
            if (!response.data?.saveBoard?.saved) {
              return {
                savedBoards: data.savedBoards.filter((board:any) => board.id !== response.data?.saveBoard?.id) // eslint-disable-line
              }
            }
          return data
        })
      }
    });

    const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, {
        update: (cache, response) => {
          cache.evict({ id: 'Board:' + response.data?.deleteBoard?.id })
          cache.gc()
        }
      })

    const handleSave = async () => {
        await save({
          variables: {
            saveBoardId: board.id,
            saved: !board.saved,
            savedAt: board.saved ? null : new Date().toISOString()
          },
          optimisticResponse: {
            __typename: "Mutation",
            saveBoard: {
              __typename: "Board",
              id: board.id,
              saved: !board.saved,
              saved_at: board.saved ? null : new Date().toISOString(),
              title: board.title,
              bg: board.bg
            }
          }
        })
    }

    const handleDelete = async () => {
        await deleteBoard({
          variables: {
            id: board.id
          }
        })
        navigate('/')
    }

  const handleTitleChange = async () => {
    setIsEditing(false)
    if (title.trim() == '' || title.trim() == board.title) {
      setTitle(board.title)
      setIsEditing(false)
      return
    }
    await updateBoard({
      variables: {
        updateBoardId: board.id,
        title: title.trim(),
        updated_at: new Date().toISOString()
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateBoard: {
          __typename: "Board",
          id: board.id,
          title: title.trim(),
          bg: board.bg,
          lists: board.lists,
          updated_at: new Date().toISOString(),
          description: board.description
        }
      }
    })
  }

  return (
    <>
    <div className="-z-10 fixed top-14 w-screen h-dvh overflow-hidden">
        <img src={board.bg} alt="board background" className="object-cover absolute w-full h-full" />
    </div>
    <div className="fixed px-6 top-14 backdrop-blur-sm py-1 min-w-[100vw] shadow bg-black/60">
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
              {isEditing ?
                  <input
                    autoFocus
                    type="text"
                    className="rounded-lg w-fit bg-black/60 border-2 border-[#22272B] shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white p-2 py-1 text-2xl font-bold"
                    value={title}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleChange}
                    onKeyDown={(e) => {
                      if (e.key == 'Enter' && (title.trim() != '' || title.trim() != board.title)) {
                        handleTitleChange()
                      }
                      if (e.key == 'Escape') {
                        setIsEditing(false)
                        setTitle(board.title)
                      }
                    }}
                    style={{
                      width: `${(title.length + 0.6)}ch`,
                      minWidth: '4ch'
                    }}
                  />
                : <button 
                    className="text-2xl border-2 border-transparent w-fit p-2 py-1 hover:bg-gray-500/80 rounded-lg font-bold"
                    onClick={() => setIsEditing(true)}
                  >
                    {board.title}
                  </button>
              }
                <Star className="mt-1" saved={board.saved} onClick={handleSave} />
            </div>
            <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="px-2 rounded-lg hover:bg-gray-500/80">
                    <MoreHorizontal />
                </Button>
            </SheetTrigger>
            <SheetContent onOpenAutoFocus={(e)=>e.preventDefault()}>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col justify-between h-full pb-6 w-full">
                    <div className="flex flex-col pt-2 gap-4 w-full">
                        <Separator className="bg-gray-500/60" />
                        <UploadBackground board={board} />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="px-2 w-full flex gap-1" variant="destructive">
                                <Trash className="w-4 h-4" /> Delete Board
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription className="pr-2">
                                This action cannot be undone. This will permanently delete your board and remove your data from our servers.
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="gap-1">
                                <DialogClose asChild>
                                    <Button variant="ghost">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                        onClick={form.handleSubmit(handleDelete)}
                                        variant="destructive"
                                        className="flex gap-1"
                                    >
                                        {form.formState.isSubmitting ? <> <Loader2 className="animate-spin w-4 h-4" /> Deleting...</> : 'Delete'}
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </SheetContent>
            </Sheet>
        </div>
    </div>
    </>
  )
}
