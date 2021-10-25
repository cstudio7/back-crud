import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import fileUploadController from '../controllers/fileUpload.controller';
import upload from '../middlewares/fileUpload/upload';

const router = express.Router();

router.post(
  '/',
  upload.single('avatar'),
  fileUploadController.uploadAvatar
);


export default router;
