import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import EditPost from "~/app/_components/EditPost";
import TopBar from "~/app/_components/TopBar";
import { getServerAuthSession } from "~/server/auth";
import { fetchAnArticle } from "~/server_action/fetchPost";


export default async function EditPage({params}: {params: {id: string}}) {
    
    unstable_noStore()
    const session = await getServerAuthSession()
    if (!session) {
        redirect("/post")
    }
    const post = await fetchAnArticle(params.id)
    if (`${session.user.id}` !== `${post.user.id}`) {
        redirect("/post")
    }

    return <>
    <div className={`absolute left-0 top-0 h-12 w-full flex-grow bg-sky-700`}>
      <TopBar />
    </div>
    <main
      className={`box-border min-w-0 flex flex-col items-center h-screen w-full overflow-x-hidden flex-grow justify-start bg-white px-[80px] py-[calc(3rem+20px)]`}
    >
      <EditPost session={session} issueNumber={post.number} title={post.title} body={post.body} />
    </main>
  </>
}