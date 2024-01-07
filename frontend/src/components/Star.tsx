import { cn } from "@/lib/utils"
import { IconStar, IconStarFilled } from "@tabler/icons-react"

export default function Star({
    className,
    iconClassName,
    saved,
    onClick,
    animate
  }:{
    className?:string,
    iconClassName?:string,
    saved:boolean | null | undefined,
    onClick?:any // eslint-disable-line
    animate?:boolean
  }) { 
  return (
    <button onClick={onClick} className={cn(`transition hover:scale-110 ${animate && !saved && 'hidden group-hover:block group-hover:animate-in-from-left'}`, className)}>
    {saved ? (
        <IconStarFilled className={cn("w-6 h-6 text-yellow-400", iconClassName)} />
    ) : (
        <IconStar className={cn("w-6 h-6 text-gray-200", iconClassName)} />
    )}
    </button>
  )
}
