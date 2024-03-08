import { MongoClient } from "mongodb";

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};
const URI = process.env.MONGO_DATABSE!.replace(
  "<PASSWORD>",
  process.env.PASSWORD!,
);

const options = {};

if (!URI) throw new Error("Please add your URI to .env.local");
let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
