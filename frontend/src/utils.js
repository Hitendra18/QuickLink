export const formatSize = (size) => {
  if (size < 1024) {
    return `${size} bytes`;
  }
  if (size < 1 * 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

export const validateFiles = (files) => {
  if (files.length == 0) return;
  if (files.length > 1) {
    console.log("multiple files are not supported");
    return false;
  }
  const file = files[0];
  const fileExt = file.name.split(".").pop();

  if (file.size > 100 * 1024 * 1024) {
    console.log("File must be smaller than 100MB");
    return false;
  }
  return {
    file,
    fileExt,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  };
};
