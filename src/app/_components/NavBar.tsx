import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";

const NavBar: React.FC = async () => {

  return (
    <nav className="text-white w-[208px] flex flex-col px-4 justify-left">
      <Link href={"/"} className="w-full flex gap-2 items-center hover:bg-[#0b2031] py-[0.625rem] pl-5 pr-8"><FaHome className="text-[20px]" />主畫面</Link> 
      <Link href={"/post"} className="w-full flex gap-2 items-center hover:bg-[#0b2031] py-[0.625rem] pl-5 pr-8"><IoMdDocument className="text-[20px]" />文章列表</Link> 
    </nav>
  )
}

export default NavBar