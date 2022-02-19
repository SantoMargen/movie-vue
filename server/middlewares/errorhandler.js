const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "UserNotFound":
      res.status(401).json({ message: "Invalid Email/Password" });
      break;
    case "NotFound id":
    case "MovieNotFound":
    case "ActiveMovieNotFound":
      res.status(404).json({ message: "Movie Not Found" });
      break;
    case "BookmarkNotFound":
    case "NoFoundInData":
      res.status(404).json({ message: "Bookmark Not Found" });
      break;
    case "Empty":
      res.status(400).json({ message: "Data can't be empty" });
      break;
    case "Unauthenticated":
      res.status(401).json({ message: "please login first" });
      break;
    case "ImageSIzeToBig":
      res.status(400).json({ message: "Image size Max 255 KB" });
      break;
    case "InvalidFormat":
      res.status(400).json({ message: "Only jpeg, jpg, png format to Upload" });
      break;
    case "Authentication":
      res.status(401).json({ message: "invalid Email/Password" });
      break;
    case "Can'tAccess":
      res.status(403).json({ message: "You can't acccess" });
      break;
    case "AdminAccsess":
      res.status(403).json({ message: "Only 'Admin' can acccess" });
      break;
    case "NotYour's":
      res.status(403).json({ message: "Can't Access because not your's" });
      break;
    case "NoPermission":
      res.status(403).json({ message: "Sorry, Only 'Customer' can acccess" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Access Token" });
      break;
    default:
      res.status(500).json({ message: "internal server error" });
      break;
  }
};

module.exports = errorHandler;
