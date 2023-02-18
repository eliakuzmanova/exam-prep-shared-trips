
const errorUtils = require("../utils/errorUtils")

const tripService = require("../services/tripService");

exports.getSharedTripsView = async (req, res) => {

    try{
      const trips = await tripService.getAll();
      res.render("trip/shared-trips", {trips})
    } catch (err) {

    return errorUtils.errorResponse(res, "home/404", err, 404);

   };
}

exports.getCreateView = (req, res) => {
    try {
        res.render("trip/create")
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);

    }
};

exports.postCreate = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.userId; //<----- check userId

        await tripService.create(data, userId)

        res.redirect("/shared-trips") // <---- check redirect
    } catch (err) {
        return errorUtils.errorResponse(res, "trip/create", err, 404);
    }
};

exports.getEditView = async (req, res) => {
    try {
        const id = req.params.id;
        const trip = await tripService.getById(id);
        
        res.render("trip/edit", {trip})
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
};

exports.postEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await tripService.update(data, id);

        res.redirect(`/details/${id}`) // <---- check redirect
    } catch (err) {
        return errorUtils.errorResponse(res, "trip/edit", err, 404);  
    }
};

exports.getDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await tripService.delete(id);
        res.redirect("/shared-trips")
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
};

exports.getDetailsView = async (req, res) => {
    try {
        
        const id = req.params.id
        	console.log("id: " + id); //<-- delete
        const trip = await tripService.getByIdAndPop(id);
        console.log("trip: " + trip); //<-- delete
        const isAuth = req.user?.userId
        console.log("isAuth: " + isAuth); //<-- delete
        const isCreator = trip.creator._id == req.user?.userId
        console.log("isCreator: " + isCreator); //<-- delete
        const isBuddie = trip.buddies.some(x => x._id == req.user?.userId) 
        console.log("isBuddie: " + isBuddie); //<-- delete
        const buddiesCollection = trip.buddies.map(b => b.email)
        console.log("buddiesCollection:");  //<-- delete
        buddiesCollection.forEach(b => console.log(b)) //<-- delete
        const buddies = buddiesCollection.join(",")
        console.log("buddies: " + buddies); //<-- delete
        let seats = trip.seats
        if(seats == 0) {
            seats = undefined
        }
        console.log("seats: " + seats); //<-- delete
        res.render("trip/details", {trip, isAuth, isCreator, isBuddie, buddies, seats}) 

    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
} 


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