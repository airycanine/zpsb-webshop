import React from "react";

interface ImagesUploaderProps {
  onUpload: Function;
}

const MultipleImagesUploader = ({ onUpload }: ImagesUploaderProps) => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  // @ts-ignore
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      // @ts-ignore
      current.file = file;
      reader.onload = (e) => {
        // @ts-ignore
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  // @ts-ignore
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none",
        }}
      />
      <div
        style={{
          height: "60px",
          width: "60px",
          border: "1px dashed black",
        }}
        //@ts-ignore
        onClick={() => imageUploader.current.click()}
      >
        <div style={{ width: "200px", height: "200px" }}>
          <img
            ref={uploadedImage}
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </div>
      </div>
      Click to upload Image
    </div>
  );
};

export default MultipleImagesUploader;
