import { cn } from "@/lib/utils"
import { IconStar, IconStarFilled } from "@tabler/icons-react"

export default function Star({ className, saved, onClick }:{ className?:string, saved:boolean | null | undefined, onClick?:any }) { // eslint-disable-line
  return (
    <button onClick={onClick} className="transition hover:scale-110">
    {saved ? (
        <IconStarFilled className={cn("w-6 h-6 text-yellow-400", className)} />
    ) : (
        <IconStar className={cn("w-6 h-6 text-gray-200", className)} />
    )}
    </button>
  )
}
