import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const brands = [
    { id: 1, brand: "Audi" },
    { id: 2, brand: "BMW" },
    { id: 3, brand: "Citroen" },
    { id: 4, brand: "Ford" },
    { id: 5, brand: "Merc" },
    { id: 6, brand: "Opel" },
];

const fuelTypes = [
    { id: 1, brand: "petrol" },
    { id: 2, brand: "diesel" },
    { id: 3, brand: "electric" },
]

export const Admin = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [doors, setDoors] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            brand,
            model,
            year,
            price,
            fuelType,
            doors,
            description,
            imageUrl,
        };

        console.log("handle submit: " + formData.brand);
        if (isEdit) {
            // edit existing
            console.log("edit resource");

        } else {
            // add new
            console.log("add new resource");
        }
    };

    // get data for edit if we are editing, if we are adding this is empty/null
    const location = useLocation();
    const data = location.state;

    // set data if we are editing
    useEffect(() => {
        if (data) {
            setIsEdit(true);
        } else {
            return;
        }

        if (data.brand) {
            //TODO
        }
        if (data.model) {
            setModel(data.model);
        }
        if (data.year) {
            setYear(data.year);
        }
        if (data.price) {
            setPrice(data.price);
        }
        if (data.fuel_type) {
            //TODO
        }
        if (data.doors) {
            setDoors(data.doors);
        }
        if (data.description) {
            setDescription(data.description);
        }
        if (data.image_url) {
            setImageUrl(data.image_url);
        }
    });

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <select id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="">Select a brand</option>
                        {brands.map((item) => (
                            <option key={item.id} value={item.id} id={item.id}>
                                {item.brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input type="number" id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="fuelType">Fuel Type</label>
                    <select id="fuelType" name="fuelType" value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                        <option value="">Select a fuel type</option>
                        {fuelTypes.map((item) => (
                            <option key={item.id} value={item.id} id={item.id}>
                                {item.brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="doors">Doors</label>
                    <input type="number" id="doors" name="doors" value={doors} onChange={(e) => setDoors(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <button className="text-button" type="submit">Submit</button>
            </form>
        </div>
    );
}