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
        <div className="-z-10 fixed inset-0 overflow-hidden">
            <img src={data?.findBoard?.bg} alt="board background" className="object-cover absolute w-screen h-screen inset-0" />
        </div>
        <div className="fixed px-6 py-2 w-screen shadow -mt-4 bg-black/60">
            <h2 className="text-2xl w-fit p-2 py-1 hover:bg-gray-700 rounded-lg font-bold">{data?.findBoard?.title}</h2>
        </div>
        <div className="container pt-16 flex gap-2">
            {data?.findBoard?.lists?.map((list) => (
                <div key={list.id} className="flex p-2 flex-col min-w-[272px] rounded-2xl shadow-2xl border border-[#201f1f] bg-[#101204] gap-2">
                    <h3 className="text-xl font-bold">{list.title}</h3>
                    <div className="flex flex-col gap-2">
                        {list.cards?.map((card) => (
                            <div key={card.id} className="flex bg-[#22272B] rounded-lg justify-center px-2 py-1 shadow-2xl flex-col">
                                <h4 className="text-lg font-bold">{card.title}</h4>
                                <div>{card.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button className="bg-[#ffffff3d] hover:bg-[#ffffff2a] transition rounded-lg min-w-[272px] h-fit p-2 flex items-center shadow-lg">
                {data?.findBoard?.lists?.length === 0 ? "Add your first list" : "Add another list"}
            </button>
        </div>
    </>
  )
}
