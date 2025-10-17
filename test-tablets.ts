import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testTablets() {
  try {
    console.log('Testing tablet fetch...');
    
    // Try to get all tablets
    const tablets = await prisma.tablet.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    console.log(`Found ${tablets.length} tablets`);
    console.log('First tablet:', tablets[0]);
    
    // Try to create a test tablet
    const newTablet = await prisma.tablet.create({
      data: {
        name: 'Test Tablet',
        genericName: 'Test Generic',
        price: 10.99,
        description: 'Test description'
      }
    });
    
    console.log('Created test tablet:', newTablet);
    
    // Clean up - delete the test tablet
    await prisma.tablet.delete({
      where: { id: newTablet.id }
    });
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Error testing tablets:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testTablets();