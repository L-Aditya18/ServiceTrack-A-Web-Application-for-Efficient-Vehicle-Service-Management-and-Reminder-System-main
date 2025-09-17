import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import './utils/cronJobs.js';  // Import the cron job file
import Vehicle from './models/vehicle.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS 
app.use(cors());


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Welcome to ServiceTrack API');
});

// Add auth routes
app.use('/api/auth', authRoutes);

// Add vehicle routes
app.use('/api/vehicles', vehicleRoutes);

// Add service routes
app.use('/api/services', serviceRoutes);

// Add reminder routes
app.use('/api/reminders', reminderRoutes);

// Book Service Route
app.get('/book-service/:vehicleId', async (req, res) => {
    const { vehicleId } = req.params;

    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).send('<h2>Vehicle not found</h2>');
        }

        res.send(`
            <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                <h2>Service Booking for ${vehicle.vehicleName}</h2>
                <p>Next Service Date: <strong>${vehicle.nextServiceDate.toDateString()}</strong></p>
                
                <form method="POST" action="http://localhost:5001/confirm-booking/${vehicleId}" style="margin-top: 20px;">
                    <label for="date">Select Date:</label>
                    <input type="date" id="date" name="date" required>
                    <br><br>
                    <button type="submit" style="background-color: #4CAF50; color: #fff; border: none; padding: 10px 20px; cursor: pointer;">
                        Confirm Booking
                    </button>
                </form>
            </div>
        `);
    } catch (error) {
        res.status(500).send('<h2>Server Error - Unable to load booking page.</h2>');
    }
});

// Confirm Booking Route
app.post('/confirm-booking/:vehicleId', async (req, res) => {
    const { vehicleId } = req.params;
    const { date } = req.body;

    try {
        const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { nextServiceDate: new Date(date) }, { new: true });

        if (!vehicle) {
            return res.status(404).send('<h2>Vehicle not found</h2>');
        }

        res.send(`
            <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                <h2>✅ Booking Confirmed!</h2>
                <p>Your vehicle <strong>${vehicle.vehicleName}</strong> has been scheduled for service on:</p>
                <h3>${vehicle.nextServiceDate.toDateString()}</h3>
            </div>
        `);
    } catch (error) {
        res.status(500).send('<h2>Server Error - Unable to confirm booking.</h2>');
    }
});





// Validate environment variables
if (!process.env.MONGODB_URL) {
    console.error('Error: MONGODB_URL is not defined in .env file');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch(err) {
        console.error('MongoDB connection failed', err.message);
        process.exit(1); // Exit process with failure
    }
};

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
})
