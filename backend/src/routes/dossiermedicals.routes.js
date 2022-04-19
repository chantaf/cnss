const dossiermedical = require("../controller/dossiermedical.controller");
const express = require("express")
const {uploadpdf } = require('../middleware/Upload/index')
const router = express.Router();


//dossiermedical
router.get('/', dossiermedical.index);
router.post('/store',uploadpdf, dossiermedical.store);
router.delete('/:id', dossiermedical.deletedossiermedical);
// router.put('/:id', dossiermedical.update);



module.exports = router;