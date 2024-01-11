import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
    FindCardDocument,
    FindCardQuery,
    FindCardQueryVariables,
    UpdateCardDocument,
    UpdateCardMutation,
    UpdateCardMutationVariables,
} from "@/generated/graphql";  
import Loading from "./Loading";
import { IconBoxMultiple, IconAlignJustified, IconPaperclip, IconPhoto } from "@tabler/icons-react"

export default function CardModal({ previousLocation }:any) { //eslint-disable-line
  const modalRef = useRef<any>(); //eslint-disable-line
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("");

    const { data, loading, error } = useQuery<FindCardQuery, FindCardQueryVariables>(FindCardDocument, {
        variables: {
            findCardId: id as string
        },
        onCompleted: (data) => {
            setTitle(data.findCard?.title as string);
            if (data.findCard?.description) {
                setDescription(data.findCard?.description as string);
            }
        }
    });

    const [updateCard] = useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument);

  useEffect(() => {
    const observerRefValue = modalRef.current;
    disableBodyScroll(observerRefValue);

    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  const handleTitleChange = async () => {
    setIsEditingTitle(false);
    if (title.trim() == '' || title.trim() == data?.findCard?.title) {
      setTitle(data?.findCard?.title as string);  
      return;
    }
    await updateCard({
      variables: {
        id: id as string,
        title: title,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCard: {
          __typename: "Card",
          id: id as string,
          title: title,
          description: data?.findCard?.description,
          cover: data?.findCard?.cover,
        },
      },
    });
  }

  const handleDescriptionChange = async () => {
    setIsEditingDescription(false);
    if (description.trim() == '' || description.trim() == data?.findCard?.description) {
      setDescription(data?.findCard?.description as string);  
      return;
    }
    await updateCard({
      variables: {
        id: id as string,
        description: description,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCard: {
          __typename: "Card",
          id: id as string,
          title: data?.findCard?.title as string,
          description: description,
          cover: data?.findCard?.cover,
        },
      },
    });
  }

    if (loading) return <div
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
          <Loading className="absolute inset-0" />
        </div>
    </div>

    if (error) return <p>Oops something went wrong! {error.message}</p>;

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
            <div className="flex items-center mb-2 gap-2">
                <IconBoxMultiple className="mt-1" />
                {isEditingTitle
                    ?  <input
                        autoFocus
                        type="text"
                        className="rounded-lg w-fit text-2xl p-0 flex justify-start font-semibold bg-black/60 border-2 border-[#22272B] shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        value={title}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleChange}
                        onKeyDown={(e) => {
                        if (e.key == 'Enter' && (title.trim() != '' || title.trim() != data?.findCard?.title as string)) {
                            handleTitleChange()
                        }
                        if (e.key == 'Escape') {
                            setIsEditingTitle(false)
                            setTitle(data?.findCard?.title as string)
                        }
                        }}
                        style={{
                        width: `${(title.length + 0.6)}ch`,
                        minWidth: '4ch'
                        }}
                    />
                    :  <Button
                        className="text-2xl p-0 flex justify-start font-semibold"
                        variant="ghost"
                        onClick={() => setIsEditingTitle(true)}
                      >
                        {data?.findCard?.title}
                      </Button>
                }
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <IconAlignJustified />
                        <h2 className="text-lg font-medium">Description</h2>
                    </div>
                    {data?.findCard?.description && !isEditingDescription &&
                        <Button
                            onClick={() => setIsEditingDescription(true)}
                            variant="ghost"
                            className="rounded-lg mr-8 py-0 bg-gray-500/60 shadow-sm hover:bg-gray-500/80"
                        >
                            Edit
                        </Button>
                    }
                    {data?.findCard?.description && isEditingDescription &&
                    <div className="flex gap-2">
                        <Button
                            onClick={handleDescriptionChange}
                            className="rounded-lg py-0"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                setIsEditingDescription(false)
                                setDescription(data?.findCard?.description as string)
                            }}
                            variant="ghost"
                            className="rounded-lg mr-8 py-0"
                        >
                            Cancel
                        </Button>
                    </div>
                    }
                </div>
                {data?.findCard?.description && !isEditingDescription &&
                    <p className="text-sm mx-8">{data?.findCard?.description}</p>
                }

                {isEditingDescription &&
                    <textarea
                        autoFocus
                        className="rounded-lg mx-6 text-sm p-2 flex justify-start font-normal bg-black/60 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        value={description}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleDescriptionChange}
                        onKeyDown={(e) => {
                            if (e.key == 'Escape') {
                                setIsEditingDescription(false)
                                setDescription(data?.findCard?.description as string)
                            }
                        }}
                    />
                }
                {!data?.findCard?.description && !isEditingDescription &&
                    <Button
                    variant="ghost"
                    className="mx-8 rounded-lg text-sm h-14 items-start justify-start bg-gray-500/60 shadow-sm"
                    onClick={() => setIsEditingDescription(true)}
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
