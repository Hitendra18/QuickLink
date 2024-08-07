import axios from "axios";
// import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const getUploadURL = async ({ fileSize, fileExt }) => {
  try {
    const { data } = await axiosInstance.post("/api/upload-file", {
      fileSize,
      fileExt,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDownloadURL = async ({ fileId }) => {
  try {
    console.log("inside getAccessURL", `/api/get-file/${fileId}`);
    const { data } = await axiosInstance.get(`/api/get-file/${fileId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadToAWS = async ({ uploadURL, file, type, onUploadProgress }) => {
  try {
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: uploadURL,
      data: file,
      onUploadProgress,
      headers: { 
        'Content-Type': type
      },
    };

    const response = await axios.request(config);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
