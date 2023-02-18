const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const articleController = require("../controllers/articleController")
const {isAuth} = require("../middlewares/authMiddleware")



router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

// router.get("/catalog", articleController.getCatalogView) <----checkname if catalog 

// router.get("/create" , isAuth, articleController.getCreateView) 
// router.post("/create", isAuth, articleController.postCreate)

//router.get("/delete/:id", isAuth, articleController.getDelete)

// router.get("/edit/:id", isAuth, articleController.getEditView)
// router.post("/edit/:id", isAuth, articleController.postEdit)

// router.get("/details/:id", articleController.getDetailsView)

// router.get("/something!!!/:id", isAuth, articleController.!!!) <----checkname 
router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
router.post("/login", authController.postLogin);

router.get("/logout", isAuth, authController.getLogout);

module.exports = router