import { yearNow } from "@/lib/date";
import Image from "next/image";
import facebook from "../../../public/assets/facebook.png";
import instagram from "../../../public/assets/instagram.png";
import thread from "../../../public/assets/thread.png";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary_color_1 px-8 py-6">
      <div className="flex justify-between items-center">
        <p className="text-white">© BangkaHire | {yearNow}</p>
        <div className="flex gap-4 items-center">
          <Image
            width={20}
            height={20}
            src={instagram}
            className="w-6 h-6"
            alt="instagram"
          />
          <Image
            width={20}
            height={20}
            src={facebook}
            className="w-6 h-6"
            alt="facebook"
          />
          <Image
            width={20}
            height={20}
            src={thread}
            className="w-6 h-6"
            alt="thread"
          />
        </div>
      </div>
    </footer>
  );
}
