"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReportPDF = dynamic(() => import("./pdf"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const ViewPDF = ({
  profile,
  reports,
}: {
  reports: ReportType[];
  profile: User;
}) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return <ReportPDF profile={profile} reports={reports} />;
};

export default ViewPDF;
