const router = require('express').Router();
const { multerUpload, uploadFilePath, uploadFileValidation } = require('../../services/multer_upload.js');
const controller = require('./upload_controller.js');

// upload file
router
  .route('/')
  .get(controller.renderUpload) // render upload page
  .post(
    // upload file
    multerUpload(uploadFilePath.file, uploadFileValidation.file, 5 * 1024 * 1024).single('file'),
    controller.upload,
  );

// download file
router.route('/download/:id').get(controller.download).post(controller.download);

module.exports = router;
