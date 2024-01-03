import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client'
import { FindBoardQuery, FindBoardDocument, FindBoardQueryVariables } from "@/generated/graphql"

export default function Board() {
  const { id } = useParams()

  const { data, loading, error } = useQuery<FindBoardQuery, FindBoardQueryVariables>(FindBoardDocument, {
    variables: { id: id as string }
  })

  if (error) return <div>{error.message}</div>

  if (loading) return <div>Loading...</div>

  return (
    <>
        <div className="w-screen -z-10 fixed inset-0 h-screen">
            <img src={data?.findBoard?.bg} alt="board background" className="object-cover absolute inset-0" />
        </div>
        <div className="container flex flex-col">
            Board
        </div>
    </>
  )
}
