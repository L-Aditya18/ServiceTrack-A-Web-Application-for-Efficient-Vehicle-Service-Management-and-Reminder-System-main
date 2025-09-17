import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    cost: {
        type: Number,
        required: true
    },
    serviceType: {
        type: String,
        enum: ['Oil Change', 'Tire Rotation', 'General Maintenance', 'Repair', 'Other'],
        required: true
    }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
