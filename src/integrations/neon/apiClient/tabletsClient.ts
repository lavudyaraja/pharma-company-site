export interface Tablet {
  id: string;
  name: string;
  genericName: string;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE = '/api/tablets';

export async function getTablets(): Promise<Tablet[]> {
  const res = await fetch(API_BASE, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch tablets');
  const data = await res.json();
  return data.tablets as Tablet[];
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