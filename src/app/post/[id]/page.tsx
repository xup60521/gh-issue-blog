import { fetchAnArticle } from "~/server_action/fetchPost";
import Image from "next/image";
import "~/styles/markdown.css";
import { fetchComment } from "~/server_action/fetchComment";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TopBar from "~/app/_components/TopBar";
import RightBar from "~/app/_components/RightBar";
import NavBar from "~/app/_components/NavBar";
import { getServerAuthSession } from "~/server/auth";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { unstable_noStore } from "next/cache";

export default async function Page({ params }: { params: { id: string } }) {

  unstable_noStore()
  const item = await fetchAnArticle(params.id);
  const time = item ? new Date(item.updated_at) : null;
  const y = time?.getFullYear();
  const m = time?.getMonth();
  const d = time?.getDate();
  const comments = await fetchComment(Number(params.id));
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
          <main className="h-[calc(100vh-4rem)] w-1/2 pb-0">
            <div className="h-[calc(100vh-4rem)] w-full overflow-y-scroll rounded-md flex flex-col rounded-b-none bg-white py-8 pb-0">
              <div className="flex w-full items-center justify-between px-12">
                <div className="flex items-center gap-4">
                  <Image
                    className="rounded-full"
                    alt="avatar"
                    src={item.user.avatar_url}
                    width={32}
                    height={32}
                  />
                  <span className="text-gray-500">{item.user.login}</span>
                </div>
                <div>
                {session?.user.id === String(item?.user.id) && <Link
                  className="outline-none p-2 rounded-full hover:bg-slate-100 duration-150 flex items-center transition-all"
                  href={`/post/${item.number}/edit`}
                >
                 <FaPen className=" text-[16px]" /> 
                </Link>}
                </div>
              </div>
              <article className="flex w-full flex-col gap-3 px-12 pb-8">
                <h1 className="pt-3 text-2xl">{item.title}</h1>
                <span className="text-sm text-gray-500">{`${y} 年 ${m} 月 ${d} 日`}</span>
                <Markdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  className={"markdown-body"}
                >
                  {item.body}
                </Markdown>
              </article>
              <section className="flex w-full flex-col gap-4 flex-grow bg-neutral-100 px-12 py-8">
                <span className="w-fit rounded-full bg-sky-500 px-4 py-1 font-bold text-white">
                  留言
                </span>
                <div />

                {comments?.map((item, index) => {
                  const time = item ? new Date(item.updated_at) : null;
                  const y = time?.getFullYear();
                  const m = time?.getMonth();
                  const d = time?.getDate();

                  return (
                    <>
                      {index !== 0 && (
                        <div
                          className="w-full border-t-[1px]"
                          key={`comment_divider ${item.id}`}
                        />
                      )}
                      <div className="flex" key={`comment_block ${item.id}`}>
                        <Image
                          src={item.user.avatar_url}
                          alt="avatar"
                          height={32}
                          width={32}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="flex min-w-0 flex-grow flex-col gap-1 px-2">
                          <span className=" text-sm">{item.user.login}</span>
                          <Markdown
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}
                            className={"markdown-body"}
                          >
                            {item.body}
                          </Markdown>
                          <span className="text-sm">{`${y} 年 ${m} 月 ${d} 日`}</span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </section>
            </div>
          </main>
        <RightBar />
      </div>
    </>
  );
}
