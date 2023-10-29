import { getReports } from "@/lib/server-actions";
import { columns } from "./colums";
import { DataTable } from "./data-table";

const ReportsTable = async () => {
  const reports = await getReports();

  return (
    <section className="mt-6 flex h-full w-full flex-col items-center rounded-2xl bg-card p-12">
      <div className="h-full w-full text-center font-medium">
        <DataTable columns={columns} data={reports || []} />
      </div>
    </section>
  );
};

export default ReportsTable;
