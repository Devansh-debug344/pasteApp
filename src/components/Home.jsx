import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setsearchParams] = useSearchParams({});
  const [isInput, setisInput] = useState(true);

  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function handleClick() {
    if (value === "") {
      setisInput(false);
      toast("Please Enter the title");
    } else {
      const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(12),
        createdAt: new Date().toISOString(),
      };
      if (pasteId) {
        //update
        dispatch(updateToPaste(paste));
      } else {
        //create
        dispatch(addToPaste(paste));
      }
      setTitle("");
      setValue("");
      setsearchParams({});
    }
  }

  return (
    <div>
      <div className="flex justify-center p-3 gap-5 mt-[2rem]">
        <input
          className="border rounded-sm border-gray-300 p-2 bg-gray-200 font-semibold text-xl w-[1000px] h-[50px] text-black outline-none"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="bg-blue-600 p-3 text-white font-semibold border rounded-xl transition-all transform duration-300 hover:bg-blue-900"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="relative  ml-[23.6rem] mt-[2rem]">
        <div className="">
          <FaCircle className="absolute top-[60%] left-4 size-3 text-red-600" />
          <FaCircle className="absolute top-[60%] left-9 size-3 text-yellow-500" />
          <FaCircle className="absolute top-[60%] left-14 size-3 text-green-700" />
          <button
            disabled={!value} 
            onClick={() => {
              navigator.clipboard.writeText(value);
              toast.success("Copy to clipboard");
            }}
          >
            <IoCopyOutline className="absolute top-[55%] left-[70rem] size-5" />
          </button>
        </div>

        <input
          className="flex justify-center items-center bg-white h-[35px] border border-gray-500 w-[1160px] rounded-sm outline-none "
          disabled
        />
      </div>

      <div className="flex justify-center mr-[0.3rem]">
        <textarea
          className="bg-white w-[1160px] h-[500px] text-black p-3 border rounded-sm text-xl outline-blue-700 "
          value={value}
          placeholder="Enter text here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
