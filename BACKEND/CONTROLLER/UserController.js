const UserModel = require('../MODEL/UserModel');
const { tmdbAPI, TMDB_ENDPOINT } = require('../SERVICES/tmdb.services');

const createUser = async function(req, res){
    // Validate required fields
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({
            message: "Name, email, and password are required"
        });
    }
    try {
        const userObject = req.body;
        const user = await UserModel.create(userObject);
        res.status(201).json({ data: user });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getAllUsers = async function(req, res){
    try{
        const users = await UserModel.find();
        if(users.length !== 0){
            res.status(200).json({ data: users });
        }else{
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUserById = async function(req, res){
    try{
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if(user){
            res.status(200).json({ data: user });
        }else{
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteUserById = async function(req, res){
    try{
        let id = req.params.id;
        const user = await UserModel.findByIdAndDelete(id);
        if(user === null){
            res.status(404).json({
                staus:"success",
                message: "User not found"
            })
        } else{
            res.status(200).json({
                status: "success",
                message: "User deleted successfully",
                user: user
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

// Current User
const getCurrentUser = async function(req, res){
    try{
        const userId = req.userId;
        const { _id, name, email, createdAt, wishList, isPremium } = await UserModel.findById(userId);

        res.status(200).json({
            user:{_id,
            name,
            email,
            createdAt,
            wishList,
            isPremium
            },
            status: "success"
    })
    } catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

const getUserWishlist = async function(req, res){
    try{
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        res.status(200).json({
            status: "success",
            data: user.wishList
        })
    } catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const addToWishlist = async function(req, res){
    try{
        const userId = req.userId;
        const { id, media_type } = req.body;
        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        let postItem;
        if (media_type == "tv") {
            postItem = (await tmdbAPI.get(TMDB_ENDPOINT.tvShowDetails(id))).data;
          } else {
            postItem = (await tmdbAPI.get(TMDB_ENDPOINT.movieDetails(id))).data;
        }

        const wishlistItem = {
            poster_path: postItem.poster_path,
            name: postItem.title || postItem.name,
            id: String(postItem.id), // Ensure id is a string to match schema
            media_type: media_type,
        };

        // Check if item already exists in wishlist
        if(user.wishList.find((item) => item.id === String(id))){
            return res.status(400).json({
                message: "Item already in wishlist",
                status: "failed"
            }) 
        }

        await UserModel.findByIdAndUpdate(
            userId,
            {$push: {wishList: wishlistItem}},
            {new: true}
        );

        res.status(200).json({
            status: "success",
            message: "Added to wishlist"
        })
    } catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    getCurrentUser,
    addToWishlist,
    getUserWishlist,
    createUser,
    getAllUsers,
    getUserById,
    deleteUserById
}