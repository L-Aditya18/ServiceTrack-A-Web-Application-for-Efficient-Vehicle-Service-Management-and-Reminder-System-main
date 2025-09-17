import cron from 'node-cron';
import Vehicle from '../models/vehicle.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Cron Job - Run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
    console.log('🔔 Running Reminder System...');

    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    try {
        const vehicles = await Vehicle.find({
            nextServiceDate: { 
                $gte: today,
                $lte: nextWeek
            }
        }).populate('userId', 'email');

        if (vehicles.length === 0) {
            console.log('✅ No reminders needed today.');
            return;
        }

        const emailPromises = vehicles.map(vehicle =>
            transporter.sendMail({
                from: `"ServiceTrack" <${process.env.EMAIL_USER}>`,
                to: vehicle.userId.email,
                subject: '🚗 Vehicle Service Reminder - Stay on Track!',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                        <h2 style="color: #4CAF50;">🚨 Service Reminder Alert!</h2>
                        <p>Your vehicle <strong>${vehicle.vehicleName}</strong> 
                        (Registration No: <strong>${vehicle.registrationNumber}</strong>) is due for service on:</p>

                        <h3 style="color: #2196F3;">${vehicle.nextServiceDate.toDateString()}</h3>

                        <p>Click the link below to book your service appointment:</p>

                        <a href="http://localhost:5001/book-service/${vehicle._id}" 
                        style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; 
                                color: #fff; text-decoration: none; border-radius: 5px;">
                            Book Service Appointment
                        </a>

                        <hr style="border: 0; height: 1px; background-color: #ddd;">
                        <p style="font-size: 12px; color: #aaa;">
                            © 2025 ServiceTrack. All rights reserved.
                        </p>
                    </div>
                `

            })
        );

        await Promise.all(emailPromises);

        console.log('✅ Reminders sent successfully!');
    } catch (error) {
        console.error('❌ Error sending reminders:', error.message);
    }
});
