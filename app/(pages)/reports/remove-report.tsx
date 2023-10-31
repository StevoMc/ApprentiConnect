import { ActionTooltip } from "@/components/shared/action-tooltip";
import { Toggle } from "@/components/ui/toggle";
import { removeReport, setPublished } from "@/lib/actions/server-actions";
import { Check, Trash, X } from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";

const RemoveReportButton = async ({ id }: { id: number }) => {
  const handleClick = async () => {
    "use server";
    await removeReport(id).finally(() => revalidatePath("/reports"));
  };

  return (
    <ActionTooltip side="right" align="center" label={"Remove"}>
      <div className="h-fit w-fit">
        <form action={handleClick}>
          <Toggle type="submit" aria-label="Toggle">
            <Trash className="h-4 w-4" />
          </Toggle>
        </form>
      </div>
    </ActionTooltip>
  );
};

export default RemoveReportButton;
