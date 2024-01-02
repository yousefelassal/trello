import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Balancer from "react-wrap-balancer";

const Board = ({
    className,
    to,
    title,
    description,
    bg,
    icon,
  }: {
    className?: string;
    to: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    bg?: string | undefined;
    icon?: React.ReactNode;
  }) => {
    return (
      <Link
        to={to}
        className={cn(
          "row-span-1 rounded-xl group/bento overflow-hidden hover:shadow-xl transition duration-200 shadow-none bg-black border-white/[0.2] border justify-between flex flex-col",
          className
        )}
      >
        <div className="relative flex flex-1 w-full h-full min-h-[7rem]">
            <img src={bg} alt="board" className="absolute object-cover inset-0 blur-[1px] flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
        </div>
        <div className="p-4">
            <div className="group-hover/bento:translate-x-2 z-10 transition duration-200">
                {icon}
            <div className="font-sans text-3xl drop-shadow-2xl z-10 font-semibold text-neutral-200 mb-2">
                <Balancer>{title}</Balancer>
            </div>
            <div className="font-sans z-10 font-normal text-neutral-300">
                <Balancer>{description}</Balancer>
            </div>
            </div>
        </div>
      </Link>
    );
  };

export default Board