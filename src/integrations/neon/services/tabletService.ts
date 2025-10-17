import { prisma } from '../client.ts';

export interface Tablet {
  id: string;
  name: string;
  genericName: string;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Get all tablets
export const getTablets = async (): Promise<Tablet[]> => {
  try {
    const tablets = await prisma.tablet.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return tablets.map((tablet) => ({
      ...tablet,
      createdAt: tablet.createdAt.toISOString(),
      updatedAt: tablet.updatedAt.toISOString()
    }));
  } catch (error) {
    console.error('Error fetching tablets:', error);
    throw new Error('Failed to fetch tablets');
  }
};

// ✅ Get a single tablet by ID
export const getTabletById = async (id: string): Promise<Tablet | null> => {
  try {
    const tablet = await prisma.tablet.findUnique({ where: { id } });
    if (!tablet) return null;

    return {
      ...tablet,
      createdAt: tablet.createdAt.toISOString(),
      updatedAt: tablet.updatedAt.toISOString()
    };
  } catch (error) {
    console.error(`Error fetching tablet with id ${id}:`, error);
    throw new Error('Failed to fetch tablet');
  }
};

// ✅ Create a new tablet
export const createTablet = async (
  data: Omit<Tablet, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Tablet> => {
  try {
    const tabletData = {
      ...data,
      price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
    };

    const tablet = await prisma.tablet.create({ data: tabletData });

    return {
      ...tablet,
      createdAt: tablet.createdAt.toISOString(),
      updatedAt: tablet.updatedAt.toISOString()
    };
  } catch (error) {
    console.error('Error creating tablet:', error);
    throw new Error('Failed to create tablet: ' + (error as Error).message);
  }
};

// ✅ Update a tablet
export const updateTablet = async (
  id: string,
  data: Partial<Omit<Tablet, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Tablet> => {
  try {
    const tablet = await prisma.tablet.update({
      where: { id },
      data
    });

    return {
      ...tablet,
      createdAt: tablet.createdAt.toISOString(),
      updatedAt: tablet.updatedAt.toISOString()
    };
  } catch (error) {
    console.error(`Error updating tablet with id ${id}:`, error);
    throw new Error('Failed to update tablet');
  }
};

// ✅ Delete a tablet
export const deleteTablet = async (id: string): Promise<void> => {
  try {
    await prisma.tablet.delete({ where: { id } });
  } catch (error) {
    console.error(`Error deleting tablet with id ${id}:`, error);
    throw new Error('Failed to delete tablet');
  }
};
