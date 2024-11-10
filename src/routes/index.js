const auth = require("./Auth.route");
const verifyLogin = require("../middlewares/verifylogin.middleware");
const articleRoute = require("./Article.route")
const articleTagRoute = require("./ArticleTag.route")
const bookingRoute = require("./Booking.route")
const carouselRoute = require("./Carousel.route")
const coachRoute = require("./Coach.route")
const customerFeedBack = require("./CustomerFeedBack.route")
const serviceCategoriesRoute = require("./SerivceCategories.route")
const studioImageRoute = require("./StudioImage.route")
const packageRoute = require("./Package.route")
const packageInfoRoute = require("./PackageInfo.route")

const router = (app) => {
  app.use("/api/auth", auth); 
  app.use("/api/service-categories", serviceCategoriesRoute);
  app.use("/api/article", articleRoute);
  app.use("/api/article-tag", articleTagRoute);
  app.use("/api/booking", bookingRoute);
  app.use("/api/carousel", carouselRoute);
  app.use("/api/coach", coachRoute);
  app.use("/api/customer-feedback", customerFeedBack);
  app.use("/api/studio-image", studioImageRoute);
  app.use("/api/package", packageRoute);
  app.use("/api/package-info", packageInfoRoute);
};

module.exports = router;
