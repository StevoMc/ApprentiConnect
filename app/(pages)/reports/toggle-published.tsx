import { Toggle } from "@/components/ui/toggle";
import { setPublished } from "@/lib/server-actions";
import { Check, X } from "lucide-react";
import { revalidateTag } from "next/cache";

const TogglePublished = ({
  id,
  published,
}: {
  id: number;
  published: boolean;
}) => {
  const handleClick = async () => {
    "use server";
    await setPublished(id, !published);
    revalidateTag('reports')
  };

  return (
    <form action={handleClick}>
      <Toggle type="submit" variant="default" aria-label="Toggle">
        {published ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Toggle>
    </form>
  );
};

export default TogglePublished;
