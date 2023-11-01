import * as React from "react";

import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { DatePicker } from "@/components/shared/date-picker";
import { Input } from "@/components/ui/input";
import {
  getReports,
  addReport,
} from "@/lib/actions/server-actions";

import { ArrowUp} from "lucide-react";
import ReportCard from "./report-card";

const ReportsPage = async () => {
  const session = await getServerSession();
  const user = session?.user;
  const reports = await getReports();
  const newDate = new Date();

  const weekNumber = (d: Date) => {
    const weekNumber = Math.ceil(
      ((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000 +
        new Date(d.getFullYear(), 0, 1).getDay() +
        1) /
        7,
    );
    return "KW" + weekNumber;
  };

  return (
    <>
    <div className="p-2 mt-14 w-full max-w-[800px] h-full">
      <section id="create" className="flex w-full flex-col items-center justify-start rounded-2xl bg-card px-2 py-4 text-lg md:px-2">
        <h1 className="mb-4">Create a new Report</h1>
        <div className="w-full grow">
          <form
            action={addReport}
            className="mx-auto grid items-center space-y-2 align-middle"
          >
            <DatePicker dateProp={newDate} />
            <Input
              autoCorrect="true"
              type="text"
              name="title"
              placeholder="Title"
            />
            <Input type="text" name="content" placeholder="Content" />
            <Input
              disabled
              name="author"
              placeholder="Author"
              value={user?.name ?? "Me"}
            />
            <Button variant={"default"}>Create new Report</Button>
          </form>
        </div>
      </section>
      <section className="justify-strech mt-4 flex flex-col items-center rounded-2xl bg-card md:p-2">
        {/* <h1>Overview</h1> */}
        <div className="w-full grow flex flex-row flex-wrap items-center justify-center">
          {reports?.map((report) => {
            return <ReportCard key={report.id} {...report} />;
          })}
        </div>
      </section>
      <a href="#create">
        <Button className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg ">
          <ArrowUp className="h-4 w-4" />
        </Button>
      </a>
      </div>
    </>
  );
};

export default ReportsPage;
