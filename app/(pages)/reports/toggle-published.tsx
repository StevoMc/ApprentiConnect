import { ActionTooltip } from "@/components/shared/action-tooltip";
import { Toggle } from "@/components/ui/toggle";
import { setPublished } from "@/lib/actions/server-actions";
import { Check, X } from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";

const TogglePublished = async ({
  id,
  published,
}: {
  id: number;
  published: boolean;
}) => {
  const handleClick = async () => {
    "use server";
    await setPublished(id, !published).finally(() => revalidatePath("/reports"));
  };

  return (
    <ActionTooltip
      side="right"
      align="center"
      label={published ? "Unpublish" : "Publish"}
    >
      <div className="h-fit w-fit">
        <form action={handleClick}>
          <Toggle
            type="submit"
            aria-label="Toggle"
          >
            {!published ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Toggle>
        </form>
      </div>
    </ActionTooltip>
  );
};

export default TogglePublished;
