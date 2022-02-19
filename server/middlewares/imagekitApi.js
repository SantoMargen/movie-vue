const FormData = require("form-data");
const instanceImageKitApi = require("../apis/imagekit");

const uploadImageKit = async (req, res, next) => {
  try {

    if (req.file.size > 255000) {
      throw { name: 'ImageSIzeToBig' };
    }

    if (
      req.file.mimetype !== 'image/jpeg' &&
      req.file.mimetype !== 'image/jpg' &&
      req.file.mimetype !== 'image/png'
    ) {
      throw { name: 'InvalidFormat' };
    }

    const form = new FormData();
    const { originalname } = req.file;
    const imgUrl = req.file.buffer.toString('base64');

    form.append('fileName', originalname);
    form.append('file', imgUrl);
    const response = await instanceImageKitApi({
      url: '/files/upload',
      method: 'POST',
        data: form,
        headers: { ...form.getHeaders() }
      });

      req.body.imgUrl = response.data.url;
    next()
  } catch (err) {
    // console.log('dari imagekit',err);
    next(err)
  }
};

module.exports = uploadImageKit;
