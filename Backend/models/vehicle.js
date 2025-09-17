import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicleName: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    modelYear: {
        type: Number,
        required: true
    },
    lastServiceDate: {
        type: Date
    },
    nextServiceDate: {
        type: Date
    },
    serviceHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }
    ]
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
