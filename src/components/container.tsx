const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:p-4">
      <div className="mx-auto w-full max-w-3xl">{children}</div>
    </div>
  );
};

export default Container;
