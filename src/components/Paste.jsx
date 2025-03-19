import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste({ _id: pasteId }));
  }

  return (
    <>
      {/* Search Bar (Auto Expands) */}
      <div className="flex justify-center mt-[5rem]">
        <input
          className="border rounded-sm border-gray-300 p-2 bg-gray-200 font-semibold text-xl w-[1160px] text-black outline-none"
          type="search"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ height: `${50 + filterData.length * 10}px` }} // Auto-increase height
        />
      </div>

      {/* Container for All Pastes (Auto Expands) */}
      <div className="relative ml-[23.6rem] mt-[2rem] border border-gray-500 w-[1160px] min-h-[300px] rounded-sm bg-white overflow-visible p-5">
        <h3 className="text-4xl font-bold mb-3">All Pastes</h3>
        
        {/* Line below "All Pastes" */}
        <div className="border-t border-gray-400 w-full mb-3"></div>

        {/* Display Pastes */}
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div key={paste?._id} className="border p-4 mb-3 rounded-md">
              <div className="text-2xl font-semibold">{paste.title}</div>
              <div className="text-md text-gray-600">{paste.content}</div>

              {/* Action Buttons */}
              <div className="flex flex-row-reverse gap-3 mt-3">
                <Link to={`/pastes/${paste._id}`}>
                  <FaRegEye className="size-6" />
                </Link>
                <button onClick={() => handleDelete(paste?._id)}>
                  <MdDeleteOutline className="size-6" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <IoCopyOutline className="size-6" />
                </button>
                <Link to={`/?pasteId=${paste?._id}`}>
                  <FaRegEdit className="size-6" />
                </Link>
              </div>

              {/* Date */}
              <div className="flex flex-row justify-end gap-2 mt-3">
                <CiCalendar className="size-6" />
                <p className="font-medium">
                  {new Date(paste.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No pastes available.</p>
        )}
      </div>
    </>
  );
};

export default Paste;
