import { generateComponents } from "@uploadthing/react";
import { useTokenValue } from './src/hooks/useTokenValue'

export const useHeaders = () => {
    const token = useTokenValue()
    return {
        authorization: `Bearer ${token}`
    }
}

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents({
    url: import.meta.env.VITE_UPLOAD_SERVER
  });