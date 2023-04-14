const createCode = require('../codeCreator');

const router = require('express').Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const myStorage = multer({ storage: storage });

router.post("/uploadfile", myStorage.single("myfile"), (req, res) => {
  res.status(200).json({ status: "success" });
});


router.get('/generateCode', (req, res) => {
    createCode((filename) => {
        res.json({filename});
    })
})

router.post('/generateCodeFromData', (req, res) => {
    const {dependencies, files, name} = req.body;
    createCode(files, name, (filename) => {
        res.json({filename});
    })
})



module.exports = router;