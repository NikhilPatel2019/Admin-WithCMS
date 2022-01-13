const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataController');
const validator = require('../middlewares/dataValidation');

//GET data by Model Name
router.get('/:modelname', controller.getDataByModel);

//POST data to specified model
router.post('/post/:modelname', validator.validateData, controller.postData);

//PUT update data of specific model
router.put('/update/:modelName/:id', validator.validateUpdatingData, controller.updateData);
// router.put('/update/:modelName/:id', validator.validateUpdatingData);

//DELETE data of a Specific Model 
router.delete('/delete/:id', controller.deleteData);

module.exports = router;