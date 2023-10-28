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
import { getReports, addReport } from "@/lib/server-actions";

const ReportsPage = async () => {
  const session = await getServerSession();
  const user = session?.user;
  const reports = await getReports();

  return (
    <>
      <section>
        <h1>Reports</h1>
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
          <Button variant={"outline"}>Create new Report</Button>
        </form>
      </section>
      <section>
        <h1>Reports</h1>
        {reports?.map((report) => {
          return (
            <Card
              key={report.id}
              className={
                report.published
                  ? "bg-green-200 dark:bg-green-800/70"
                  : "bg-red-200 dark:bg-red-800/70"
              }
            >
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{report.content}</p>
              </CardContent>
              <CardFooter>
                <p>{report.authorId}</p>
                {/* <form action={setPublished(report?.id)}> */}
                <Checkbox checked={report?.published} />
                {/* </form> */}
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </>
  );
};

export default ReportsPage;
