import { useRef, useState } from "react";
import { getUploadURL, uploadToAWS } from "../services";
import openFolder from "../assets/open-folder.svg";
import closeFolder from "../assets/close-folder.svg";
import { TbCloudUpload } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import { TbFileSmile } from "react-icons/tb";
import { TbCopy } from "react-icons/tb";
import { formatSize, validateFiles } from "../utils";

const UploadPage = () => {
  const [downloadPageURL, setDownloadPageURL] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const URLRef = useRef(null);

  const handleFileChange = (e) => {
    const fileData = validateFiles(e.target.files);
    if (!fileData) return;

    setSelectedFile(fileData);
  };

  const handleFileUpload = async (e) => {
    // step 1: reset default behavior of form
    e.preventDefault();

    // step 2: check if file is selected
    if (!selectedFile) return;

    // step 3: get presigned url from server to upload
    const { url, fileId } = await getUploadURL({
      fileSize: selectedFile.fileSize,
      fileExt: selectedFile.fileExt,
    });

    // step 4.1: upload file to AWS S3 bucket
    console.log("uploading to AWS");
    const response = await uploadToAWS({
      uploadURL: url,
      file: selectedFile.file,
      type: selectedFile.fileType,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("progress", progress);
        setUploadProgress(progress);
      },
    });

    // step 4.2: check if upload was successful
    if (response != 200) {
      console.log("Error uploading file...");
      return;
    }

    setUploadProgress(0);
    setSelectedFile("");
    setDownloadPageURL(`${window.location.origin}/download/${fileId}`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const fileData = validateFiles(e.dataTransfer.files);
    if (!fileData) return;

    setSelectedFile(fileData);
  };

  // const widthPercent = 90;
  // console.log(widthPercent);

  return (
    <div className="flex flex-col items-center justify-center h-screen lg:max-w-[700px] max-w-full p-2 mx-auto gap-2 text-white">
      <div className="lg:p-10 p-6 bg-[#181A20]/50 rounded-3xl">
        <div
          className="bg-[#181A20] lg:px-20 lg:py-10 px-6 py-4 flex flex-col gap-3 items-center rounded-2xl"
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDragEnter={() => setDragging(true)}
          onDragLeave={() => setDragging(false)}
        >
          <div className="flex flex-col items-center max-w-[350px]">
            <div className="flex relative aspect-square h-12">
              <img
                src={closeFolder}
                alt="close-folder-icon"
                className={`absolute transition-all duration-[0.3s] ease-in-out transform ${
                  dragging ? "opacity-0" : " h-full"
                }`}
              />
              <img
                src={openFolder}
                alt="close-folder-icon"
                className={`absolute transition-all duration-[0.3s] ease-in-out transform ${
                  dragging ? "h-full opacity-100" : "opacity-0"
                }`}
              />
            </div>
            <div className="text-center text-[#bfbcd1] font-medium lg:text-lg text-sm">
              Drag your documents, photos or videos here and start uploading...
            </div>
          </div>

          {/* or divider */}
          <div className="flex items-center w-full text-[#71757b]">
            <div className="border-t w-[100%] rounded-full border-[#71757b]"></div>
            <p className="mx-2">OR</p>
            <div className="border-t w-[100%] rounded-full border-[#71757b]"></div>
          </div>

          {/* browse from device */}
          <>
            <input
              type="file"
              hidden
              id="browse-file-input"
              onChange={handleFileChange}
            />
            <label
              htmlFor="browse-file-input"
              className="bg-[#4154F6] lg:px-6 py-2 px-3 font-semibold lg:text-lg text-base rounded-lg hover:cursor-pointer hover:bg-[#1e2db6] duration-300"
            >
              Browse files
            </label>
          </>
        </div>
      </div>

      {/* Below Drag n Drop */}
      <div className="w-full text-[#181A20]">
        {downloadPageURL && (
          <div className="bg-[#181A20]/95 mx-auto max-w-[600px] flex gap-2 lg:p-2 pl-4 pr-2 py-1 rounded-lg items-stretch">
            <input
              type="text"
              className="flex-grow outline-none text-[#bfbcd1] font-medium bg-transparent"
              defaultValue={downloadPageURL}
              ref={URLRef}
            />
            <button
              className="h-10 text-white bg-[#4154F6] hover:bg-[#1e2db6] p-1 rounded-lg"
              onClick={() => {
                URLRef.current.select();
                navigator.clipboard.writeText(downloadPageURL);
              }}
            >
              <TbCopy className="h-full w-auto" />
            </button>
          </div>
        )}
        {selectedFile && uploadProgress == 0 && (
          <>
            <div className="lg:flex gap-2 px-3 py-4 rounded-xl bg-[#E8F3FF] hidden">
              <div className="flex-grow flex items-center gap-2">
                {/* file icon */}
                <TbFileSmile className="h-12 w-auto" />
                {/* file details */}
                <div className="flex-grow space-y-1">
                  <div className="flex gap-1 items-center">
                    <p className="font-semibold text-lg">Filename:</p>
                    <p className="truncate max-w-[380px]">
                      {selectedFile.fileName}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <p className="font-semibold text-lg">
                      File Size:{" "}
                      <span className="font-normal text-base">
                        {formatSize(selectedFile.fileSize)}
                      </span>
                    </p>
                    <p className="font-semibold text-lg">
                      File Type:{" "}
                      <span className="font-normal text-base">
                        {selectedFile.fileExt}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedFile("")}
                  className="text-white font-semibold text-sm rounded-lg hover:cursor-pointer bg-[#f00] hover:bg-[#a70303] duration-300 px-3 py-3 flex flex-col items-center"
                >
                  <TbTrashX className="font-bold text-2xl" />
                  <p>Remove</p>
                </button>
                <button
                  onClick={handleFileUpload}
                  className="text-white font-semibold text-sm rounded-lg hover:cursor-pointer bg-[#4154F6] hover:bg-[#1e2db6] duration-300 px-3 py-3 flex flex-col items-center"
                >
                  <TbCloudUpload className="font-bold text-2xl" />
                  <p>Upload</p>
                </button>
              </div>
            </div>
            <button
              onClick={handleFileUpload}
              className="lg:hidden text-white font-semibold text-lg rounded-lg hover:cursor-pointer bg-[#4154F6] hover:bg-[#1e2db6] duration-300 px-3 py-3 flex gap-1 items-center mx-auto"
            >
              <TbCloudUpload className="font-bold text-2xl" />
              <p>Upload</p>
            </button>
          </>
        )}
        {uploadProgress != 0 && (
          <div className="border bg-[#181A20]/50 border-[#181A20]/50 rounded-xl overflow-hidden mx-auto lg:w-[650px] w-[90%] relative">
            <div
              style={{ width: `${uploadProgress}%` }}
              className={`h-10 bg-[#4154F6]`}
            ></div>
            <p className="flex items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white font-medium text-lg">
              {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default UploadPage;
