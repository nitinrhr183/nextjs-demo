import { MongoClient, ObjectId } from "mongodb";
import Head from "next/Head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetUpDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nitin_123:mongodblitmus@cluster0.muo4n.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); //connects to meetups db
  //picks the table
  const meetupsCollection = db.collection("meetupcollection");

  //need the IDS for paths..
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  //fetch data for a single meetup;
  const meetupId = context.params.meetupId;

  console.log(meetupId);
  ////////////
  const client = await MongoClient.connect(
    "mongodb+srv://nitin_123:mongodblitmus@cluster0.muo4n.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); //connects to meetups db
  //picks the table
  const meetupsCollection = db.collection("meetupcollection");

  //need the IDS for paths..
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  /////////////////////

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};
export default MeetUpDetails;
