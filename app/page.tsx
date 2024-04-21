import ReportIcon from "@/components/shared/icons/reports-icon";
import Card from "components/home/card";
import ComponentGrid from "components/home/component-grid";
import WebVitals from "components/home/web-vitals";
import { BuyMeACoffee, Github } from "components/shared/icons";
import Image from "next/image";
import PDFPage from "./(pages)/pdf/page";

export default async function Home() {
  const features = [
    {
      title: "Reports",
      description: "Manage your Reports",
      demo: (
        <>
          <a href="/reports">
            <ReportIcon />
          </a>
        </>
      ),
      large: true,
    },
    {
      title: "Overview",
      description: "Visualized and accessible for all users",
      demo: (
        <a className="h-full w-full" href="/reports-table">
          <WebVitals />
        </a>
      ),
    },
    {
      title: "PDF",
      description: "Export data as PDF",
      demo: (
        <>
          <a
            className="flex h-full w-full items-center justify-center"
            href="/pdf"
          >
            <div className="relative h-40">
              <PDFPage />
            </div>
          </a>
        </>
      ),
    },
    {
      title: "Users",
      description: "Share your Reports with other classmates",
      demo: (
        <>
          <div className="h-36 w-36">
            <BuyMeACoffee className="h-full w-full" />
          </div>
        </>
      ),
      large: true,
    }
  ];

  return (
    <>
      <div className="z-1 w-full max-w-xl px-2 md:py-12 xl:px-0">
        <div className="mt-24 flex items-center justify-center overflow-hidden">
          <Image
            src="/android-chrome-384x384.png"
            alt="Logo"
            width="400"
            height="400"
            className="mb-[-130px] mt-[-30px] space-x-2 rounded-sm border-0"
          />
        </div>

        <h1
          className="animate-fade-up bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          ApprentiConnect
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Connecting apprentices with mentors for career guidance and knowledge
          sharing.
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          {/* <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Deploy to Vercel</p>
          </a> */}
          <a
            className="flex max-w-fit cursor-pointer items-center justify-center space-x-2 rounded-full border border-foreground/30 bg-card px-5 py-2 text-sm text-foreground/80 shadow-md transition-colors hover:border-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
            </p>
          </a>
        </div>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div>
    </>
  );
}
