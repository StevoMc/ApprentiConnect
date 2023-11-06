import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import DeleteUserButton from "./delete-user-button";
import { getServerSession } from "next-auth";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";

const SettingsPage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user || !user.email) return null;

  const profile = await prisma?.user?.findUnique({
    where: { email: user?.email },
  });

  if (!profile) return null;

  const updateSetting = async (formData: FormData) => {
    "use server";
    const profession = formData.get("profession") as string | null;
    const department = formData.get("department") as string | null;
    const professionField = formData.get("professionField") as string | null;
    const company = formData.get("company") as string | null;
    const dateStr = formData.get("date") as string | null;
    const entryDate = dateStr ? new Date(dateStr) : null;

    const session = await getServerSession();
    const user = session?.user;

    if (!user || !user?.email) return null;

    const profile = await prisma.user.findUnique({
      where: { email: user?.email },
    });

    if (!profile) return null;

    const updatedUser = Object.assign(
      {},
      profession && { profession },
      department && { department },
      professionField && { professionField },
      company && { company },
      entryDate && { entryDate },
    );


    const updatedProfile = await prisma?.user?.update({
      where: { email: user.email },
      data: updatedUser,
    });
    return { success: !updatedProfile ? false : true };
  };

  const data = {
    profession: profile?.profession ?? "Jobtitle",
    department: profile?.department ?? "Department",
    professionField: profile?.professionField ?? "Field of Profession",
    company: profile?.company ?? "Company",
  };

  return (
    <>
      <div className="flex w-[400px] flex-col items-stretch justify-stretch space-y-4 rounded-xl bg-card/60 p-2 text-center shadow-lg md:p-12">
        <h1>Settings</h1>
        <Separator className="bg-muted-foreground/50" />
        <form
          className="flex flex-col items-stretch justify-stretch space-y-2"
          action={updateSetting}
        >
          {Object.entries(data)?.map((content: any) => (
            <Input
              key={content[0]}
              className="border-0 shadow-md ring-0 active:shadow-none"
              type="text"
              name={content[0]}
              placeholder={content[1]}
            />
          ))}

          <DatePicker dateProp={profile?.entryDate} />
          <Button className="shadow-md">Submit</Button>
        </form>
        <Separator className="bg-muted-foreground/50" />
        <DeleteUserButton />
      </div>
    </>
  );
};

export default SettingsPage;
