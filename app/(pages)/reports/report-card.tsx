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
import { ActionTooltip } from "@/components/shared/action-tooltip";

type ReportCardProps = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const ReportCard = async ({
  createdAt,
  updatedAt,
  authorId,
  ...report
}: ReportCardProps) => {
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
    <Card
      className={cn(
        report.published
          ? "bg-green-200 dark:bg-green-800/70"
          : "bg-red-200 dark:bg-red-800/70",
        "m-2 w-fit",
      )}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center justify-between">
            {weekNumber(createdAt)}{" - "}{report.title}
            <div>
              <TogglePublished {...report} />
            </div>
          </div>
        </CardTitle>
        <CardDescription>{createdAt.toUTCString()}</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(report).map((e) => (
          <p key={e[0]}>
            {e[0]}
            {": "}
            {e[1]?.toString()}
          </p>
        ))}
      </CardContent>
      <CardFooter className="text-foreground/75">
        <p>{authorId}</p>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
