import * as React from "react";

import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { DatePicker } from "@/components/shared/date-picker";
import { Input } from "@/components/ui/input";
import { getReports, addReport } from "@/lib/actions/server-actions";

import { ArrowUp } from "lucide-react";
import ReportCard from "./report-card";
import { weekNumber } from "@/lib/utils";

const ReportsPage = async () => {
  const session = await getServerSession();
  const user = session?.user;
  const reports = await getReports();

  function groupReportsByWeek(
    reports: ReportType[] | null,
  ): Map<number, ReportType[]> {
    const groupedReports = new Map<number, ReportType[]>();

    reports?.forEach((report) => {
      const week = weekNumber(report.date);

      if (groupedReports.has(week)) {
        groupedReports.get(week)?.push(report);
      } else {
        groupedReports.set(week, [report]);
      }
    });
    return groupedReports;
  }

  const groupedReports = groupReportsByWeek(reports);

  return (
    <>
      <div className="mt-14 flex h-full flex-col items-center justify-start space-y-2 md:p-4">
        <section
          id="create"
          className="flex h-fit w-full max-w-[600px] flex-col items-center justify-center rounded-2xl bg-card/70 py-2 text-lg md:px-2"
        >
          {/* <h1 className="my-4">Reports</h1> */}
          <div className="w-full grow">
            <form
              action={addReport}
              className="mx-auto grid items-center space-y-2 align-middle"
            >
              <DatePicker />
              <Input
                className="border-0 shadow-md"
                autoCorrect="true"
                type="text"
                name="title"
                placeholder="Title"
              />
              <Input
                className="border-0 shadow-md"
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
        <section className="mt-4 flex w-full flex-col items-center justify-center rounded-2xl md:p-2">
          {/* <h1>Overview</h1> */}
          <div className="flex w-full flex-col flex-wrap items-stretch justify-center space-y-2">
            {Array.from(groupedReports)
              .sort((a, b) => b[0] - a[0])
              .map(([weekNumber, reportsInWeek]) => (
                <div key={weekNumber}>
                  <h2>KW {weekNumber}</h2>
                  <div className=" flex grow flex-col items-stretch justify-stretch md:flex-row">
                    {reportsInWeek && reportsInWeek?.length > 0 ? (
                      reportsInWeek?.map((report) => {
                        return (
                          <div
                            key={report.id}
                            className="grow self-stretch md:flex-[0.2]"
                          >
                            <ReportCard {...report} />
                          </div>
                        );
                      })
                    ) : (
                      <>No Reports</>
                    )}
                  </div>
                </div>
              ))}
            {/* {reports && reports?.length > 0 ? (
              reports?.map((report) => {
                return <ReportCard key={report.id} {...report} />;
              })
            ) : (
              <>No Reports</>
            )} */}
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
