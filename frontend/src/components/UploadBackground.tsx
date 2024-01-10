// eslint-disable-next-line
// @ts-nocheck

import { UploadDropzone } from "../../uploadthing";
import { useMutation } from "@apollo/client";
import {
  AddBgMutation,
  AddBgDocument,
  AddBgMutationVariables,
} from "@/generated/graphql";

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
          console.error(error, error.cause);
        }}
        appearance={{
          container: "border-gray-400 bg-blue-50 w-full border-dashed border-blue-500 rounded-xl"
        }}
      />
    </div>
  );
}