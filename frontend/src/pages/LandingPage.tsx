import TypewriterEffectSmooth from "@/components/ui/typewriter-effect";
import { ChevronRight } from "lucide-react";
import Bento from "@/components/Bento";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useDocumentTitle } from '@uidotdev/usehooks'

export default function LandingPage() {
  useDocumentTitle('Trello 3al daya2')
  const words = [
    {
      text: "bas"
    },
    {
      text: "3al"
    },
    {
      text: "daya2"
    }
  ]

  return (
    <>
    <div className="h-[40rem] md:min-h-screen w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <div className="flex items-center flex-col">
          <h1 className="text-6xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Trello
          </h1>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4">
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <Link to="/signup" className="group relative flex justify-center px-4 py-2 items-center z-10 rounded-full bg-white text-black ring-1 ring-white/10 ">
              <span>Join Now</span>
              <ChevronRight className="transition group-hover:translate-x-1 w-4 h-4" />
            </Link>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 py-8 md:px-0 bg-black bg-grid-small-white/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <Bento />
    </div>
    <Footer />
    </>
  );
}
