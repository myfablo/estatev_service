const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  };
  
  const notFoundHandler = (req, res, next) => {
    res.status(404).json({ success: false, message: "API Not Found" });
  };
  
  module.exports = { errorHandler, notFoundHandler };
  