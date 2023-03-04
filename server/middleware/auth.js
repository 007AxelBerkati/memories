// Function untuk authentication menggunakan JWT token
import jwt from 'jsonwebtoken';

// wants to like a post
// click the like button => auth middleware(next) =>like controller

const auth = async (req, res, next) => {
  try {
    // Mendapatkan token dari header
    const token = req.headers.authorization.split(' ')[1];

    // Memeriksa apabila token merupakan custom authorization atau tidak
    const isCustomAuth = token.length < 500;

    let decodedData;

    // Jika token merupakan custom authorization
    if (token && isCustomAuth) {
      // Menguji keaslian token
      decodedData = jwt.verify(token, 'test');

      // Menyimpan id user dalam request
      req.userId = decodedData?.id;
    } else {
      // jika bukan custom authorization
      // Mendecode data dari token
      decodedData = jwt.decode(token);

      // Menyimpan subject user dalam request
      req.userId = decodedData?.sub;
    }

    // Pindah ke middleware/endpoint selanjutnya
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
