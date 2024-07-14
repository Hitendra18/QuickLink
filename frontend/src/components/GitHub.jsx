import { FiExternalLink } from "react-icons/fi";

const GitHub = () => {
  return (
    <div className="absolute bottom-0 w-full flex justify-center lg:text-lg text-sm">
      <div className="mb-2 text-[#bfbcd1] flex gap-1">
        <p>See my other projects as well.</p>
        <a
          href="https://github.com/Hitendra18"
          className="font-bold flex items-center gap-1 text-white"
        >
          <p>GitHub</p>
          <FiExternalLink />
        </a>
      </div>
    </div>
  );
};
export default GitHub;
