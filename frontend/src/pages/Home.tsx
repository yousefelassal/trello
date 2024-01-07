import { useQuery } from '@apollo/client'
import {
  AllBoardsDocument,
  AllBoardsQuery,
  AllBoardsQueryVariables,
} from '@/generated/graphql'
import AddBoard from '@/components/AddBoard'
import Card from '@/components/Card'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const { data:boards, loading:boardsLoading, error:errorBoards } = useQuery<AllBoardsQuery, AllBoardsQueryVariables>(AllBoardsDocument)
  useDocumentTitle('Boards | Trello 3al daya2')

  return (
    <>
    <div className="fixed -z-10 h-screen w-full bg-black bg-dot-white/[0.2] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
    <div className="container flex flex-col gap-12 pb-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Your Boards</h2>
        {boards?.allBoards?.length === 0 && <div>You don't have any boards yet</div>}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] items-center justify-center grid-auto-rows gap-4 max-w-7xl">
          {boardsLoading && 
            <>
              <Skeleton className="flex min-h-52 flex-col items-center bg-[linear-gradient(110deg,#333_0.6%,#222)] relative max-w-md max-h-[20rem] h-full w-full rounded-xl border border-neutral-600 overflow-hidden group justify-center antialiased">
                <Skeleton className="relative z-10 bg-gray-200/40 rounded-none flex flex-1 w-full h-full min-h-[7rem]">
                  <Skeleton className="absolute bg-gray-200/40 rounded-none inset-0 flex flex-1 w-full h-full min-h-[6rem] " />
                </Skeleton>
                <div className="h-2/3" />
              </Skeleton>
              <Skeleton className="flex min-h-52 flex-col items-center bg-[linear-gradient(110deg,#333_0.6%,#222)] relative max-w-md max-h-[20rem] h-full w-full rounded-xl border border-neutral-600 overflow-hidden group justify-center antialiased">
                <Skeleton className="relative z-10 bg-gray-200/40 rounded-none flex flex-1 w-full h-full min-h-[7rem]">
                  <Skeleton className="absolute bg-gray-200/40 rounded-none inset-0 flex flex-1 w-full h-full min-h-[6rem] " />
                </Skeleton>
                <div className="h-2/3" />
              </Skeleton>
              <Skeleton className="flex min-h-52 flex-col items-center bg-[linear-gradient(110deg,#333_0.6%,#222)] relative max-w-md max-h-[20rem] h-full w-full rounded-xl border border-neutral-600 overflow-hidden group justify-center antialiased">
                <Skeleton className="relative z-10 bg-gray-200/40 rounded-none flex flex-1 w-full h-full min-h-[7rem]">
                  <Skeleton className="absolute bg-gray-200/40 rounded-none inset-0 flex flex-1 w-full h-full min-h-[6rem] " />
                </Skeleton>
                <div className="h-2/3" />
              </Skeleton>
            </>
          }
          {errorBoards && <div>{errorBoards.message}</div>}
          {boards?.allBoards?.map((board) => (
            <Card
              key={board.id}
              board={board}
            />
            ))}
        </div>
      </div>
      <AddBoard />
    </div>
    </>
  )
}
