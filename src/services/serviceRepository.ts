import { CollectionReference } from 'firebase-admin/firestore';
import { db } from './firestore';
import { Service } from './types';

const serviceCollection: CollectionReference<Service> = db.collection('services') as CollectionReference<Service>;

export async function fetchServices(): Promise<Service[]> {
  const snapshot = await serviceCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getServiceById(id: string): Promise<Service | null> {
  const doc = await serviceCollection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Service;
}
