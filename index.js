const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

app.use(express.json());

const mongoUser = process.env.MONGO_USER || 'admin';
const mongoPassword = process.env.MONGO_PASSWORD || 'pass123';
const mongoHost = process.env.MONGO_HOST || 'mongo';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDbName = process.env.MONGO_DB_NAME || 'calcdb';

const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`;

let db;

MongoClient.connect(mongoUrl)
  .then(client => {
    db = client.db(mongoDbName);
    console.log(`Connected to MongoDB at ${mongoHost}:${mongoPort}`);

    // CREATE
    app.post('/items', async (req, res) => {
      try {
        const { name, quantity } = req.body;
        if (!name || typeof quantity !== 'number') {
          return res.status(400).json({ statuscode: 400, msg: 'Invalid input' });
        }

        const result = await db.collection('items').insertOne({ name, quantity, createdAt: new Date() });
        res.status(201).json({ statuscode: 201, msg: 'Item added', id: result.insertedId });
      } catch (err) {
        res.status(500).json({ statuscode: 500, msg: err.toString() });
      }
    });

    // READ
    app.get('/items', async (req, res) => {
      try {
        const items = await db.collection('items').find().toArray();
        res.status(200).json({ statuscode: 200, data: items });
      } catch (err) {
        res.status(500).json({ statuscode: 500, msg: err.toString() });
      }
    });

    // UPDATE
    app.put('/items/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { name, quantity } = req.body;

        const result = await db.collection('items').updateOne(
          { _id: new ObjectId(id) },
          { $set: { name, quantity } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ statuscode: 404, msg: 'Item not found' });
        }

        res.status(200).json({ statuscode: 200, msg: 'Item updated' });
      } catch (err) {
        res.status(500).json({ statuscode: 500, msg: err.toString() });
      }
    });

    // DELETE
    app.delete('/items/:id', async (req, res) => {
      try {
        const { id } = req.params;

        const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ statuscode: 404, msg: 'Item not found' });
        }

        res.status(200).json({ statuscode: 200, msg: 'Item deleted' });
      } catch (err) {
        res.status(500).json({ statuscode: 500, msg: err.toString() });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
