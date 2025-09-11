import React, { ChangeEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./AddRow.css"
import { TAddRowProps , TAddRowForm} from "../../../Types/TableTypes";

function AddRow({ handleAddRow, isAddRowOpen, setIsAddRowOpen }: TAddRowProps) {
  const initialValue = {
    name: "",
    age: null,
  };

  const [form, setForm] = useState<TAddRowForm>(initialValue);
  function handleChange(e : ChangeEvent<HTMLInputElement>){
    const name = e.target.name;
    const value = e.target.value;
    setForm({...form , [name] : value})
  }
  return (
    <div className="mt-[150px] mb-2">
      <div className="relative flex justify-center items-center flex-col">
        <button
          onClick={() => setIsAddRowOpen(true)}
          className={`${!isAddRowOpen && 'button'} bg-gradient-to-b from-gray-700 to-gray-950 
            text-white px-5 py-2 rounded-lg hover:scale-105 transition-all duration-300 text-lg 
            cursor-pointer`}
        >
          Add Row
        </button>
        {isAddRowOpen && (
          <>
            <div className=" mt-5 w-[300px] border p-3 flex flex-col bg-gray-800 text-white rounded-xl ">
              {/* <label htmlFor="id" className="text-lg ml-1">
            Id
          </label>
          <input
            type="number"
            placeholder="ID"
            value={form.id}
            onChange={(e)=>{setForm({...form, id:e.target.value })}}
            className="w-[150px] text-black placeholder:text-gray-800 md:w-[200px] lg:w-[250px] rounded-md bg-gray-200 px-2 py-1 outline-none focus:bg-gray-300"
          /> */}

              <label htmlFor="name" className="mt-2 text-lg ml-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                name="name"
                onChange={handleChange}
                className="w-[150px] text-black placeholder:text-gray-800  md:w-[200px] lg:w-[250px] rounded-md bg-gray-200 px-2 py-1 outline-none focus:bg-gray-300"
              />

              <label htmlFor="id" className="mt-2 text-lg ml-1">
                Age
              </label>
              <input
                type="number"
                placeholder="Age"
                value={form.age ?? ""}
                onChange={(e) => {
                  setForm({
                    ...form,
                    age: e.target.value === "" ? null : Number(e.target.value),
                  });
                }}
                className="w-[150px] text-black placeholder:text-gray-800 md:w-[200px] lg:w-[250px] rounded-md bg-gray-200 px-2 py-1 outline-none focus:bg-gray-300"
              />
              <div className="mt-3 mx-auto">
                <button
                  onClick={() => {
                    handleAddRow(form);
                    setForm(initialValue);
                  }}
                  className="px-4 py-1 text-xl bg-gradient-to-b from-white via-gray-500 to-gray-900 rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-xl mb-5 shadow-gray-900"
                >
                  Submit
                </button>
              </div>
              <div className="absolute left-[85%]">
                <button
                  onClick={() => {
                    setIsAddRowOpen(false);
                    setForm(initialValue);
                  }}
                >
                  <span className="hover:scale-105 text-xl">
                    <IoMdClose />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddRow;
