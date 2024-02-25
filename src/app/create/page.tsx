import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import TopBar from "../_components/TopBar";
import CreatePost from "../_components/CreatePost";

export default async function Create() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className={`absolute left-0 top-0 h-12 w-full flex-grow bg-sky-700`}>
        <TopBar createMode />
      </div>
      <main
        className={`box-border min-w-0 flex flex-col items-center h-screen w-full overflow-x-hidden flex-grow justify-start bg-white px-[80px] py-[calc(3rem+20px)]`}
      >
        <CreatePost session={session} />
      </main>
    </>
  );
}
