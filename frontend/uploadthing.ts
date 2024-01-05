import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { useTokenValue } from './src/hooks/useTokenValue'

export const useHeaders = () => {
    const token = useTokenValue()
    return {
        authorization: `Bearer ${token}`
    }
}

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

const f = createUploadthing({
      errorFormatter: (err) => {
          console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

const uploadRouter = {
  image: f({
    image: {
        maxFileSize: "4MB",
        maxFileCount: 1
    }
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
}),
} satisfies FileRouter;

type OurFileRouter = typeof uploadRouter;

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();