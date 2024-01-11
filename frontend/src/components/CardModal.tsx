import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
    FindCardDocument,
    FindCardQuery,
    FindCardQueryVariables
} from "@/generated/graphql";  
import Loading from "./Loading";
import { IconBoxMultiple, IconAlignJustified, IconPaperclip, IconPhoto } from "@tabler/icons-react"

export default function CardModal({ previousLocation }:any) { //eslint-disable-line
  const modalRef = useRef<any>(); //eslint-disable-line
  const { id } = useParams();
  const navigate = useNavigate();

    const { data, loading, error } = useQuery<FindCardQuery, FindCardQueryVariables>(FindCardDocument, {
        variables: {
            findCardId: id as string
        }
    });

  useEffect(() => {
    const observerRefValue = modalRef.current;
    disableBodyScroll(observerRefValue);

    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-10 bg-black/70 flex justify-center overflow-y-auto px-6 py-2 sm:px-10 sm:py-6"
      onClick={() => navigate(`${previousLocation.pathname}`)}
    >
        <div
            className="flex flex-col text-[#9FADBC] gap-4 w-full bg-[#323940] min-h-[40vh] mt-32 z-20 relative h-fit max-w-2xl rounded-xl shadow-lg p-3 md:px-4 pb-6 mx-1"
            onClick={e=>e.stopPropagation()}
        >
            <div className="absolute right-1 top-1">
                <Button
                    variant="ghost"
                    onClick={()=>navigate(`${previousLocation.pathname}`)}
                    className="rounded-lg px-2 py-0 hover:bg-gray-500/80"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
            {loading && <Loading className="absolute inset-0" />}
            {error && <p>Oops something went wrong!</p>}
            <div className="flex items-center mb-2 gap-2">
                <IconBoxMultiple />
                <h1 className="text-2xl mb-2 font-semibold">{data?.findCard?.title}</h1>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <IconAlignJustified />
                        <h2 className="text-lg font-medium">Description</h2>
                    </div>
                    {data?.findCard?.description &&
                        <Button
                            variant="ghost"
                            className="rounded-lg px-2 py-0 bg-gray-500/60 shadow-sm hover:bg-gray-500/80"
                        >
                            Edit
                        </Button>
                    }
                </div>
                {data?.findCard?.description
                    ? <p className="text-sm">{data?.findCard?.description}</p>
                    : <Button
                        variant="ghost"
                        className="mx-8 rounded-lg text-sm h-14 items-start justify-start bg-gray-500/60 shadow-sm"
                      >
                        Add a description...
                      </Button>
                }
                <div className="flex items-center gap-2">
                    <IconPaperclip />
                    <h2 className="text-lg font-medium">Attachments</h2>
                </div>
                {data?.findCard?.attachments?.length !== 0
                    ? 
                        <div className="flex flex-col gap-2">
                            {data?.findCard?.attachments?.map((attachment, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <a href={attachment?.url} target="_blank" rel="noreferrer">{attachment?.name}</a>
                                </div>
                            ))}
                        </div>
                    : <Button
                        variant="ghost"
                        className="mx-8 flex gap-2 rounded-lg text-sm justify-start bg-gray-500/60 shadow-sm"
                      >
                        <IconPaperclip />
                        Add an attachment
                      </Button>
                }
                <div className="flex items-center gap-2">
                    <IconPhoto />
                    <h2 className="text-lg font-medium">Images</h2>
                </div>
                {data?.findCard?.images?.length !== 0
                    ? 
                        <div className="flex flex-col gap-2">
                            {data?.findCard?.images?.map((image, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <a href={image?.url} target="_blank" rel="noreferrer">{image?.name}</a>
                                </div>
                            ))}
                        </div>
                    : <Button
                        variant="ghost"
                        className="mx-8 flex gap-2 rounded-lg text-sm justify-start bg-gray-500/60 shadow-sm"
                      >
                        <IconPhoto />
                        Add an image
                      </Button>
                }
            </div>
        </div>
    </div>
  )
}
