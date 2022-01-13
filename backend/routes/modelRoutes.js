const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');
const validateModel = require('../middlewares/modelValidation');

//GET all models
router.get('/all', modelController.getAllModels);

//GET model by /:name
router.get('/:name', modelController.getModelByName);

//POST - Create Data Model
router.post('/createSchema', validateModel.checkModel, validateModel.validateFields, modelController.createSchema);
// router.post('/createSchema', validateModel.validateFields);

//PUT - Updating a Model by /:name
router.put('/updateSchema/:name',validateModel.validateFields, modelController.updateSchema);

//DELETE - delete model by /:id
router.delete('/deleteSchema/:id', modelController.deleteModel);



module.exports = router;