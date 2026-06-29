import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  
  // Seed Employees
  const emp1 = await prisma.employee.create({
    data: { name: 'Alice Johnson', jobTitle: 'Frontend Developer', status: 'Active' },
  });
  const emp2 = await prisma.employee.create({
    data: { name: 'Bob Smith', jobTitle: 'Product Manager', status: 'On Leave' },
  });
  
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
