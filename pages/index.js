import Head from "next/Head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some Address 5,12345 City",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some Address 10,12345 City",
//     description: "This is a second meetup",
//   },
// ];
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of Highly active react meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  //Fetch data from an API
  //GET /api/meetups.....
  const client = await MongoClient.connect(
    "mongodb+srv://nitin_123:mongodblitmus@cluster0.muo4n.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); //connects to meetups db
  //picks the table
  const meetupsCollection = db.collection("meetupcollection");

  const meetups = await meetupsCollection.find().toArray();

  client.close;
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
