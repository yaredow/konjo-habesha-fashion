import { UploadButton } from "@/lib/utils/uploadthing";

function ImageUploadButton({ setImages }: any) {
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const uploadedImages = res.map((file) => ({
            key: file.key,
            url: file.url,
          }));
          setImages(uploadedImages);
          // Do something with the response
          console.log(uploadedImages);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default ImageUploadButton;
