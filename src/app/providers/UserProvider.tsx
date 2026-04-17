import { IUser } from "../types/user";
import { getUser } from "@/app/services/getUser";
import { UserContext } from "./UserContext";
import ClientUserProvider from "./ClientUserProvider";

export const UserProvider = async ({
  children,
}: {
  children: React.ReactNode;
  initialUser?: IUser;
}) => {
  const userResponse = await getUser();
  const user = userResponse.data;

  return <ClientUserProvider user={user}>{children}</ClientUserProvider>;
};
export { UserContext };
