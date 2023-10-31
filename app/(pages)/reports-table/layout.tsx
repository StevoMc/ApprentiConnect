const TableLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-screen px-8 overflow-hidden">{children}</div>
    </>
  );
};

export default TableLayout;
