import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "sonner";
import Header from "../components/custom/Header";
import InfoSection from "@/components/InfoSection";
import Hotels from "@/components/Hotels";
import Places from "@/components/Places";
import Footer from '@/components/custom/Footer';

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such Document");
      toast("여행일정이 없습니다.");
    }
  };
  return (
    <>
      <Header />
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <Places trip={trip} />
        <Footer trip={trip} />
      </div>
    </>
  );
};

export default ViewTrip;
