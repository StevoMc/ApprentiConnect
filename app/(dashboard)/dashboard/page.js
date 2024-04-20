"use client";


import 'components\\calendar\\styles.css';
import { SetStateAction, useState } from "react";
import Calendar from "@/components/calendar/Calendar";
import Details from '@/components/calendar/Details';

export default function Calender() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  
  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <div className="App">
      <h1>Calendar</h1>
      <br />
  
      <Calendar showDetailsHandle={showDetailsHandle} />
      <br />
      {showDetails && <Details data={data} />}
    </div>
  );
}

