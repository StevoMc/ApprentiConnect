const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-20">
      {children}
    </div>
  );
};

export default AuthLayout;
