import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";

const NavBar: React.FC = async () => {
  return (
    <nav className="justify-left flex w-[208px] flex-col px-4 text-white">
      <Link
        href={"/"}
        className="flex w-full items-center gap-2 py-[0.625rem] pl-5 pr-8 hover:bg-[#0b2031]"
      >
        <FaHome className="text-[20px]" />
        主畫面
      </Link>

      <Link
        href={"/post"}
        className="flex w-full items-center gap-2 py-[0.625rem] pl-5 pr-8 hover:bg-[#0b2031]"
      >
        <IoMdDocument className="text-[20px]" />
        文章列表
      </Link>
    </nav>
  );
};

export default NavBar;
