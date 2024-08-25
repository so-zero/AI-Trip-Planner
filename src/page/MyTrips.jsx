import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useNavigation } from "react-router-dom";
import Header from "@/components/custom/Header";
import UserTripCard from "@/components/custom/UserTripCard";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-16">
        <h2 className="font-bold text-2xl">마이페이지</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {userTrips?.length > 0
            ? userTrips.map((trip, index) => (
                <UserTripCard key={index} trip={trip} />
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[200px] w-full bg-gray-200 animate-pulse rounded-xl"
                ></div>
              ))}
        </div>
      </div>
    </>
  );
};

export default MyTrips;
