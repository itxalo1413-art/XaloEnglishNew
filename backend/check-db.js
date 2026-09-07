const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');
  
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  
  for (let c of collections) {
    const count = await db.collection(c.name).countDocuments();
    console.log(`Collection ${c.name}: ${count} documents`);
  }
  
  mongoose.disconnect();
}
check().catch(console.error);
