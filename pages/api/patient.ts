import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

//test on http://localhost:3000/api/patient
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { name, age, genetic_marker, biomarker_level, symptom_severity } = req.body;

    const { data, error } = await supabase.from('patients').insert([
      { name, age, genetic_marker, biomarker_level, symptom_severity },
    ]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
