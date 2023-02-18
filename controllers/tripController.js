
const errorUtils = require("../utils/errorUtils")
const User = require("../models/User")
const tripService = require("../services/tripService");

exports.getSharedTripsView = async (req, res) => {

    try {
        const trips = await tripService.getAll();
        res.render("trip/shared-trips", { trips })
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

        const trip = await tripService.create(data, userId)

        const user = await User.findById(userId)
        user.trips.push(trip._id); 
         await User.findByIdAndUpdate(userId, {...user});

        res.redirect("/shared-trips") // <---- check redirect
    } catch (err) {
        return errorUtils.errorResponse(res, "trip/create", err, 404);
    }
};

exports.getEditView = async (req, res) => {
    try {
        const id = req.params.id;
        const trip = await tripService.getById(id);
        const isCreator = trip.creator == req.user?.userId
        if (!isCreator) {
            res.redirect("/")
        }
        res.render("trip/edit", { trip })
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
};

exports.postEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const trip = await tripService.getById(id);
        const isCreator = trip.creator == req.user?.userId
        if (!isCreator) {
            res.redirect("/")
        }

        await tripService.update(data, id);

        res.redirect(`/details/${id}`) // <---- check redirect
    } catch (err) {
        return errorUtils.errorResponse(res, "trip/edit", err, 404);
    }
};

exports.getDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const trip = await tripService.getById(id);
        const isCreator = trip.creator == req.user?.userId
        if (!isCreator) {
            res.redirect("/")
        }
        await tripService.delete(id);
        res.redirect("/shared-trips")
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
};

exports.getDetailsView = async (req, res) => {
    try {

        const id = req.params.id
      
        const trip = await tripService.getByIdAndPop(id);

        const isAuth = req.user?.userId
      
        const isCreator = trip.creator._id == req.user?.userId
        
        const isBuddie = trip.buddies.some(x => x._id == req.user?.userId)
     
        const buddiesCollection = trip.buddies.map(b => b.email)
    
        const buddies = buddiesCollection.join(", ")
        
        let seats = trip.seats
        if (seats == 0) {
            seats = undefined
        }
        console.log("seats: " + seats); //<-- delete
        res.render("trip/details", { trip, isAuth, isCreator, isBuddie, buddies, seats })

    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
}


exports.getJoin = async (req, res) => {

    try {
        const id = req.params.id
        const userId = req.user.userId

        const trip = await tripService.getById(id);
        
        // const user = await User.findById(userId)

        trip.buddies.push(userId); //<---- change name and wishlist
        trip.seats -= 1;
        // user.trips.push(id); //<---- change name and books
        

        await tripService.update(trip, id); //<---- change names and wishlist
        // await User.findByIdAndUpdate(userId, {...user}); //<---- change names and wishlist
        res.redirect(`/details/${id}`);

    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }

}

exports.getProfileView = async (req, res) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId);
        const gender = user.gender
        console.log("userId: " + userId);
        const trips = await tripService.getTripsForProfile(userId)
        trips.forEach(t=> console.log(t));
    
        const count = trips.length
        console.log("count: " + count);

        res.render("trip/profile", {trips, count,gender})
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
}