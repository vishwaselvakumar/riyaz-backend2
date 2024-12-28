// routes/serviceCardRoutes.js

const express = require('express');
const router = express.Router();

const serviceCardController = require('../controllers/serviceCardController');

const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory for storing the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set unique file name
  }
});

// Set up multer middleware
const upload = multer({ storage: storage });

router.post('/service-cards',upload.single('imageurl'),  serviceCardController.createServiceCard);
router.get('/servicecard/:id', serviceCardController.getCardById);
router.put('/servicecards/:id',upload.single('imageurl'), serviceCardController.updateServiceCard);

router.get('/service-cards/:id', serviceCardController.getServiceCard);

router.get('/service-cards', serviceCardController.getAllServiceCards);
router.delete('/delete/:id', serviceCardController.deleteServiceCard);


module.exports = router;
