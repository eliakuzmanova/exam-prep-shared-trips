const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const tripController = require("../controllers/tripController")
const {isAuth} = require("../middlewares/authMiddleware")



router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

router.get("/shared-trips", tripController.getSharedTripsView)

router.get("/create" , isAuth, tripController.getCreateView) 
router.post("/create", isAuth, tripController.postCreate)

router.get("/delete/:id", isAuth, tripController.getDelete)

router.get("/edit/:id", isAuth, tripController.getEditView)
router.post("/edit/:id", isAuth, tripController.postEdit)

router.get("/details/:id", tripController.getDetailsView)

// router.get("/something!!!/:id", isAuth, tripController.!!!) <----checkname 
router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
router.post("/login", authController.postLogin);

router.get("/logout", isAuth, authController.getLogout);

module.exports = router