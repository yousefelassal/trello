import {
    GlowingStarsTitle,
} from "./ui/glowing-stars";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
    SaveMutation,
    SaveMutationVariables,
    SaveDocument,
    GetSavedDocument
} from "../generated/graphql"; 
import Star from "./Star";
   
export default function Card({
    board
  }: any // eslint-disable-line
  ) {
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
    });

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      event.preventDefault()
      await save({
        variables: {
          saveBoardId: board.id,
          saved: !board.saved,
          savedAt: board.saved ? null : new Date().toISOString()
        }
      })
    }

    return (
      <Link to={`/${board.id}`} className="flex flex-col items-center bg-[linear-gradient(110deg,#333_0.6%,#222)] relative h-52 w-full rounded-xl border border-neutral-600 overflow-hidden group justify-center antialiased">
        <div className="bg-dot-white inset-0 absolute" />
        <Star className="absolute top-4 left-4 z-10 drop-shadow-lg" saved={board.saved} onClick={handleSave} animate />
          <div className="relative flex flex-1 w-full h-[7rem]">
            <img src={board.bg} alt="board" className="absolute group-hover:scale-110 transition duration-300 object-cover inset-0 flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
          </div>
          <div className="w-full flex justify-between px-6 py-8 items-center">
          <GlowingStarsTitle className="group-hover:scale-105 duration-300 transition">{board.title}</GlowingStarsTitle>
            <div className="h-8 w-8 rounded-full group-hover:translate-x-1 transition duration-300 bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
              <Icon />
            </div>
          </div>
      </Link>
    );
  }
   
  const Icon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4 text-white stroke-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    );
  };