import { prisma } from '../../../../server/prismaClient.ts';

// Define a type for our response structure
type ApiResponse = {
  status: number;
  body: any;
};

// GET /api/tablets - Get all tablets
export async function getTabletsHandler(): Promise<ApiResponse> {
  try {
    const tablets = await prisma.tablet.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { status: 200, body: { tablets } };
  } catch (error: any) {
    console.error('API Error:', error);
    return { status: 500, body: { error: 'Internal Server Error', details: error.message } };
  }
}

// GET /api/tablets/:id - Get tablet by ID
export async function getTabletByIdHandler(id: string): Promise<ApiResponse> {
  try {
    if (!id) {
      return { status: 400, body: { error: 'Missing tablet ID' } };
    }

    const tablet = await prisma.tablet.findUnique({
      where: { id },
    });

    if (!tablet) {
      return { status: 404, body: { error: 'Tablet not found' } };
    }

    return { status: 200, body: { tablet } };
  } catch (error: any) {
    console.error('API Error:', error);
    return { status: 500, body: { error: 'Internal Server Error', details: error.message } };
  }
}

// POST /api/tablets - Create new tablet
export async function createTabletHandler(data: any): Promise<ApiResponse> {
  try {
    const { name, genericName, price, description } = data;

    if (!name || !genericName || price == null) {
      return { status: 400, body: { error: 'Missing required fields' } };
    }

    const tablet = await prisma.tablet.create({
      data: {
        name,
        genericName,
        price: parseFloat(price),
        description: description || '',
      },
    });

    return { status: 201, body: { tablet } };
  } catch (error: any) {
    console.error('API Error:', error);
    return { status: 500, body: { error: 'Internal Server Error', details: error.message } };
  }
}

// PUT /api/tablets/:id - Update existing tablet
export async function updateTabletHandler(id: string, data: any): Promise<ApiResponse> {
  try {
    if (!id) {
      return { status: 400, body: { error: 'Invalid tablet ID' } };
    }

    const { name, genericName, price, description } = data;

    const tablet = await prisma.tablet.update({
      where: { id },
      data: {
        name,
        genericName,
        price: price ? parseFloat(price) : undefined,
        description,
      },
    });

    return { status: 200, body: { tablet } };
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.code === 'P2025') {
      return { status: 404, body: { error: 'Tablet not found' } };
    }
    return { status: 500, body: { error: 'Internal Server Error', details: error.message } };
  }
}

// DELETE /api/tablets/:id - Delete tablet
export async function deleteTabletHandler(id: string): Promise<ApiResponse> {
  try {
    if (!id) {
      return { status: 400, body: { error: 'Invalid tablet ID' } };
    }

    await prisma.tablet.delete({ where: { id } });
    return { status: 204, body: {} };
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.code === 'P2025') {
      return { status: 404, body: { error: 'Tablet not found' } };
    }
    return { status: 500, body: { error: 'Internal Server Error', details: error.message } };
  }
}