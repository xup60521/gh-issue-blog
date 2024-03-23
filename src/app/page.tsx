import TopBar from "./_components/TopBar";
import NavBar from "./_components/NavBar";
import RightBar from "./_components/RightBar";

export default async function Page() {
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
              <div className="h-[calc(100vh-4rem)] w-full overflow-y-scroll rounded-md rounded-b-none bg-white p-2 pb-0">
                <div className="box-border flex h-[calc(100vh-4rem)] w-full flex-col gap-3 p-2 px-8 pb-8 justify-center items-center">
                  主畫面，目前沒想到要放什麼...
                </div>
              </div>
            </main>
            <RightBar />
          </div>
        </>
      );
}
