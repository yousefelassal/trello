import { useQuery, useMutation } from '@apollo/client'
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  GetSavedDocument,
  GetSavedQuery,
  GetSavedQueryVariables,
  SaveDocument,
  SaveMutation,
  SaveMutationVariables,
} from '@/generated/graphql'
import { Link } from 'react-router-dom'
import AddBoard from './AddBoard'
import Star from './Star'
import NoStarsImage from '@/assets/star.svg'
import Loading from './Loading'

import { Skeleton } from './ui/skeleton'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code2, Github, LogOut } from "lucide-react";
import { Button } from './ui/button'

export default function Header({logout}: {logout: () => void}) {
  const { data:user, loading, error } = useQuery<MeQuery, MeQueryVariables>(MeDocument)

  const { data:saved, loading:loadingSaved, error:errorSaved } = useQuery<GetSavedQuery, GetSavedQueryVariables>(GetSavedDocument)

  const [save] = useMutation<SaveMutation, SaveMutationVariables>(SaveDocument, {
    update: (cache, response) => {
      cache.updateQuery({ query: GetSavedDocument }, (data) => {
        if (!response.data?.saveBoard?.saved) {
          return {
            savedBoards: data.savedBoards.filter((board:any) => board.id !== response.data?.saveBoard?.id) // eslint-disable-line
          }
        }
      return data
    })
  },
  })

  if (error) return <div>{error.message}</div>

  if (loading) return <div className="px-4 sm:container w-screen top-0 fixed py-2 items-center z-40 flex justify-between border-b border-neutral-600 bg-[#1D2125]">
    <div className="flex gap-2">
      <Skeleton className="h-9 w-24 bg-gray-500/80" />
      <Skeleton className="h-9 w-20 bg-gray-500/80" />
      <Skeleton className="h-9 w-9 bg-gray-500/80" />
    </div>
    <Skeleton className="h-9 w-16 bg-gray-500/80" />
  </div>

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, board:any) => {//eslint-disable-line
    event.stopPropagation()
    event.preventDefault()
    
    await save({
      variables: {
        saveBoardId: board.id,
        saved: false,
        savedAt: board.saved ? null : new Date().toISOString()
      },
      optimisticResponse: {
        __typename: "Mutation",
        saveBoard: {
          __typename: "Board",
          id: board.id,
          saved: false,
          saved_at: board.saved ? null : new Date().toISOString(),
          title: board.title,
          bg: board.bg
        }
      }
    })
  }
  
  return (
    <div className="px-4 sm:container w-screen top-0 fixed py-2 items-center z-40 flex justify-between border-b border-neutral-600 bg-[linear-gradient(110deg,#333_0.6%,#222)]">
      <div className="flex gap-1 sm:gap-2">
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
                <div className="grid gap-2 p-4 w-64 md:w-[400px]">
                {saved?.savedBoards?.length === 0 && 
                <>
                  <img src={NoStarsImage} alt="masroo2a mn trello credits to whoever made this idk" className="rounded-md" />
                  <div>Star important boards to access them quickly.</div>
                </>
                }
                {loadingSaved && <Loading />}
                {errorSaved && <div>{errorSaved.message}</div>}
                  {saved?.savedBoards?.map((board) => (
                    <NavigationMenuLink key={board.id} asChild>
                      <Link to={`/${board.id}`} className="flex justify-between items-center p-1 pr-4 rounded-lg transition hover:bg-gray-500/80">
                        <div className="gap-2 flex items-center">
                          <img src={board.bg} alt="board background" className="w-10 h-8 object-cover rounded-md" />
                          <span className="font-semibold">{board.title}</span>
                        </div>
                        <Star iconClassName="w-5 h-5" saved onClick={(e:any /*eslint-disable-line*/)=>handleSave(e, board)} />
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
         <Button variant="outline" className="bg-transparent text-sm px-3 py-1 border-neutral-600 rounded-lg hover:bg-gray-500/80">More</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-translate-x-4 sm:-translate-x-8">
          <DropdownMenuLabel>{user?.me?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/documentation">
              <Code2 className="mr-2 h-4 w-4" />
              <span>Documentation</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href="https://github.com/yousefelassal/trello"
              rel="noreferrer"
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
