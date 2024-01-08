import { useMutation } from "@apollo/client"
import {
    SaveDocument,
    SaveMutation,
    SaveMutationVariables,
    GetSavedDocument,
    DeleteBoardDocument,
    DeleteBoardMutation,
    DeleteBoardMutationVariables
} from "@/generated/graphql"
import Star from "./Star"
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

  return (
    <>
    <div className="-z-10 fixed inset-0 overflow-hidden">
        <img src={board.bg} alt="board background" className="object-cover absolute w-screen h-screen inset-0" />
    </div>
    <div className="fixed px-6 backdrop-blur-sm pb-1 pt-3 w-screen shadow -mt-4 bg-black/60">
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <h2 className="text-2xl w-fit p-2 py-1 hover:bg-gray-500/80 rounded-lg font-bold">{board.title}</h2>
                <Star className="mt-1" saved={board.saved} onClick={handleSave} />
            </div>
            <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="px-2 rounded-lg hover:bg-gray-500/80">
                    <MoreHorizontal />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col justify-between h-full pb-6 w-full">
                    <div className="flex flex-col pt-2 gap-4 w-full">
                        <Separator className="bg-gray-500/60" />
                        <div>Change Background</div>
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
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your board remove your data from our servers.
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
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
