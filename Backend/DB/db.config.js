
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Test database connection on startup
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    
    // Test a simple query
    const clubCount = await prisma.club.count();
    console.log(`📊 Database contains ${clubCount} clubs`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

// Connect to database
connectDB().catch((error) => {
  console.error("Fatal database error:", error);
  process.exit(1);
});

export default prisma;

