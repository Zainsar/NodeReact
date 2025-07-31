import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Categories from '../components/Categories';

const AddProduct = () => {

    let [Categories, setCategories] = useState([])

    const getcategories = async () => {
        let getCat = await axios.get("http://localhost:3000/getAllCategory");
        if (getCat.data) {
            console.log(getCat.data.myCategory)
            setCategories(getCat.data.myCategory)
        } else {
            console.log(getCat.data.error)
        }
    }

    let [Brands, setBrands] = useState([])

    const getBrands = async () => {
        let getBrands = await axios.get("http://localhost:3000/getAllBrands");
        if (getBrands.data) {
            console.log(getBrands.data.myBrands)
            setBrands(getBrands.data.myBrands)
        } else {
            console.log(getBrands.data.error)
        }
    }

    useEffect(() => {
        getcategories();
        getBrands();
    }, [])

    const addProduct = () => {

    }

    // return (
    //     <div className='container my-4'>
    //         <h1>Adding Product</h1>

    //         <form>
    //             <input type="text" className='form-control my-2' id="title" placeholder='Enter Title' />
    //             <input type="text" className='form-control my-2' id="desc" placeholder='Enter description' />
    //             <input type="text" className='form-control my-2' id="price" placeholder='Enter price' />
    //             <input type="text" className='form-control my-2' id="rating" placeholder='Enter rating' />
    //             <input type="text" className='form-control my-2' id="disc" placeholder='Enter discount percentage' />
    //             <input type="text" className='form-control my-2' id="stock" placeholder='Enter stock' />
    //             <select className='form-control my-2' id="category">
    //                 <option value="" selected disabled>choose Category</option>
    //                 {
    //                     Categories?.map((arr, i) => {
    //                         return (
    //                             <option key={i} value={arr?._id} >{arr?.title}</option>
    //                         )
    //                     })
    //                 }
    //             </select>
    //             <input type="text" className='form-control my-2' id="brand" placeholder='Enter brand' />
    //             <input type="text" className='form-control my-2' id="images" placeholder='Enter images' />

    //             <button className='btn btn-danger' onClick={addProduct}>Add Product</button>
    //         </form>
    //     </div>
    // );

    return (
        <div className="container my-5" style={{ maxWidth: '600px' }}>
            <h1 className="mb-4 text-center" style={{ color: '#007bff' }}>
                Add New Product
            </h1>

            <form>
                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-semibold">
                        Product Title
                    </label>
                    <input
                        type="text"
                        className="form-control rounded shadow-sm"
                        id="title"
                        placeholder="Enter product title"
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label fw-semibold">
                        Description
                    </label>
                    <textarea
                        className="form-control rounded shadow-sm"
                        id="desc"
                        rows={3}
                        placeholder="Enter product description"
                    ></textarea>
                </div>

                {/* Price & Rating side by side */}
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="price" className="form-label fw-semibold">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control rounded shadow-sm"
                            id="price"
                            placeholder="Enter price"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="rating" className="form-label fw-semibold">
                            Rating
                        </label>
                        <input
                            type="number"
                            className="form-control rounded shadow-sm"
                            id="rating"
                            placeholder="Enter rating (0-5)"
                            min="0"
                            max="5"
                            step="0.1"
                        />
                    </div>
                </div>

                {/* Discount & Stock side by side */}
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="disc" className="form-label fw-semibold">
                            Discount Percentage
                        </label>
                        <input
                            type="number"
                            className="form-control rounded shadow-sm"
                            id="disc"
                            placeholder="Enter discount %"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="stock" className="form-label fw-semibold">
                            Stock
                        </label>
                        <input
                            type="number"
                            className="form-control rounded shadow-sm"
                            id="stock"
                            placeholder="Enter stock quantity"
                            min="0"
                            step="1"
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                    <label htmlFor="category" className="form-label fw-semibold">
                        Category
                    </label>
                    <select
                        className="form-select rounded shadow-sm"
                        id="category"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Choose category
                        </option>
                        {Categories?.map((arr, i) => (
                            <option key={i} value={arr?._id}>
                                {arr?.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Brand */}
                {/* <div className="mb-3">
                    <label htmlFor="brand" className="form-label fw-semibold">
                        Brand
                    </label>
                    <input
                        type="text"
                        className="form-control rounded shadow-sm"
                        id="brand"
                        placeholder="Enter brand name"
                    />
                </div> */}
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label fw-semibold">
                        Brands
                    </label>
                    <select
                        className="form-select rounded shadow-sm"
                        id="brand"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Choose brand
                        </option>
                        {Brands?.map((arr, i) => (
                            <option key={i} value={arr?._id}>
                                {arr?.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Images */}
                <div className="mb-4">
                    <label htmlFor="images" className="form-label fw-semibold">
                        Images URLs (comma separated)
                    </label>
                    <input
                        type="text"
                        className="form-control rounded shadow-sm"
                        id="images"
                        placeholder="Enter image URLs"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold"
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </form>
        </div>
    );

};

export default AddProduct;
