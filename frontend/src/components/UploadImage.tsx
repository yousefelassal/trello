// eslint-disable-next-line
// @ts-nocheck

import { UploadDropzone } from "../../uploadthing";

export default function UploadImage() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div>
        <UploadDropzone
          endpoint="image"
          onClientUploadComplete={(file:any) => { //eslint-disable-line
            console.log("uploaded", file);
            alert("Upload complete");
          }}
          onUploadError={(error:any) => { //eslint-disable-line
            console.error(error, error.cause);
            alert("Upload failed");
          }}
        />
      </div>
    </div>
  );
}