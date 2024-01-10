// eslint-disable-next-line
// @ts-nocheck

import { UploadDropzone } from "../../uploadthing";
import { useMutation } from "@apollo/client";
import {
  AddBgMutation,
  AddBgDocument,
  AddBgMutationVariables,
  UpdateBoardDocument,
  UpdateBoardMutation,
  UpdateBoardMutationVariables
} from "@/generated/graphql";
import { toast } from "sonner"
import { Check } from "lucide-react";

export default function UploadBackground({ board }:any) { //eslint-disable-line
  const [addBg] = useMutation<AddBgMutation, AddBgMutationVariables>(AddBgDocument);
  const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument);

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

  const handleBgChange = async (bg:any) => { //eslint-disable-line
    await updateBoard({
      variables: {
        updateBoardId: board.id,
        bg: bg.url,
        updated_at: new Date().toISOString()
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateBoard: {
          __typename: "Board",
          id: board.id,
          bg: bg.url,
          title: board.title,
          lists: board.lists,
          description: board.description,
          updated_at: new Date().toISOString()
        },
      },
    });
  }

  return (
    <div className="flex flex-col items-start w-full gap-2 py-2">
      <h3 className="text-lg font-semibold">Change background</h3>
      {board.uploaded_bgs.length > 0 && (
        <div className="flex flex-col items-start w-full gap-2">
          <h4 className="text-sm">Uploaded</h4>
          <div className="flex flex-wrap gap-2">
            {board.uploaded_bgs.map((bg:any) => ( //eslint-disable-line
              <button
                onClick={()=>{
                  if (board.bg !== bg.url) {
                    handleBgChange(bg)
                  }
                }}
                key={bg.id}
                className="relative w-20 h-14 rounded-lg overflow-hidden"
              >
                <img
                  src={bg.url}
                  alt="background"
                  className="w-full h-full object-cover"
                />
                {board.bg === bg.url && ( //eslint-disable-line
                  <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/50 hover:bg-black/70 transition">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
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