import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TbCloudDownload } from "react-icons/tb";
import { TbHome } from "react-icons/tb";

import { getDownloadURL } from "../services";
import downloadImage from "../assets/download.svg";
import notFoundImage from "../assets/not-found.svg";
import { formatSize } from "../utils";

const DownloadPage = () => {
  const { fileId } = useParams();
  const [downloadFile, setDownloadFile] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Quick Link | Download";
    return () => (document.title = "Quick Link");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { url, filename, fileSize } = await getDownloadURL({ fileId });
        setDownloadFile({ url, filename, fileSize: formatSize(fileSize) });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fileId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen lg:max-w-[700px] max-w-full p-2 mx-auto gap-2 text-white">
      {downloadFile || loading ? (
        <div className="bg-[#181A20]/50 lg:p-10 p-6 rounded-3xl">
          <div className="flex flex-col items-center text-[#bfbcd1] bg-[#181A20] lg:py-5 lg:px-20 px-6 py-4 rounded-3xl max-w-[550px]">
            <img
              src={downloadImage}
              alt=""
              className="h-[200px] lg:mb-4 mb-6"
            />
            {loading ? (
              <div className="flex flex-col items-center">
                <p className="text-white font-medium text-lg">Loading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-white font-medium text-lg">
                  Your file is ready to download.
                </p>
                <p className="text-xs mt-2">{downloadFile?.filename}</p>
                <p className="text-xs mt-1">Size: {downloadFile?.fileSize}</p>
                <a
                  href={downloadFile?.url}
                  className="flex items-center gap-2 mt-6 bg-[#4154F6] px-6 py-2 font-semibold rounded-lg hover:cursor-pointer hover:bg-[#1e2db6] duration-300 text-white"
                >
                  <TbCloudDownload className="h-auto w-5" />
                  <p>Start Download</p>
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-[#181A20]/50 lg:p-10 p-6 rounded-3xl">
          <div className="flex flex-col items-center text-[#bfbcd1] bg-[#181A20] lg:py-5 lg:px-20 px-6 py-4 rounded-3xl max-w-[550px]">
            <img
              src={notFoundImage}
              alt=""
              className="h-[200px] lg:mb-4 mb-6"
            />
            <p className="text-white font-medium text-lg text-center">
              Oops! File Not Found
            </p>
            <Link
              to={"/"}
              className="flex items-center gap-2 mt-4 bg-[#4154F6] px-6 py-2 font-semibold rounded-lg hover:cursor-pointer hover:bg-[#1e2db6] duration-300 text-white"
            >
              <TbHome className="h-auto w-5" />
              <p>Go To Home</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default DownloadPage;
