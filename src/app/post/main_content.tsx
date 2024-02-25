'use client'

import { useEffect, useRef, useState } from "react";
import { fetchPost } from "~/server_action/fetchPost";
import type { GithubIssueType, IssueCommentType } from "~/type/github";
import Popup from "reactjs-popup"
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import "~/styles/markdown.css"
import { fetchComment } from "~/server_action/fetchComment";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import { FaPen } from "react-icons/fa";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function MainContent({initData, session}: {initData: GithubIssueType[], session: Session | null}) {

  const [posts, setPosts] = useState<GithubIssueType[]>([...initData])
  const [loading, setloading] = useState(false)
  const [page, setPage] = useState(1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentViewArticle, setCurrentViewArticle] = useState<GithubIssueType | null>(null)

  useEffect(()=>{
    if (page !== 1) {
        fetchPost(page).then(res => {
          setPosts(prev => [...prev,...res])
          setloading(false)
        }).catch(err=>alert(err))
    }
  },[page])
  
  useEffect(()=>{
    const scrollContainer = scrollContainerRef.current;
    const onScroll = () => {
      if (scrollContainer && !loading) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        if (Math.floor(scrollTop + clientHeight) >= scrollHeight) {
          setPage(prev=>prev+1)
          setloading(true)
        }
      }

    }
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", onScroll)
    }
    return ()=>{
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", onScroll)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])  

  return (
  <>
    <ViewPostModal session={session} modalOpen={modalOpen} setModalOpen={setModalOpen} item={currentViewArticle} />
    <main className="h-[calc(100vh-4rem)] w-1/2 pb-0">
      <div className="h-[calc(100vh-4rem)] w-full p-2 pb-0 overflow-y-scroll bg-white rounded-md rounded-b-none" ref={scrollContainerRef} >
        <div className="w-full h-[calc(100vh-4rem)] flex flex-col box-border p-2 pb-8 px-8 gap-3" >
          {!posts.length && <div className="w-full text-center">No Post Yet</div>}
          {posts.map((item, index)=>{

            const time = new Date(item.updated_at)
            const y = time.getFullYear()
            const m = time.getMonth()
            const d = time.getDate()

            return (
              <>
                {index !==0 && <div className="border-t-[1px]"  key={`divider ${item.title}`} />}
                <span key={`card ${item.title}`} onClick={()=>{
                  setModalOpen(true)
                  setCurrentViewArticle({...item})
                  window.history.pushState({},"", window.location.pathname+`/${item.number}`)
                }} className="w-full cursor-pointer p-2">
                  <div className="pb-2 flex">
                    <span></span>
                    <span className="text-sm text-gray-500">{`${y} 年 ${m} 月 ${d} 日`}</span>
                  </div>
                  <h2 className="font-bold py-1">{item.title}</h2>
                  <p className=" truncate text-sm">{item.body}</p>
                </span>
              </>
          )})}
        </div>
      </div>
    </main>
  </>
    
  );
}

const ViewPostModal = ({
  modalOpen,
  setModalOpen,
  item,
  session
}:{
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  item: GithubIssueType | null,
  session: Session | null
}) => {

  const time = item ? new Date(item.updated_at) : null
  const y = time?.getFullYear()
  const m = time?.getMonth()
  const d = time?.getDate()
  const [comments, setComments] = useState<IssueCommentType[] | null>(null)
  const router = useRouter()

  useEffect(()=>{
    if (!!item?.number && modalOpen) {
      fetchComment(item.number)
      .then(data => setComments(data))
      .catch(err=>alert(err))
    }
  }, [modalOpen, item?.number])

  return (
    <>
      {modalOpen && <div className="absolute w-screen h-screen bg-black opacity-50 top-0 left-0 z-10" />}
      <Popup open={modalOpen} onClose={()=>{
        setModalOpen(false)
        const url = window.location.pathname.split("/")
        url.pop()
        window.history.replaceState({}, "", url.join("/"))
        }}>
        {item && 
        <>
          <div className="h-screen bg-white max-w-[100vw] w-[45rem] py-8 pb-0 flex flex-col overflow-y-scroll ">
            <div className="w-full px-12 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image className="rounded-full" alt="avatar" src={item.user.avatar_url} width={32} height={32} />
                <span className="text-gray-500">{item.user.login}</span>
              </div>
              <div className="h-full flex items-center">
                {session?.user.id === String(item?.user.id) && <button
                  className="outline-none p-2 rounded-full hover:bg-slate-100 duration-150 flex items-center transition-all"
                  onClick={()=>{
                    router.push(`/post/${item.number}/edit`)
                  }}
                >
                 <FaPen className=" text-[16px]" /> 
                </button>}
                <button 
                  className="outline-none p-2 rounded-full hover:bg-slate-100 duration-150 flex items-center transition-all"
                  onClick={()=>setModalOpen(false)}
                ><IoMdClose className=" text-[24px]" /></button>
              </div>
            </div>
            <article className="w-full px-12 pb-8 flex flex-col gap-3">
              <h1 className="pt-3 text-2xl">{item.title}</h1>
              <span className="text-gray-500 text-sm">{`${y} 年 ${m} 月 ${d} 日`}</span>
              <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className={"markdown-body"}>{item.body}</Markdown>
            </article>
            <section className="bg-neutral-100 px-12 flex-grow w-full py-8 flex flex-col gap-4">

                    <span className="py-1 px-4 bg-sky-500 font-bold text-white w-fit rounded-full">留言</span>
                    <div />

                    {comments?.map((item, index)=>{

                        const time = item ? new Date(item.updated_at) : null
                        const y = time?.getFullYear()
                        const m = time?.getMonth()
                        const d = time?.getDate()

                        return (
                            <>
                                {index !== 0 && <div className="w-full border-t-[1px]" key={`comment_divider ${item.id}`} />}
                                <div className="flex" key={`comment_block ${item.id}`}>
                                    <Image src={item.user.avatar_url} alt="avatar" height={32} width={32} className="rounded-full w-8 h-8" />
                                    <div className="flex-grow px-2 flex flex-col gap-1 min-w-0">
                                        <span className=" text-sm">{item.user.login}</span>
                                        <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className={"markdown-body"}>{item.body}</Markdown>
                                        <span className="text-sm">{`${y} 年 ${m} 月 ${d} 日`}</span>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </section>
          </div>
        </>
        }
      </Popup>
    </>
  )
}