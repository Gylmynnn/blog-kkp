import { db } from "./index"; 
import { users } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
    console.log("Seeding users...");
    // hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    await db.insert(users).values([
        {
            username: "admin",
            email: "admin@example.com",
            password: hashedPassword,
            isAdmin: true,
        },
        {
            username: "user1",
            email: "user1@example.com",
            password: hashedPassword,
        },
        {
            username: "user2",
            email: "user2@example.com",
            password: hashedPassword,
        },
    ]);
    console.log("✅ Seeding selesai");
}

seed().then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
