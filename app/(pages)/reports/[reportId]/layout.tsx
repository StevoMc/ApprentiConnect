type ReportPageProps = {
	reportId: string;
};

const ReportIdLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: ReportPageProps;
}) => {
	return <>{children}</>;
};

export default ReportIdLayout;
