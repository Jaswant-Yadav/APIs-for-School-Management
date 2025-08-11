
const pool = require('../config/db');
const { validationResult } = require('express-validator');


function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => deg * (Math.PI / 180);
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.addSchool = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, latitude, longitude } = req.body;

  try {
    const [result] = await pool.execute(
      `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
      [name.trim(), address.trim(), Number(latitude), Number(longitude)]
    );

    const insertedId = result.insertId;
    const [rows] = await pool.execute(`SELECT * FROM schools WHERE id = ?`, [insertedId]);
    res.status(201).json({ message: 'School added', school: rows[0] });
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (Number.isNaN(userLat) || Number.isNaN(userLon)) {
    return res.status(400).json({ error: 'latitude and longitude query params are required and must be numbers' });
  }

  try {
    const [schools] = await pool.execute('SELECT * FROM schools');

    
    const withDistance = schools.map((s) => {
      const distanceKm = haversineDistance(userLat, userLon, Number(s.latitude), Number(s.longitude));
      return { ...s, distance_km: Number(distanceKm.toFixed(3)) };
    });

    
    withDistance.sort((a, b) => a.distance_km - b.distance_km);

    res.json({ count: withDistance.length, schools: withDistance });
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
