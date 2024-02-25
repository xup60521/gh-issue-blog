"use client";
import {type  Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useToast } from "~/components/ui/use-toast";
import { GhBaseURL } from "~/lib/utils";
import "~/styles/markdown.css"

export default function CreatePost({ session }: { session: Session }) {
  const time = new Date();
  const y = time.getFullYear();
  const m = time.getMonth();
  const d = time.getDate();
  const titleInputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = async () => {
    if (!titleInputRef.current?.value) {
      toast({
        title: "請輸入標題",
      });
      return;
    }
    if (!content || content.length < 30) {
      toast({
        title: "請至少輸入30字的內文",
      });
      return;
    }
    fetch(`${GhBaseURL}`, {
      method: "POST",
      body: JSON.stringify({
        title: titleInputRef.current.value,
        body: content,
      }),
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
        Accept: "application/vnd.github+json",
      },
    })
      .then(() => router.push("/post"))
      .catch((err) =>
        toast({
          title: JSON.stringify(err),
        }),
      );
  };

  return (
    <>
      <div className="flex w-[680px] flex-col gap-8 py-4 pb-16">
        <div className="flex w-full max-w-full gap-2 text-black">
          {session.user.image && (
            <Image
              src={session.user.image}
              height={32}
              width={32}
              alt="avatar"
              className="h-8 w-8 rounded-full"
            />
          )}
          <div className="flex h-full flex-col justify-between">
            <span className="text-xs text-gray-500">{session.user.name}</span>
            <span className="text-xs text-gray-500">{`${y} 年 ${m} 月 ${d} 日`}</span>
          </div>
        </div>
        <textarea
          rows={1}
          className="w-full text-2xl outline-none"
          placeholder="標題"
          ref={titleInputRef}
        />
        {previewMode ? 
        <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        className={"markdown-body"}
      >
        {content}
      </Markdown>
        :
        <textarea
          contentEditable
          value={content}
          onChange={e=>setContent(e.target.value)}
          className="h-[50vh] w-full outline-none"
          placeholder="編輯內文..."
        />}
      </div>
      <div className="absolute bottom-0 left-0 flex h-16 w-screen justify-center bg-white">
        <div className="flex h-full w-[680px] justify-between">
          <div className="flex h-full items-center">
            <button onClick={() => setPreviewMode(!previewMode)}>
              {previewMode ? "解除預覽" : "預覽"}
            </button>
          </div>
          <div className="flex h-full items-center gap-4">
            <button onClick={() => router.push(`/post/`)}>取消</button>
            <button
              onClick={handleSubmit}
              className="rounded-md bg-sky-500 p-2 px-4 text-white hover:bg-sky-800"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
