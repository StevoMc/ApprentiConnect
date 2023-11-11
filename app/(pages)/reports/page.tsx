import * as React from "react";

import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { DatePicker } from "@/components/shared/date-picker";
import { Input } from "@/components/ui/input";
import { getReports, addReport } from "@/lib/actions/server-actions";

import { ArrowUp } from "lucide-react";
import ReportCard from "./report-card";

const ReportsPage = async () => {
  const session = await getServerSession();
  const user = session?.user;
  const reports = await getReports();

  return (
    <>
      <div className="mt-14 flex h-full flex-col items-center justify-start space-y-2 p-1 md:p-4">
        <section
          id="create"
          className="flex h-fit w-full max-w-[600px] flex-col items-center justify-center rounded-2xl bg-card/70 px-1 py-2 text-lg md:px-2"
        >
          {/* <h1 className="my-4">Reports</h1> */}
          <div className="w-full grow">
            <form
              action={addReport}
              className="mx-auto grid items-center space-y-2 align-middle"
            >
              <DatePicker />
              <Input
                className="shadow-md border-0"
                autoCorrect="true"
                type="text"
                name="title"
                placeholder="Title"
              />
              <Input
                className="shadow-md border-0"
                type="text"
                name="content"
                placeholder="Activity"
              />
              {/* <Input
                className="text-sm border-0 bg-transparent cursor-default h-1"
                disabled
                name="author"
                placeholder="Author"
                value={user?.name ?? "Me"}
              /> */}
              <Button variant={"default"}>Create new Report</Button>
            </form>
          </div>
        </section>
        <section className="mt-4 flex flex-col items-center justify-center rounded-2xl md:p-2">
          {/* <h1>Overview</h1> */}
          <div className="flex flex-row flex-wrap items-stretch justify-center">
            {reports && reports?.length > 0 ? (
              reports?.map((report) => {
                return <ReportCard key={report.id} {...report} />;
              })
            ) : (
              <>No Reports</>
            )}
          </div>
        </section>
        <a href="/reports">
          <Button className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg ">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </>
  );
};

export default ReportsPage;
