import {
    GlowingStarsBackgroundCard,
    GlowingStarsTitle,
} from "./ui/glowing-stars";
import { Link } from "react-router-dom";
   
export default function Card({
    to,
    title,
    bg,
  }: {
    to: string;
    title?: string | React.ReactNode;
    bg?: string | undefined;
  }) {
    return (
      <Link to={to} className="flex items-center group justify-center antialiased">
        <GlowingStarsBackgroundCard>
          <div className="relative flex flex-1 w-full h-full min-h-[7rem]">
            <img src={bg} alt="board" className="absolute object-cover inset-0 blur-[1px] flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
          </div>
          <div className="flex justify-between px-6 py-8 items-center">
          <GlowingStarsTitle>{title}</GlowingStarsTitle>
            <div className="h-8 w-8 rounded-full group-hover:translate-x-1 transition duration-300 bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
              <Icon />
            </div>
          </div>
        </GlowingStarsBackgroundCard>
      </Link>
    );
  }
   
  const Icon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
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