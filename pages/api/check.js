import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'Address missing' });

  const filePath = path.resolve(process.cwd(), 'data', 'walletList.json');
  const rawData = fs.readFileSync(filePath);
  const walletList = JSON.parse(rawData);

  const found = walletList.map(a => a.toLowerCase()).includes(address.toLowerCase().trim());

  res.status(200).json({ found });
}
