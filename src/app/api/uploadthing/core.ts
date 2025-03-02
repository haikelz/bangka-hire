// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter untuk aplikasi Anda, dapat berisi beberapa "endpoints" (seperti berikut)
export const ourFileRouter = {
  // Endpoint untuk upload CV dalam format PDF
  cvUploader: f({
    pdf: {
      maxFileSize: "2MB",
    },
  }).onUploadComplete(async ({ metadata: any, file }) => {
    // File telah diupload ke penyimpanan UploadThing.
    try {
      console.log("Upload completed:", file.url);
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
