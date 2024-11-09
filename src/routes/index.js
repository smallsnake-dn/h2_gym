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

const router = (app) => {
  app.use("/auth", auth); 
  app.use("/service-categories", serviceCategoriesRoute);
  app.use("/article", articleRoute);
  app.use("/article-tag", articleTagRoute);
  app.use("/booking", bookingRoute);
  app.use("/carousel", carouselRoute);
  app.use("/coach", coachRoute);
  app.use("/customer-feedback", customerFeedBack);
  app.use("/studio-image", studioImageRoute);
};

module.exports = router;
