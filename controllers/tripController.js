const tripService = require("../services/tripService");

// exports.getCatalogView = async (req, res) => {

//     try{
//       const trips = await tripService.getAll();
//       res.render("trip/catalog", {trips})
//     } catch (err) {

//     return errorUtils.errorResponse(res, "home/404", err, 404);

//    };
// }

// exports.getCreateView = (req, res) => {
//     try {
//         res.render("trip/create")
//     } catch (err) {
//         return errorUtils.errorResponse(res, "home/404", err, 404);

//     }
// };

// exports.postCreate = async (req, res) => {
//     try {
//         const data = req.body;
//         const userId = req.user.userId; //<----- check userId

//         await tripService.create(data, userId)

//         res.redirect("/catalog") // <---- check redirect
//     } catch (err) {
//         return errorUtils.errorResponse(res, "trip/create", err, 404);
//     }
// };

// exports.getEditView = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const trip = await tripService.getById(id);
        
//         res.render("trip/edit", {trip})
//     } catch (err) {
//         return errorUtils.errorResponse(res, "home/404", err, 404);
//     }
// };

// exports.postEdit = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = req.body;

//         await tripService.update(data, id);

//         res.redirect(`/details/${id}`) // <---- check redirect
//     } catch (err) {
//         return errorUtils.errorResponse(res, "trip/edit", err, 404);  
//     }
// };

// exports.getDelete = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await tripService.delete(id);
//     } catch (err) {
//         return errorUtils.errorResponse(res, "home/404", err, 404);
//     }
// };

// exports.getDetailsView = async (req, res) => {
//     try {
        
//         const id = req.params.id
   
//         const trip = await bookService.getById(id);

//         const isAuth = req.user?.userId
       
//         const isOwner = book.owner == req.user?.userId
//         const isBuyer = book.wishList.some(x => x._id == req.user?.userId) //<---- change name and wishlist
        

//         res.render("trip/details", {trip, isAuth, isOwner, isBuyer}) // <--- change buyer

//     } catch (err) {
//         return errorUtils.errorResponse(res, "home/404", err, 404);
//     }
// } 


// exports.!!!! = async (req, res) => {
    
//     try {
//         const id = req.params.id
//         const userId = req.user.userId


//         const user = await userService.getUser(userId)
//         const trip = await bookService.getById(id);
       
//         book.wishList.push(userId); //<---- change name and wishlist
//         user.books.push(bookId); //<---- change name and books
      
//         await bookService.update(); //<---- change names and wishlist
//         await userService.findByIdAndUpdate(); //<---- change names and wishlist
//         res.redirect(`/details/${id}`);

//     } catch (err) {
//         return errorUtils.errorResponse(res, "home/404", err, 404);
//     }
    
// }