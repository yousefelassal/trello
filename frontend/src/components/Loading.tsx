import { cn } from "@/lib/utils"

export default function Loading({ className }: {className?:string}) {
  return (
    <div className={cn("h-full w-full flex items-center justify-center", className)}>
        <div className="rounded-lg p-2 h-10 w-10 flex items-start justify-center gap-[2px] bg-[#9eacba]/80">
            <div className="h-[20px] animate-loading-reverse w-3 bg-[#1d2125]/80 rounded-[1px]" />
            <div className="h-[12px] animate-loading w-3 bg-[#1d2125]/80 rounded-[1px]" />
        </div>
    </div>
  )
}
