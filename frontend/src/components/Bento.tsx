import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconBrandTrello,
  IconTableColumn,
} from "@tabler/icons-react";

export default function Bento() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

// const Skeleton = () => (
//     <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-white/[0.2] bg-black" />
// );

const Header1 = () => (
  <div className="flex relative w-full h-full">
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-white/[0.2] bg-black" />
    <img className="w-full h-full absolute inset-0 object-cover sm:object-contain rounded-lg" src="https://utfs.io/f/7e2c0cac-b12a-49ac-b8a3-9103dfda427a-vkc6j0.png" alt="" />
  </div>
);

const Header2 = () => (
  <div className="flex relative w-full h-full">
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-white/[0.2] bg-black" />
    <img className="w-full h-full absolute inset-0 object-cover sm:object-contain rounded-lg" src="https://utfs.io/f/1f804b95-3e65-425f-8da1-5d22f94a85c9-glaqp8.png" alt="" />
  </div>
);

const Header3 = () => (
  <div className="flex relative w-full h-full">
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-white/[0.2] bg-black" />
    <img className="w-full h-full absolute inset-0 object-cover sm:object-contain rounded-lg" src="https://utfs.io/f/54f5b403-080c-43a7-8c91-675ebb610582-tecaw2.png" alt="" />
  </div>
);
  
const Header4 = () => (
  <div className="flex relative w-full h-full">
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-white/[0.2] bg-black" />
    <img className="w-full h-full absolute inset-0 object-cover sm:object-contain rounded-lg" src="https://utfs.io/f/7d2b3185-c688-405d-98ae-7783538811a5-hxt83z.png" alt="" />
  </div>
);

const items = [
  {
    title: "Boards",
    description: "Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”.",
    header: <Header1 />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Lists",
    description: "The different stages of a task. Build a workflow custom fit to your team’s needs.",
    header: <Header2 />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Cards",
    description: "Cards represent tasks and ideas and hold all the information to get the job done.",
    header: <Header3 />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Success starts with a Trello board",
    description:
      "Similar to a Kanban board, a Trello board is the easiest way to go from idea to action. Plan projects and break down each step of the way to getting things done.",
    header: <Header4 />,
    className: "md:col-span-2",
    icon: <IconBrandTrello className="h-4 w-4 text-neutral-500" />
  },
];
