import { useParams } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client'
import {
    FindBoardQuery,
    FindBoardDocument,
    FindBoardQueryVariables,
    AddListDocument,
    AddListMutation,
    AddListMutationVariables,
    AddCardDocument,
    AddCardMutation,
    AddCardMutationVariables,
} from "@/generated/graphql"

export default function Board() {
  const { id } = useParams()

  const { data, loading, error } = useQuery<FindBoardQuery, FindBoardQueryVariables>(FindBoardDocument, {
    variables: { id: id as string }
  })

  const [addList] = useMutation<AddListMutation, AddListMutationVariables>(AddListDocument,{
    optimisticResponse: {
        __typename: "Mutation",
        addList: {
            __typename: "Board",
            id: id as string,
            title: data?.findBoard?.title as string,
            bg: data?.findBoard?.bg as string,
            description: data?.findBoard?.description as string,
            lists: [
                ...data?.findBoard?.lists as any[] || [], //eslint-disable-line
                {
                    __typename: "List",
                    id: `temp-${Date.now()}`,
                    title: "New List",
                    cards: []
                }
            ]
        }
    }
  })

  const [addCard] = useMutation<AddCardMutation, AddCardMutationVariables>(AddCardDocument)

  if (error) return <div>{error.message}</div>

  if (loading) return <div>Loading...</div>

  const addNewList = async () => {
    addList({
        variables: {
            boardId: id as string,
            title: `New List`
        }
    })
  }

  const addNewCard = async (list:any) => { //eslint-disable-line
    addCard({
        variables: {
            listId: list.id,
            title: `New Card`
        },
        optimisticResponse: {
            __typename: "Mutation",
            addCard: {
                __typename: "List",
                id: list.id,
                title: list.title,
                cards: [
                    ...list.cards as any[], //eslint-disable-line
                    {
                        __typename: "Card",
                        id: `temp-${Date.now()}`,
                        title: "New Card",
                        description: ""
                    }
                ]
            }
        }
    })
  }

  return (
    <>
        <div className="-z-10 fixed inset-0 overflow-hidden">
            <img src={data?.findBoard?.bg} alt="board background" className="object-cover absolute w-screen h-screen inset-0" />
        </div>
        <div className="fixed px-6 backdrop-blur-sm py-2 w-screen shadow -mt-4 bg-black/60">
            <h2 className="text-2xl w-fit p-2 py-1 hover:bg-gray-700 rounded-lg font-bold">{data?.findBoard?.title}</h2>
        </div>
        <div className="container pt-16 flex gap-2">
            {data?.findBoard?.lists?.map((list) => (
                <div key={list.id} className="flex p-2 flex-col min-w-[272px] h-fit rounded-2xl shadow-2xl border border-[#201f1f] bg-[#101204] gap-2">
                    <h3 className="text-xl font-bold">{list.title}</h3>
                    <div className="flex flex-col gap-2">
                        {list.cards?.map((card) => (
                            <div key={card.id} className="flex bg-[#22272B] rounded-lg justify-center px-2 py-1 shadow-2xl flex-col">
                                <h4 className="text-lg font-bold">{card.title}</h4>
                                <div>{card.description}</div>
                            </div>
                        ))}
                        <button
                            onClick={() => addNewCard(list)}
                            className="bg-[#ffffff3d] hover:bg-[#ffffff2a] transition rounded-lg h-fit p-2 flex items-center shadow-lg"
                        >
                            {list.cards?.length === 0 ? "Add a card" : "Add another card"}
                        </button>
                    </div>
                </div>
            ))}
            <button
                onClick={addNewList}
                className="bg-[#ffffff3d] hover:bg-[#ffffff2a] transition rounded-lg min-w-[272px] h-fit p-2 flex items-center shadow-lg"
            >
                {data?.findBoard?.lists?.length === 0 ? "Add your first list" : "Add another list"}
            </button>
        </div>
    </>
  )
}
