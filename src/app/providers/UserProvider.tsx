import { IUser } from "../types/user";
import { getUser } from "@/app/services/getUser";
import { UserContext } from "./UserContext";
import ClientUserProvider from "./ClientUserProvider";
import { FavoriteProvider } from "./FavoriteProvider";

export const UserProvider = async ({
  children,
}: {
  children: React.ReactNode;
  initialUser?: IUser;
}) => {
  const userResponse = await getUser();
  const user = userResponse.data;

  return (
    <FavoriteProvider>
      <ClientUserProvider user={user}>{children}</ClientUserProvider>
    </FavoriteProvider>
  );
};
export { UserContext };
