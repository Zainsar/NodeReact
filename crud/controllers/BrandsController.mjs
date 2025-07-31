import Brands from "../models/Brands.mjs"

const getAllBrands = async (req, res) => {
    try {
        const Brands = await Brands.find();
        if (Brands.length > 0) {
            res.status(200).json({ status: "success", msg: "Showing our Brands!", myBrands: Brands })
        } else {
            res.status(200).json({ status: "fail", msg: "No Brands found", myBrands: Brands })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", msg: error })
    }
}
// single Brands details
const getBrands = async (req, res) => {
    try {
        const id = req.params.id;
        const Brands = await Brands.findOne({ _id: id });
        if (Brands) {
            res.json({ msg: "Brands Found!", Brands: Brands })

        } else {
            res.status(404).json({ msg: "No Brands found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

//adding a Brands in db
// const addBrands = async (req, res) => {

//     try {
//         // let {title,description, price} = req.body
//         let newBrands = {
//             title: req.body.title,
//             description: req.body.description
//         }

//         const addBrands = await Brands.insertOne(newBrands);

//         if (addBrands) {
//             res.json({ msg: "Brands added successfully!", addedBrands: addBrands })

//         } else {
//             res.status(404).json({ msg: "Failed to add Brands right now, try again" })
//         }
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

const addBrands = async (req, res) => {
    try {
        // Expecting an array of brand objects in req.body
        const brandsArray = req.body.array;

        if (!Array.isArray(brandsArray) || brandsArray.length === 0) {
            return res.status(400).json({ msg: "Please provide an array of brand objects." });
        }

        // Validate that each brand object has required fields (optional, but recommended)
        for (const brand of brandsArray) {
            if (!brand.title || !brand.description) {
                return res.status(400).json({ msg: "Each brand must have a title and description." });
            }
        }

        // Insert many brands at once
        const result = await Brands.insertMany(brandsArray);

        if (result) {
            res.json({ msg: "Brands added successfully!", addedBrandsCount: result.insertedCount, insertedIds: result.insertedIds });
        } else {
            res.status(500).json({ msg: "Failed to add Brands right now, try again" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



// delete Brands
const deleteBrands = async (req, res) => {
    try {
        const id = req.params.id;
        const Brands = await Brands.deleteOne({ _id: id });
        if (Brands) {
            res.json({ msg: "Brands Deleted Successfully!", Brands: Brands }).status(200)

        } else {
            res.status(400).json({ msg: "Failed to delete Brands" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


// edit Brands

const editBrands = async (req, res) => {

    try {
        const id = req.params.id;
        let updatedBrands = {
            _id: id,
            title: req.body.title,
            description: req.body.description
        }
        const editBrands = await Brands.updateOne({ _id: id }, updatedBrands);
        if (editBrands) {
            res.json({ msg: "Brands edited successfully!", addedBrands: addBrands })

        } else {
            res.status(404).json({ msg: "Failed to edit Brands right now, try again" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}




const controller = { getAllBrands, addBrands, getBrands, deleteBrands, editBrands }
export default controller