import * as React from "react";

import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { DatePicker } from "@/components/shared/date-picker";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Checkbox from "./client_checkbox";
import {
  getReports,
  addReport,
  setPublished,
} from "@/lib/actions/server-actions";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { Check, Cross, X } from "lucide-react";
import TogglePublished from "./toggle-published";
import ReportCard from "./report-card";

const ReportsPage = async () => {
  const session = await getServerSession();
  const user = session?.user;
  const reports = await getReports();

  return (
    <>
      <section className="flex flex-col items-center justify-start rounded-2xl bg-card p-12">
        <h1>Create a new Report</h1>
        <div className="w-fit">
          <form action={addReport} className="grid space-y-2">
            <DatePicker />
            <Input type="text" name="title" placeholder="Title" />
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
      <section className="justify-strech mt-6 flex flex-col items-center rounded-2xl bg-card p-12">
        <h1>Overview</h1>
        <div className="flex flex-row flex-wrap items-center justify-center">
          {reports?.map((report) => {
            return <ReportCard key={report.id} {...report} />;
          })}
        </div>
      </section>
    </>
  );
};

export default ReportsPage;
