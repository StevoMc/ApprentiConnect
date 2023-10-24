import { Button } from "@/components/ui/button";

const ReportsPage = () => {
  const addReport = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) return;

    prisma?.report.create({
      data: {
        title,
        content,
        published: false,
      },
    });
  };

  // model Report {
  //   id        Int     @id @default(autoincrement())
  //   title     String
  //   content   String?
  //   published Boolean @default(false)
  //   author    User?   @relation(fields: [authorId], references: [id])
  //   authorId  String?
  // }

  return (
    <>
      <section>
        <h1>Reports</h1>
        <form action={addReport}>
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="content" placeholder="Content" />
          <input type="text" name="author" placeholder="Author" />
          <Button variant={"outline"}>Create new Report</Button>
        </form>
      </section>
    </>
  );
};

export default ReportsPage;
