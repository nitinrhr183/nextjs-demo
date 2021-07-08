import { MongoClient } from "mongodb";
// /api/new-meetup
//POST /api/new-meetup
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://nitin_123:mongodblitmus@cluster0.muo4n.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db(); //connects to meetups db
    //picks the table
    const meetupsCollection = db.collection("meetupcollection");

    //query--db
    const result = meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
