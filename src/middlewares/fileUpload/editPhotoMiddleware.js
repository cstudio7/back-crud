//
// import s3delete from "./delete";
// // var multiparty = require('multiparty');
//
// /**
//  * verify token class
//  */
// class verifyPhoto {
//
//   /**
//      * check request params
//      * @param {Object} req user request
//      * @param {Object} res user response
//      * @param {Object} next continue with request
//      * @returns {Object} user response
//      */
//
//   static async delete(req, res, next) {
//     var form = new multiparty.Form()
//     form.parse(req, (err, fields) => {
//       const formData = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//           Key: req.body.photoAwsKey
//       }
//       req = formData;
//       console.log(req.fields)
//       // return next()
//     })
//
//     // console.log(formData)
//     // const photoData = {
//     //   Bucket: process.env.AWS_BUCKET_NAME,
//     //   Key: req.body.photoAwsKey
//     // }
//     // await s3delete(photoData)
//   }
//
//
// }
// export default verifyPhoto;
