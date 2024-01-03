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
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{data?.findBoard?.title}</h2>
                <div className="grid md:auto-rows grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl">
                    {data?.findBoard?.lists?.map((list) => (
                        <div key={list.id} className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold">{list.title}</h3>
                            <div className="flex flex-col gap-2">
                                {list.cards?.map((card) => (
                                    <div key={card.id} className="flex flex-col gap-2">
                                        <h4 className="text-lg font-bold">{card.title}</h4>
                                        <div>{card.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}
