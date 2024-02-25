import { fetchPost } from "~/server_action/fetchPost";
import MainContent from "./main_content";
import { unstable_noStore } from "next/cache";
import TopBar from "../_components/TopBar";
import NavBar from "../_components/NavBar";
import RightBar from "../_components/RightBar";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  unstable_noStore();
  const data = await fetchPost(1);
  const session = await getServerAuthSession()

  return (
    <>
      <div className={`absolute left-0 top-0 h-12 w-full flex-grow bg-sky-700`}>
        <TopBar />
      </div>
      <div
        className={`box-border flex h-screen w-full flex-grow justify-center bg-sky-950 pt-16`}
      >
        <NavBar />
        <MainContent session={session} initData={data} />
        <RightBar />
      </div>
    </>
  );
}
