import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing({
  
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

export const uploadRouter = {
  image: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;