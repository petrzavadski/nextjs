import "./top10.module.css";
const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="rackets-container">{children}</div>;
};

export default Layout;
