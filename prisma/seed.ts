import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  
  // Seed Employees
  const emp1 = await prisma.employee.create({
    data: { name: 'Alice Johnson', role: 'Frontend Developer', department: 'Engineering', status: 'Active' },
  });
  const emp2 = await prisma.employee.create({
    data: { name: 'Bob Smith', role: 'Product Manager', department: 'Product', status: 'On Leave' },
  });
  
  // Seed Projects
  const proj1 = await prisma.project.create({
    data: { title: 'ERP Migration', description: 'Migrating legacy data to the new VAYRAN ERP system.', status: 'In Progress', progress: 65 },
  });
  
  // Seed Invoices
  const inv1 = await prisma.invoice.create({
    data: { invoiceId: 'INV-2024-001', client: 'Acme Corp', amount: 12500.00, status: 'Paid' },
  });
  
  // Seed Leads
  const lead1 = await prisma.lead.create({
    data: { name: 'TechFlow Systems', company: 'TechFlow', value: 50000.00, status: 'New' },
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
