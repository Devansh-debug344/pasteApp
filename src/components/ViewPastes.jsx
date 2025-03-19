import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { FaCircle } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import toast from "react-hot-toast";
const ViewPastes = () => {
  const { id } = useParams(); // Get id from URL params
  const allpastes = useSelector((state) => state.paste.pastes);

  const paste = allpastes.find((p) => p._id === id);

  return (
    <div>
      <div className="flex justify-center p-3 gap-5 mt-[2rem]">
        <input
          className="border rounded-sm border-gray-300 p-2 bg-gray-200 font-semibold text-xl w-[1000px] h-[50px] text-black outline-none"
          type="text"
          placeholder="Enter title here..."
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="relative  ml-[23.6rem] mt-[2rem]">
        <div className="">
          <FaCircle className="absolute top-[33.8%] left-4 size-3 text-red-600" />
          <FaCircle className="absolute top-[33.8%] left-9 size-3 text-yellow-500" />
          <FaCircle className="absolute top-[33.8%] left-14 size-3 text-green-700" />
          <IoCopyOutline
            className="absolute top-[25%] left-[70rem] size-5"
            onClick={() => {
              navigator.clipboard.writeText(paste?.content);
              toast.success("Copy to clipboard");
            }}
          />
        </div>

        <input
          className="flex justify-center items-center bg-white h-[35px] border border-gray-500 w-[1160px] rounded-sm outline-none "
          disabled
        />
      </div>

      <div className="flex justify-center mr-[0.3rem]">
        <textarea
          className="bg-white w-[1160px] h-[500px] text-black p-3 border rounded-sm text-xl outline-blue-700 "
          value={paste.content}
          placeholder="Enter text here..."
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPastes;
