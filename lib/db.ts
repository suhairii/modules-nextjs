import { JSONFilePreset } from 'lowdb/node';
import { ApplicationFormData } from './schema';

// Definisikan struktur data di dalam JSON
export type ApplicationRecord = ApplicationFormData & {
  id: string;
  createdAt: string;
};

type Data = {
  applications: ApplicationRecord[];
};

// Fungsi pembantu untuk mendapatkan instance DB
export async function getDb() {
  const defaultData: Data = { applications: [] };
  // File db.json akan otomatis terbuat di direktori root proyek
  const db = await JSONFilePreset<Data>('db.json', defaultData);
  return db;
}
