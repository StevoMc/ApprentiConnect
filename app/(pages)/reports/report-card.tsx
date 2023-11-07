import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TogglePublished from "./toggle-published";
import { cn } from "@/lib/utils";
import RemoveReportButton from "./remove-report";
import prisma from "@/lib/prisma";

const ReportCard = async ({
  createdAt,
  updatedAt,
  authorId,
  date,
  published,
  id,
  ...report
}: ReportType) => {
  const weekNumber = (d: Date) => {
    if (!d) return;
    const weekNumber = Math.ceil(
      ((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000 +
        new Date(d.getFullYear(), 0, 1).getDay() +
        1) /
        7,
    );
    return "KW" + weekNumber;
  };

  const authorName = authorId
    ? await prisma?.user.findUnique({ where: { id: authorId } })
    : "";

  return (
    <Card
      className={cn(
        published
          ? "bg-green-200 dark:bg-green-800/50"
          : "bg-red-200 dark:bg-red-800/50",
        "m-1 grow",
      )}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center justify-between">
            {report.title}
            <div>
              <TogglePublished {...{ id, published }} />
              <RemoveReportButton id={id} />
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          {date?.toLocaleDateString()} - {weekNumber(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(report.content)?.map((e) =>
          !e ? null : (
            <p key={e[0]}>
              {/* {e[0]}
              {": "} */}
              {e[1]?.toString()}
            </p>
          ),
        )}
      </CardContent>
      <CardFooter className="text-foreground/60">
        {typeof authorName === "string" ? (
          <p>Unknown Author</p>
        ) : (
          <div className="flex flex-col">
            <p>
              {authorName?.firstname + " " + authorName?.lastname + " - " + authorName?.email}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
