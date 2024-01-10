// eslint-disable-next-line
// @ts-nocheck

import { UploadDropzone } from "../../uploadthing";
import { useMutation } from "@apollo/client";
import {
  AddBgMutation,
  AddBgDocument,
  AddBgMutationVariables,
} from "@/generated/graphql";
import { toast } from "sonner"

export default function UploadBackground({ board }:any) { //eslint-disable-line
  const [addBg] = useMutation<AddBgMutation, AddBgMutationVariables>(AddBgDocument);

  const onClientUploadComplete = (res:any) => { //eslint-disable-line
    addBg({
      variables: {
        boardId: board.id,
        url: res[0].url,
        name: res[0].name,
        key: res[0].key,
        uploadedAt: new Date().toISOString(),
      },
      optimisticResponse: {
        __typename: "Mutation",
        addBgToBoard: {
          __typename: "Board",
          id: board.id,
          bg: res[0].url,
          uploaded_bgs: [
            ...board.uploaded_bgs, 
            {
              __typename: "Background",
              id: res[0].key,
              name: res[0].name,
              url: res[0].url,
              uploaded_at: new Date().toISOString(),
            }
          ]
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-start w-full gap-2 py-2">
      <h3 className="text-lg font-semibold">Change background</h3>
      <UploadDropzone
        endpoint="image"
        onClientUploadComplete={onClientUploadComplete}
        onUploadError={(error:any) => { //eslint-disable-line
          toast.error(error.cause)
        }}
        appearance={{
          container: "border-neutral-600 bg-[linear-gradient(90deg,#333_0.6%,#222)] w-full border-dashed rounded-xl"
        }}
      />
    </div>
  );
}