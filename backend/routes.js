const router = require("express").Router();

const {getFile, uploadFile} = require("./controllers")

router.get("/get-file/:fileId", getFile);

router.post("/upload-file", uploadFile);

module.exports = router;
