


// eslint-disable-next-line react/prop-types
export default function Heading({ text }) {
    return (
      <div className="flex font-extrabold text-xl relative z-10 border-b-2 gap-3 pt-10">
        <div className="mt-[-5px] w-8 h-8 rounded-full bg-gray-200 z-[-1] flex justify-center items-center opacity-75">
          <div className="absolute w-[22px] h-[22px] rounded-full bg-gwltheme opacity-70"></div>
        </div>
        <span className="mb-2">{text} Products</span>
      </div>
    );
  }
  