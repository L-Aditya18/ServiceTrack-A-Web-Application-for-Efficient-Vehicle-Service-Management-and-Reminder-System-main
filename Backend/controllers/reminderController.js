import Vehicle from '../models/vehicle.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Error: EMAIL_USER or EMAIL_PASS is not defined in .env file');
    process.exit(1);
}

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS   // Your email password or app password
    }
});

const today = new Date();
const nextWeek = new Date(today); // Clone the 'today' date
nextWeek.setDate(today.getDate() + 7); // Now modify the cloned date
// @desc    Send reminders for upcoming service dates
// @route   GET /api/reminders
// @access  Protected
export const sendReminders = async (req, res) => {
    try {
        // Find vehicles with upcoming service dates in the next 7 days
        const vehicles = await Vehicle.find({
            userId: req.user._id, // Convert to ObjectId
            nextServiceDate: { // Find dates between today and next week
                $gte: today,
                $lte: nextWeek
            }
        });
        console.log(req.user._id);
        if (vehicles.length === 0) {
            return res.status(200).json({ message: 'No reminders needed this week.' });
        }

        // Send email reminders
        const emailPromises = vehicles.map(vehicle =>
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: req.user.email,
                subject: 'Vehicle Service Reminder',
                text: `Reminder: Your vehicle "${vehicle.vehicleName}" is due for service on ${vehicle.nextServiceDate.toDateString()}.`
            })
        );

        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Reminders sent successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send reminders.' });
    }
};
