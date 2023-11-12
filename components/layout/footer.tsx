import Link from "next/link";

export default function Footer() {
  return (
    <div className="fiexed left-0 bottom-2 w-full md:py-20 md:mt-10 text-center bg-accent/20">
      <Link href={"/impressum"}><p className="text-foreground/75">Impressum</p></Link>
      <p className="text-foreground/40">@FS223</p>
    </div>
  );
}
