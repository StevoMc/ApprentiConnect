const PDFLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mt-16 h-[100vh] w-full">{children}</div>
    </>
  );
};

export default PDFLayout;
