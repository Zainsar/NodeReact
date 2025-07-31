import Category from "../models/Category.mjs"

const getAllCategory = async (req, res) => {
    try {
        const Category = await Category.find();
        if (Category.length > 0) {
            res.status(200).json({ status: "success", msg: "Showing our Category!", myCategory: Category })
        } else {
            res.status(200).json({ status: "fail", msg: "No Category found", myCategory: Category })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", msg: error })
    }
}
// single Category details
const getCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const Category = await Category.findOne({ _id: id });
        if (Category) {
            res.json({ msg: "Category Found!", Category: Category })

        } else {
            res.status(404).json({ msg: "No Category found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

//adding a Category in db
// const addCategory = async (req, res) => {

//     try {
//         // let {title,description, price} = req.body
//         let newCategory = {
//             title: req.body.title,
//             description: req.body.description
//         }
//         const addCategory = await Category.insertOne(newCategory);
//         if (addCategory) {
//             res.json({ msg: "Category added successfully!", addedCategory: addCategory })

//         } else {
//             res.status(404).json({ msg: "Failed to add Category right now, try again" })
//         }
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

const addCategory = async (req, res) => {
    try {
        const categoriesArray = req.body;

        if (!Array.isArray(categoriesArray) || categoriesArray.length === 0) {
            return res.status(400).json({ msg: "Please provide an array of category objects." });
        }

        // Basic validation
        for (const category of categoriesArray) {
            if (!category.title || !category.description) {
                return res.status(400).json({ msg: "Each category must have a title and description." });
            }
        }

        // Insert many categories at once
        const result = await Category.insertMany(categoriesArray);

        if (result) {
            res.json({ msg: "Categories added successfully!", addedCategoriesCount: result.insertedCount, insertedIds: result.insertedIds });
        } else {
            res.status(500).json({ msg: "Failed to add Categories right now, try again" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



// delete Category
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const Category = await Category.deleteOne({ _id: id });
        if (Category) {
            res.json({ msg: "Category Deleted Successfully!", Category: Category }).status(200)

        } else {
            res.status(400).json({ msg: "Failed to delete Category" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


// edit Category

const editCategory = async (req, res) => {

    try {
        const id = req.params.id;
        let updatedCategory = {
            _id: id,
            title: req.body.title,
            description: req.body.description
        }
        const editCategory = await Category.updateOne({ _id: id }, updatedCategory);
        if (editCategory) {
            res.json({ msg: "Category edited successfully!", addedCategory: addCategory })

        } else {
            res.status(404).json({ msg: "Failed to edit Category right now, try again" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}




const controller = { getAllCategory, addCategory, getCategory, deleteCategory, editCategory }
export default controller