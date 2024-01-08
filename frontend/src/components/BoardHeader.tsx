import { useMutation } from "@apollo/client"
import {
    SaveDocument,
    SaveMutation,
    SaveMutationVariables,
    GetSavedDocument,
} from "@/generated/graphql"
import Star from "./Star"

export default function BoardHeader({board}:{board:any}) { //eslint-disable-line
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
  return (
    <>
    <div className="-z-10 fixed inset-0 overflow-hidden">
        <img src={board.bg} alt="board background" className="object-cover absolute w-screen h-screen inset-0" />
    </div>
    <div className="fixed px-6 backdrop-blur-sm py-2 w-screen shadow -mt-4 bg-black/60">
        <div className="flex items-center gap-2">
            <h2 className="text-2xl w-fit p-2 py-1 hover:bg-gray-700 rounded-lg font-bold">{board.title}</h2>
                <Star className="mt-1" saved={board.saved} onClick={handleSave} />
        </div>
    </div>
    </>
  )
}
