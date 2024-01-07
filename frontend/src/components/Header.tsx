import { useQuery } from '@apollo/client'
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  GetSavedDocument,
  GetSavedQuery,
  GetSavedQueryVariables
} from '@/generated/graphql'
import { Link } from 'react-router-dom'
import AddBoard from './AddBoard'

import { Skeleton } from './ui/skeleton'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Header({logout}: {logout: () => void}) {
  const { data:user, loading, error } = useQuery<MeQuery, MeQueryVariables>(MeDocument)

  const { data:saved, loading:loadingSaved, error:errorSaved } = useQuery<GetSavedQuery, GetSavedQueryVariables>(GetSavedDocument)

  if (error) return <div>{error.message}</div>

  if (loading) return <div className="container fixed inset-x-0 py-2 backdrop-blur items-center z-40 flex justify-between border-b border-neutral-600 bg-[hsla(0,0%,100%,.1)]">
    <div className="flex gap-2">
      <Skeleton className="h-9 w-24 bg-gray-500/80" />
      <Skeleton className="h-9 w-20 bg-gray-500/80" />
      <Skeleton className="h-9 w-9 bg-gray-500/80" />
    </div>
    <Skeleton className="h-9 w-16 bg-gray-500/80" />
  </div>
  
  return (
    <div className="container fixed inset-x-0 py-2 backdrop-blur items-center z-40 flex justify-between border-b border-neutral-600 bg-[hsla(0,0%,100%,.1)]">
      <div className="flex gap-2">
        <Link to="/" className="group rounded-md px-2 py-1 items-center flex gap-1 transition hover:bg-gray-500/80">
          <div className="rounded-[3px] items-start p-1 h-5 w-5 flex gap-[2px] bg-[#9eacba]/80">
            <div className="h-3 group-hover:animate-logo-reverse w-2 bg-[#1d2125]/80 rounded-[1px]" />
            <div className="h-[9px] group-hover:animate-logo w-2 bg-[#1d2125]/80 rounded-[1px]" />
          </div>
          <div className="text-xl font-bold">Trello</div>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="rounded-md px-2 text-base font-semibold py-1 items-center bg-transparent justify-center flex gap-1 transition hover:bg-gray-500/80">
                Starred
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-64 md:w-[400px]">
                {saved?.savedBoards?.length === 0 && 
                <>
                  <img src="src/assets/star.svg" alt="masroo2a mn trello credits to whoever made this idk" className="rounded-md" />
                  <div>Star important boards to access them quickly.</div>
                </>
                }
                {loadingSaved && <div>Loading...</div>}
                {errorSaved && <div>{errorSaved.message}</div>}
                  {saved?.savedBoards?.map((board) => (
                    <NavigationMenuLink key={board.id} asChild>
                      <Link to={`/${board.id}`} className="flex items-center gap-2 px-2 py-1 rounded-md transition hover:bg-gray-500/80">
                        {board.title}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <AddBoard header className="w-8 h-8 items-center flex justify-center p-0" />
      </div>
      <button onClick={logout} className="flex items-center text-sm flex-col">
        Logout <span className="text-xs">{user?.me?.name}</span>
      </button>
    </div>
  )
}
