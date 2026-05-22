import { getUserLogin } from "@/app/services/getUser";
import { RacketInfiniteContainer } from "./clientContainer";
import { fetcher } from "@/app/lib/fetcher";

const Page = async () => {
  const userLogin = await getUserLogin();
  const initialRackets = await fetcher("products?page=1&limit=5");

  return (
    <RacketInfiniteContainer
      initialDate={initialRackets}
      userLogin={userLogin}
    />
  );
};

export default Page;
