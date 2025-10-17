export interface Tablet {
  id: string;
  name: string;
  genericName: string;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// For Vercel deployment, we use the relative path
// Vercel automatically routes /api/* to serverless functions
const API_BASE = '/api/tablets';

export async function getTablets(): Promise<Tablet[]> {
  try {
    const res = await fetch(API_BASE, { credentials: 'include' });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch tablets. Status: ${res.status}, Response: ${errorText}`);
      throw new Error(`Failed to fetch tablets. Status: ${res.status}`);
    }
    const data = await res.json();
    return data.tablets as Tablet[];
  } catch (error) {
    console.error('Error fetching tablets:', error);
    throw error;
  }
}

export async function createTablet(payload: Omit<Tablet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tablet> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Create tablet error:', errorText);
    throw new Error('Failed to create tablet');
  }
  const data = await res.json();
  return data.tablet as Tablet;
}

export async function updateTablet(id: string, payload: Partial<Omit<Tablet, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Tablet> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update tablet');
  const data = await res.json();
  return data.tablet as Tablet;
}

export async function deleteTablet(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok && res.status !== 204) throw new Error('Failed to delete tablet');
}