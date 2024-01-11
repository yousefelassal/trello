// eslint-disable-next-line
// @ts-nocheck

import { useMutation } from "@apollo/client";
import { UploadButton } from "../../uploadthing";
import {
    AddImageMutation,
    AddImageDocument,
    AddImageMutationVariables,
} from "@/generated/graphql";
import { toast } from "sonner"

export default function UploadImage({card}:any) {//eslint-disable-line
    const [addImage] = useMutation<AddImageMutation, AddImageMutationVariables>(AddImageDocument);

    const onClientUploadComplete = (res:any) => { //eslint-disable-line
        addImage({
            variables: {
                cardId: card.id,
                url: res[0].url,
                name: res[0].name,
                key: res[0].key,
                uploadedAt: new Date().toISOString(),
            },
            optimisticResponse: {
                __typename: "Mutation",
                addImageToCard: {
                    __typename: "Card",
                    id: card.id,
                    cover: res[0].url,
                    images: [
                        ...card.images,
                        {
                            __typename: "Image",
                            id: res[0].key,
                            name: res[0].name,
                            url: res[0].url,
                            key: res[0].key,
                            uploaded_at: new Date().toISOString(),
                        }
                    ]
                },
            },
        });
    }

  return (
    <>
        <UploadButton
        endpoint="image"
        onClientUploadComplete={onClientUploadComplete}
        onUploadError={(error:any) => { //eslint-disable-line
          toast.error(error.cause)
        }}
        appearance={{
            button: "w-full text-[#9FADBC] hover:text-white flex gap-2 rounded-lg text-sm bg-gray-500/60 shadow-sm hover:bg-gray-500/80",
            container: "ml-8 mr-4 "
        }}
        />
    </>
  )
}
