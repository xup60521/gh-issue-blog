import { FaBlogger } from "react-icons/fa6";
import { FaSearch, FaPen } from "react-icons/fa";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default async function TopBar({createMode}:{createMode?: boolean}) {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex pl-2 h-full items-center gap-2">
        <span className="flex h-full items-center text-3xl text-white">
          <FaBlogger />
        </span>
        <Link
          href={"/"}
          className="font-mono text-xl font-bold text-white flex-shrink-0"
        >{`丹尼爾的部落格`}</Link>
        <div className="mx-4 flex h-full items-center py-2 flex-shrink">
          <input
            className="h-full w-96 min-w-0 rounded-md flex-shrink rounded-r-none border-sky-800 bg-sky-800 px-2 text-sm text-white outline-none"
            placeholder="搜尋文章"
            type="text"
          />
          <button className="h-full rounded-r-md border-[1px] border-sky-800 px-4 text-white">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="max-w-96 flex-grow" />
      <div className="flex h-full items-center">
        {!session && (
          <Link href="/api/auth/signin" className="text-sm text-white">
            登入
          </Link>
        )}
        {session && (
        <>
            <Link
                href={"/create"}
                className={`h-full flex items-center text-white ${createMode ?"bg-sky-800" :"hover:bg-sky-800"} px-6`}
                >
                <FaPen className="text-[16px]" />
            </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-full cursor-pointer items-center px-4 gap-4 font-mono text-sm text-white">
                <span>Hello, {session.user.name} </span>
                <TbTriangleInvertedFilled className="cursor-pointer text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/api/auth/signout"}>登出</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
        )}
      </div>
    </div>
  );
}
