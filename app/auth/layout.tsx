const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-50">
      {children}
    </div>
  );
};

export default AuthLayout;
