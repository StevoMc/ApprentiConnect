const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="p-2 mt-14 w-full max-w-[800px] h-full">{children}</div>
    </>
  );
};

export default PagesLayout;
