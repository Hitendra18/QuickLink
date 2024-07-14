const { randomUUID } = require("crypto");

const { putObjectURL, getObjectURL } = require("./config/s3");
const query = require("./config/db");
const queryString = require("./queries");

const getFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;

    const result = await query(queryString.GET_FILE_BY_ID, [fileId]);
    if (!result || result.rowCount == 0) {
      return res.status(404).json({ error: "File not found" });
    }
    const file = result.rows[0];
    const filename = `${file.id}.${file.file_ext}`;

    const url = await getObjectURL(filename);
    if (!url) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json({ url, filename, fileSize: file.file_size });
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (req, res) => {
  try {
    const { fileSize, contentType, fileExt } = req.body;

    if (!fileSize || !contentType || !fileExt) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const id = randomUUID();
    const filename = `${id}.${fileExt}`;

    const url = await putObjectURL(filename, contentType);
    if (!url) {
      return res.status(500).json({ error: "Couldn't generate url" });
    }

    await query(queryString.INSERT_FILE, [id, fileExt, fileSize]);

    res.status(200).json({ url, fileId: id });
  } catch (error) {
    console.log("ERROR:", error);
  }
};

module.exports = { getFile, uploadFile };
