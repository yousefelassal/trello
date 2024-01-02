import { getRandomPhoto } from "@/lib/utils"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import {
    CreateBoardDocument,
    CreateBoardMutationVariables,
    CreateBoardMutation,
    AllBoardsDocument
} from "@/generated/graphql"

export default function AddBoard() {
  const [title, setTitle] = useState('')
    const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, {
        update: (cache, response) => {
            cache.updateQuery({ query: AllBoardsDocument }, (data) => {
                if (response.data?.createBoard) {
                    return {
                        allBoards: [...data.allBoards, response.data.createBoard]
                    }
                }
                return data
            })
        }
    })

    const submit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    
        createBoard({ variables: { 
            title, 
            bg: await getRandomPhoto()
        } })
        setTitle('')
    }

  return (
    <div className="flex items-center justify-center">
        <form onSubmit={submit}>
            <input
            className="bg-gray-900"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Add Board"
            />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}
