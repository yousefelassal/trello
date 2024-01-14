import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Loader2, X } from "lucide-react";
import { Button } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {
    FindCardDocument,
    FindCardQuery,
    FindCardQueryVariables,
    UpdateCardDocument,
    UpdateCardMutation,
    UpdateCardMutationVariables,
    DeleteCardDocument,
    DeleteCardMutation,
    DeleteCardMutationVariables,
    DeleteImageDocument,
    DeleteImageMutation,
    DeleteImageMutationVariables,
    AddAttachmentDocument,
    AddAttachmentMutation,
    AddAttachmentMutationVariables,
    DeleteAttachmentDocument,
    DeleteAttachmentMutation,
    DeleteAttachmentMutationVariables
} from "@/generated/graphql";  
import Loading from "./Loading";
import { IconBoxMultiple, IconAlignJustified, IconPaperclip, IconPhoto } from "@tabler/icons-react"
import UploadImage from "./UploadImage";
import ImageCard from "./ImageCard";
import AttachmentCard from "./AttachmentCard";

export default function CardModal({ previousLocation }:any) { //eslint-disable-line
  const modalRef = useRef<any>(); //eslint-disable-line
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useForm();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [isAddingAttachment, setIsAddingAttachment] = useState(false);

    const { data, loading, error } = useQuery<FindCardQuery, FindCardQueryVariables>(FindCardDocument, {
        variables: {
            findCardId: id as string
        },
        onCompleted: (data) => {
            setTitle(data.findCard?.title as string);
            if (data.findCard?.description) {
                setDescription(data.findCard?.description.replace(/<br \/>/g, '\n') as string);
            }
        }
    });

    const [updateCard] = useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument);

    const [deleteCard] = useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, {
        update: (cache) => {
            cache.evict({ id: cache.identify({ __typename: "Card", id: id }) as string });
            cache.gc();
        },
    });

    const [deleteImage] = useMutation<DeleteImageMutation, DeleteImageMutationVariables>(DeleteImageDocument)

    const [addAttachment] = useMutation<AddAttachmentMutation, AddAttachmentMutationVariables>(AddAttachmentDocument)
    
    const [deleteAttachment] = useMutation<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>(DeleteAttachmentDocument)

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
    const descriptionWithBreaks = description.replace(/\n/g, '<br />');
    if (description.trim() == data?.findCard?.description) {
      setDescription(data?.findCard?.description.replace(/<br \/>/g, '\n') as string);
      return;
    }
    if (descriptionWithBreaks == data?.findCard?.description) {
      setDescription(data?.findCard?.description.replace(/<br \/>/g, '\n') as string);
      return;
    }
    if (description.trim() == '') {
        await updateCard({
            variables: {
                id: id as string,
                description: null,
            },
            optimisticResponse: {
                __typename: "Mutation",
                updateCard: {
                    __typename: "Card",
                    id: id as string,
                    title: data?.findCard?.title as string,
                    description: null,
                    cover: data?.findCard?.cover,
                },
            },
        });
        return;
    }

    await updateCard({
      variables: {
        id: id as string,
        description: descriptionWithBreaks,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCard: {
          __typename: "Card",
          id: id as string,
          title: data?.findCard?.title as string,
          description: descriptionWithBreaks,
          cover: data?.findCard?.cover,
        },
      },
    });
  }

  const handleRemoveCover = async () => {
    await updateCard({
      variables: {
        id: id as string,
        cover: null,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCard: {
          __typename: "Card",
          id: id as string,
          title: data?.findCard?.title as string,
          description: data?.findCard?.description,
          cover: null,
        },
      },
    });
  }

  const handleSetCover = async (imageUrl: string) => {
    await updateCard({
      variables: {
        id: id as string,
        cover: imageUrl,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCard: {
          __typename: "Card",
          id: id as string,
          title: data?.findCard?.title as string,
          description: data?.findCard?.description,
          cover: imageUrl,
        },
      },
    });
  }

    const handleDeleteCard = async () => {
        await deleteCard({
            variables: {
                id: id as string
            }
        })
        navigate(`${previousLocation.pathname}`)
    }

    const handleDeleteImage = async (key:string, id:string) => {
        await fetch(`${import.meta.env.VITE_UPLOAD_SERVER}/delete/${key}`,{
            method: 'POST'
        })
        await deleteImage({
            variables: {
                id: id
            },
            update: (cache) => {
                cache.evict({ id: cache.identify({ __typename: "Image", id: id }) as string });
                cache.gc();
            }
        })
    }

    const handleAddAttachment = async () => {
        if (attachmentName.trim() == '' || attachmentUrl.trim() == '') {
            setIsAddingAttachment(false)
            setAttachmentName('')
            setAttachmentUrl('')
            return;
        }
        setIsAddingAttachment(false)
        setAttachmentName('')
        setAttachmentUrl('')
        await addAttachment({
            variables: {
                name: attachmentName,
                url: attachmentUrl,
                cardId: id as string,
                uploadedAt: new Date().toISOString()
            },
            optimisticResponse: {
                __typename: "Mutation",
                addAttachmentToCard: {
                    __typename: "Card",
                    id: id as string,
                    cover: data?.findCard?.cover,
                    attachments: [
                        ...data?.findCard?.attachments as any, //eslint-disable-line
                        {
                            __typename: "Attachment",
                            id: new Date().toISOString(),
                            name: attachmentName,
                            url: attachmentUrl,
                            uploaded_at: new Date().toISOString(),
                            open_graph_image: null
                        }
                    ]
                }
            }
        })
    }

    const handleDeleteAttachment = async (id:string) => {
        await deleteAttachment({
            variables: {
                id: id
            },
            update: (cache) => {
                cache.evict({ id: cache.identify({ __typename: "Attachment", id: id }) as string });
                cache.gc();
            }
        })
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
      className="fixed inset-0 z-50 bg-black/70 flex justify-center overflow-y-auto px-6 py-2 sm:px-10 sm:py-6"
      onClick={() => navigate(`${previousLocation.pathname}`)}
    >
        <div
            className="flex flex-col text-[#9FADBC] gap-4 w-full bg-[#323940] min-h-[40vh] mt-14 z-[60] relative h-fit max-w-2xl rounded-xl shadow-lg mx-1"
            onClick={e=>e.stopPropagation()}
        >
            <div className="absolute z-10 right-1 top-1">
                <Button
                    variant="ghost"
                    onClick={()=>navigate(`${previousLocation.pathname}`)}
                    className={cn("rounded-full py-0 px-[10px] text-white hover:bg-gray-500/80",
                        data?.findCard?.cover && 'bg-gray-500/40'
                    )}
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
            {data?.findCard?.cover &&
                <div className="flex items-center justify-center">
                    <div className="relative h-32 w-full overflow-hidden rounded-md bg-black/60">
                        <img
                            src={data?.findCard?.cover}
                            alt={data?.findCard?.title}
                            className="object-cover absolute inset-0 w-full h-full"
                        />
                    </div>
                </div>
            }
            <div className="w-full p-3 md:px-4 pb-6">
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
                            className="rounded-lg mr-4 py-0 bg-gray-500/60 shadow-sm hover:bg-gray-500/80"
                        >
                            Edit
                        </Button>
                    }
                </div>
                {data?.findCard?.description && !isEditingDescription &&
                    <p className="text-sm mx-8">{
                        data?.findCard?.description.split('<br />').map((line, index) => (
                            <span key={index}>{line}<br /></span>
                        ))
                    }</p>
                }

                {isEditingDescription &&
                <div className="flex flex-col gap-2">
                    <TextareaAutosize
                        autoFocus
                        className="rounded-lg ml-6 mr-4 text-sm p-2 flex justify-start font-normal bg-black/60 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        value={description}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleDescriptionChange}
                        onKeyDown={(e) => {
                            if (e.key == 'Escape') {
                                setIsEditingDescription(false)
                                setDescription(data?.findCard?.description?.replace(/<br \/>/g, '\n') as string)
                            }
                        }}
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={handleDescriptionChange}
                            className="rounded-lg ml-6 py-0"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                setIsEditingDescription(false)
                                setDescription(data?.findCard?.description?.replace(/<br \/>/g, '\n') as string)
                            }}
                            variant="ghost"
                            className="rounded-lg py-0"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                }
                {!data?.findCard?.description && !isEditingDescription &&
                    <Button
                    variant="ghost"
                    className="ml-8 mr-4 rounded-lg text-sm h-14 items-start justify-start bg-gray-500/60 shadow-sm"
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
                    &&
                    <>
                        {data?.findCard?.attachments?.map((attachment) => (
                            <AttachmentCard
                                key={attachment?.id}
                                attachment={attachment}
                                handleDeleteAttachment={handleDeleteAttachment}
                                handleSetCover={handleSetCover}
                                handleRemoveCover={handleRemoveCover}
                                data={data}
                            />
                        ))}
                    </>
                }
                {isAddingAttachment &&
                    <div className="flex flex-col gap-2">
                        <input
                            autoFocus
                            type="text"
                            className="rounded-lg ml-6 mr-4 text-sm p-2 flex justify-start font-normal bg-black/60 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            value={attachmentName}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => setAttachmentName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key == 'Escape') {
                                    setIsAddingAttachment(false)
                                    setAttachmentName('')
                                    setAttachmentUrl('')
                                }
                            }}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            className="rounded-lg ml-6 mr-4 text-sm p-2 flex justify-start font-normal bg-black/60 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            value={attachmentUrl}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => setAttachmentUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key == 'Escape') {
                                    setIsAddingAttachment(false)
                                    setAttachmentName('')
                                    setAttachmentUrl('')
                                }
                            }}
                            placeholder="URL"
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={handleAddAttachment}
                                className="rounded-lg ml-6 py-0"
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAddingAttachment(false)
                                    setAttachmentName('')
                                    setAttachmentUrl('')
                                }}
                                variant="ghost"
                                className="rounded-lg py-0"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                }
                {!isAddingAttachment &&
                <Button
                    variant="ghost"
                    className="ml-8 mr-4 flex gap-2 rounded-lg text-sm justify-start bg-gray-500/60 shadow-sm"
                    onClick={() => setIsAddingAttachment(true)}
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
                    &&
                    <>
                        {data?.findCard?.images?.map((image) => (
                            <ImageCard
                                key={image?.id}
                                image={image}
                                handleDeleteImage={handleDeleteImage}
                                handleSetCover={handleSetCover}
                                handleRemoveCover={handleRemoveCover}
                                data={data}
                            />
                        ))}
                    </>
                }
                <UploadImage card={data?.findCard} />
                <div className="flex items-end justify-end">
                    <Button
                        variant="destructive"
                        className="m-4 flex flex-end gap-2 rounded-lg shadow-sm"
                        onClick={form.handleSubmit(handleDeleteCard)}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? <><Loader2 className="animate-spin" /> Deleting...</> : "Delete Card"}
                    </Button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
