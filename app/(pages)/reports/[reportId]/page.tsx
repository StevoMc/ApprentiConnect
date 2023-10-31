"use client";

import { useParams } from "next/navigation";

const ReportPage = () => {
	const params = useParams();
	return <>ReportId: {params?.reportId}</>;
};

export default ReportPage;
