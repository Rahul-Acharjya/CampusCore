import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { User } from '../models/index.js';

await connectDB();

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
    console.error(
        'Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (minimum 12 characters) in backend/.env'
    );
    process.exit(1);
}

const email = ADMIN_EMAIL.toLowerCase();
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

const exists = await User.findOne({ email });

if (exists) {
    exists.fullName = ADMIN_NAME;
    exists.passwordHash = passwordHash;
    exists.role = 'ADMIN';

    await exists.save();

    console.log(`Administrator updated: ${email}`);
} else {
    await User.create({
        fullName: ADMIN_NAME,
        email,
        passwordHash,
        role: 'ADMIN'
    });

    console.log(`Administrator created: ${email}`);
}

process.exit(0);