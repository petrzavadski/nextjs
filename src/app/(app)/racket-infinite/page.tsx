import { getUserLogin } from "@/app/services/getUser";
import { RacketInfiniteContainer } from "./clientContainer";
import { fetcherInfinite } from "@/app/lib/fetcher";
import { notFound } from "next/navigation";
import { SWRConfig, unstable_serialize } from "swr";
import { getKey } from "./get-key";

const Page = async () => {
  let userLogin;
  let initialRackets;

  const [loginResults, initialRacketsResults] = await Promise.allSettled([
    getUserLogin(),
    fetcherInfinite("products?page=1&limit=5"),
  ]);

  if (loginResults.status === "fulfilled") {
    userLogin = loginResults.value;
  }

  if (initialRacketsResults.status === "fulfilled") {
    initialRackets = initialRacketsResults.value;
  }

  if (!initialRackets) return notFound();

  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(getKey(1, initialRackets))]: initialRackets,
        },
        revalidateOnFocus: false,
      }}
    >
      <RacketInfiniteContainer
        initialDate={initialRackets}
        userLogin={userLogin}
      />
    </SWRConfig>
  );
};

export default Page;
