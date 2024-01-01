import Image from "next/image";
import LOADER from "../assets/loader.svg";

export default function Loader() {
    return (
      <div className="fixed inset-0 z-10 h-screen bg-my-light dark:bg-my-dark flex items-center justify-center flex-col">
        <Image
          src={LOADER}
          priority
          alt="loader"
          className="w-[60px]  h-[60px] object-contain"
        />
        <p className="mt-[20px] font-hel text-2xl text-violet-600 font-bold text-center">
          Loading...
        </p>
      </div>
    );
}