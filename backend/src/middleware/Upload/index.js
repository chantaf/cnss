const multer = require('multer');


//document
const multerStoragefile = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/file');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "--" + file.originalname)
    }
  })

  //type file 
  const multerFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('pdf')) {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
  };


//document
const uploadfile = multer({
  storage: multerStoragefile,
  fileFilter: multerFilter
});

const uploadpdf = uploadfile.single('file')

module.exports = {
  uploadpdf,
}

 
