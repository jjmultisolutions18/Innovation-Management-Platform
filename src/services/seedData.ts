import { db, collection, setDoc, doc, serverTimestamp } from '../lib/firebase';

export async function seedInitialData() {
  const programmes = [
    { id: 'prog-1', name: 'Agri-Tech Innovation Challenge', type: 'Agriculture', status: 'Active', startDate: '2026-01-01', description: 'Transforming sustainable farming through digital solutions.' },
    { id: 'prog-2', name: 'Smart Digital Innovation', type: 'Technology', status: 'Upcoming', startDate: '2026-06-01', description: 'Scaling digital transformations in rural ecosystems.' },
    { id: 'prog-3', name: 'Social Impact Accelerator', type: 'Social', status: 'Active', startDate: '2026-02-15', description: 'Supporting grassroots innovations that solve community challenges.' },
  ];

  const innovations = [
    { 
      id: 'inv-1', 
      title: 'Hydro-Smart Irrigation', 
      innovatorId: 'mock-user-1', 
      programmeId: 'prog-1', 
      sector: 'Agri-Tech', 
      stage: 2, 
      trlLevel: 4, 
      status: 'Active',
      description: 'AI-powered irrigation systems that reduce water waste by 40%.',
      progress: 45
    },
    { 
      id: 'inv-2', 
      title: 'EduConnect Rural', 
      innovatorId: 'mock-user-2', 
      programmeId: 'prog-3', 
      sector: 'Education', 
      stage: 4, 
      trlLevel: 7, 
      status: 'Pilot',
      description: 'Low-bandwidth learning platform for remote student connectivity.',
      progress: 82
    }
  ];

  try {
    for (const p of programmes) {
      await setDoc(doc(db, 'programmes', p.id), { ...p, createdAt: serverTimestamp() }, { merge: true });
    }
    for (const inv of innovations) {
      await setDoc(doc(db, 'innovations', inv.id), { ...inv, updatedAt: serverTimestamp() }, { merge: true });
    }
    console.log('Seed data successfully updated');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}
