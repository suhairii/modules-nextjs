import { JSONFilePreset } from 'lowdb/node';
import { ApplicationFormData } from './schema';

export type ApplicationRecord = ApplicationFormData & {
  id: string;
  createdAt: string;
};

type Data = {
  applications: ApplicationRecord[];
};

export async function getDb() {
  const defaultData: Data = { applications: [] };
  const db = await JSONFilePreset<Data>('db.json', defaultData);
  return db;
}

// Helper untuk mengambil satu aplikasi berdasarkan ID
export async function getApplicationById(id: string) {
  const db = await getDb();
  return db.data.applications.find(app => app.id === id);
}
