import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TextButton from "../components/buttons/text_button";
import { addVehicle, deleteVehicle, updateVehicle } from "../util/http";
import { Alert, Snackbar } from '@mui/material';

// TODO: get brands and fuel types from context
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
    const initialState = {
        brand: '',
        model: '',
        year: '',
        price: '',
        fuelType: '',
        doors: '',
        description: '',
        imageUrl: '',
    };

    const [formData, setFormData] = useState(initialState);

    // snackbar for action feedback
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); //prevent reload

        if (isEdit) {
            // edit existing
            const result = await updateVehicle(formData.id, formData);
            if (result) {
                setSnackbarOpen(true);
                setSnackbarMessage('Editing vehicle data successful');
            } else {
                setSnackbarOpen(true);
                setSnackbarMessage('Editing vehicle data failed');
            }

        } else {
            // add new
            console.log("add new resource");
            const result = await addVehicle(formData);
            if (result) {
                setSnackbarOpen(true);
                setSnackbarMessage('Adding vehicle successful');
            } else {
                setSnackbarOpen(true);
                setSnackbarMessage('Adding vehicle failed');
            }
        }
    };

    async function handleDelete() {
        console.log("delete resource");
        const result = await deleteVehicle(vid);
        if (result) {
            setSnackbarOpen(true);
            setSnackbarMessage('Deletion successful');
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage('Deleting vehicle failed');
        }
    }

    // get data for edit if we are editing, if we are adding this is empty/null
    const location = useLocation();
    const data = location.state;

    // set data if we are editing
    useEffect(() => {
        if (data) {
            setIsEdit(true);
            setFormData(data);
        } else {
            setFormData(initialState);
        }
    }, [data]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="container">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <select id="brand" name="brand" value={formData.brand} onChange={handleChange}>
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
                        <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fuelType">Fuel Type</label>
                        <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange}>
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
                        <input type="number" id="doors" name="doors" value={formData.doors} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
                        />
                    </div>

                    <button className="text-button" type="submit">Submit</button>

                </form>

                {/* show only if we are editing an already existing vehicle */}
                {isEdit && <TextButton label="delete" onClick={handleDelete} />}

                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    <Alert severity={snackbarMessage.includes('successful') ? 'success' : 'error'}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}