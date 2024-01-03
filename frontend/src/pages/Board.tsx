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
        <div className="absolute h-screen w-screen overflow-hidden -z-10">
            <img src={data?.findBoard?.bg} alt="board background" className="object-cover" />
        </div>
        <div className="container flex flex-col">
            Board
        </div>
    </>
  )
}
