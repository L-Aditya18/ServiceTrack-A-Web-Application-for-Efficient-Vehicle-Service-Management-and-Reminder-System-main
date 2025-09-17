import Vehicle from '../models/vehicle.js';
import User from '../models/user.js';
// @desc    Add a new vehicle
// @route   POST /api/vehicles
// @access  Protected
export const addVehicle = async (req, res) => {
    const { vehicleName, registrationNumber, modelYear, lastServiceDate, nextServiceDate } = req.body;

    if (!vehicleName || !registrationNumber || !modelYear) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    try {
        const vehicle = await Vehicle.create({
            userId: req.user._id,
            vehicleName,
            registrationNumber,
            modelYear,
            lastServiceDate,
            nextServiceDate
        });
        // Push vehicle ID to the user's vehicles array
        await User.findByIdAndUpdate(req.user._id, {
            $push: { vehicles: vehicle._id }
        });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add vehicle.' });
    }
};

// @desc    Get all vehicles for a user
// @route   GET /api/vehicles
// @access  Protected
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ userId: req.user._id });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve vehicles.' });
    }
};

// @desc    Get a vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Protected
export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found.' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve vehicle.' });
    }
}


// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Protected
export const updateVehicle = async (req, res) => {
    const { vehicleName, registrationNumber, modelYear, lastServiceDate, nextServiceDate } = req.body;

    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found.' });
        }

        if (vehicle.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this vehicle.' });
        }

        vehicle.vehicleName = vehicleName || vehicle.vehicleName;
        vehicle.registrationNumber = registrationNumber || vehicle.registrationNumber;
        vehicle.modelYear = modelYear || vehicle.modelYear;
        vehicle.lastServiceDate = lastServiceDate || vehicle.lastServiceDate;
        vehicle.nextServiceDate = nextServiceDate || vehicle.nextServiceDate;

        const updatedVehicle = await vehicle.save();
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update vehicle.' });
    }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Protected
export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found.' });
        }

        if (vehicle.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this vehicle.' });
        }

        await vehicle.deleteOne();
        res.status(200).json({ message: 'Vehicle deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete vehicle.' });
    }
};
