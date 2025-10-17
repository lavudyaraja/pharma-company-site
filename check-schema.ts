import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSchema() {
  try {
    // Try to get the column information
    const columns: any[] = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'Tablet' 
      ORDER BY ordinal_position;
    `;
    
    console.log('Current Tablet table schema:');
    console.table(columns);
    
    // Try to get a sample record
    const sample = await prisma.tablet.findMany({
      take: 1
    });
    
    console.log('Sample record:');
    console.log(sample);
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();