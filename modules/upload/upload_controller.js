const bcrypt = require('bcrypt');
const fileModel = require('../../DB/model/file_model.js');
const { flashKeys } = require('../../services/connect_flash.js');

const renderUpload = (req, res) => {
  const fileError = req.flash(flashKeys.fileError)[0];
  const fileDownloadLink = req.flash(flashKeys.fileDownloadLink)[0];
  const fileNotFound = req.flash(flashKeys.fileNotFound)[0];

  res.render('index', { fileError, fileDownloadLink, fileNotFound });
};

const upload = async (req, res) => {
  if (req.fileValidationError) {
    req.flash(flashKeys.fileError, true);
    res.redirect('/');
  } else {
    const fileData = {
      originalName: req.file.originalname,
      path: `${req.filePath}/${req.file.filename}`,
      size: req.file.size,
      type: req.file.mimetype,
    };

    if (
      req.body.password &&
      req.body.password.length > 0 &&
      req.body.password.length != null &&
      req.body.password.length != undefined &&
      req.body.password != ''
    ) {
      fileData.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    }

    const file = await fileModel.create(fileData);

    req.flash(flashKeys.fileDownloadLink, `${req.headers.origin}/download/${file.id}`);
    res.redirect('/');
  }
};

const renderDownload = (req, res) => {
  const passwordIncorrect = req.flash(flashKeys.passwordIncorrect)[0];
  const oldInputs = req.flash(flashKeys.oldInputs)[0];

  res.render('password', { passwordIncorrect, oldInputs });
};

const download = async (req, res) => {
  const file = await fileModel.findById(req.params.id);

  if (!file || file == null) {
    req.flash(flashKeys.fileNotFound, true);
    return res.redirect('/');
  }

  if (file?.password != null) {
    if (req.body.password == null) {
      return renderDownload(req, res);
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, file.password);

    if (!isPasswordCorrect) {
      req.flash(flashKeys.passwordIncorrect, true);
      req.flash(flashKeys.oldInputs, req.body);
      return renderDownload(req, res);
    }
  }

  req.flash(flashKeys.passwordIncorrect, false);
  req.flash(flashKeys.oldInputs, req.body);

  file.downloadCount += 1;
  await file.save();
  res.download(file.path, file.originalName);
};

module.exports = {
  renderUpload,
  upload,
  renderDownload,
  download,
};
