import React, { ChangeEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./AddRow.css"
import { TAddRowProps , TAddRowForm, TUser} from "../../../Types/TableTypes";
import { p } from "react-router/dist/development/index-react-server-client-BYr9g50r";
import * as yup from "yup"

const AddRow= React.memo(({ handleAddRow, isAddRowOpen, setIsAddRowOpen  }: TAddRowProps)=> {
  const initialValue = {
    firstName: "",
    lastName:"",
    age: null,
  };
  const [form, setForm] = useState<TAddRowForm>(initialValue);
  const [error , setError] = useState("")
  const usersData = localStorage.getItem("usersData") 
  const users: TUser[]= []
  
 if(usersData){
   users.push(...JSON.parse(usersData))
 }
const validationSchema = yup.object().shape({
    name: yup
      .string().trim()
      .min(2, "name must be min 20 char")
      .max(20, "name can not above 20 char")
      .required("name is required")
      .test("unique", "name must be unique", function (value) {
        return !users?.some((u:TUser) => {
          return u.name === value;
        });
      }),
    age: yup.number().required("age is required"),
  });

  function handleChange(e : ChangeEvent<HTMLInputElement>){
    const name = e.target.name;
    const value = e.target.value;
    setForm({...form , [name] : value})
  }

  const handelValidation =()=>{
    const schema = {name:form.firstName + " " + form.lastName, age:form.age}
    
      console.log("schema",schema);

    validationSchema.validate(schema)
    .then(()=>{
      console.log("schema",schema);
      
      handleAddRow(form)
      setForm(initialValue)
      setIsAddRowOpen(false)
    })
    .catch((err)=>{
      setError(err.errors)
    })
  }
  return (
    <div className="mt-[20px] md:mt-[150px] mb-2">
      <div className="relative flex justify-center items-center flex-col">
        
        <button
          onClick={() => setIsAddRowOpen(true)}
          className={`${!isAddRowOpen && 'button'} bg-gradient-to-b from-gray-700 to-gray-950 
            text-white px-3 md:px-5 py-2 rounded-lg hover:scale-105 transition-all duration-300 text-sm md:text-lg 
            cursor-pointer  md:static`}
        >
          Add Row 
        </button>
        {isAddRowOpen && (
          <>
            <div className=" mt-5 w-[220px] md:w-[300px] border p-3 flex flex-col bg-gray-800 text-white rounded-xl ">
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

              <label htmlFor="firstName" className="mt-2 text-lg ml-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="firstName"
                value={form.firstName}
                name="firstName"
                onChange={handleChange}
                className="w-[180px] text-black placeholder:text-gray-800  md:w-[200px] lg:w-[250px] rounded-md bg-gray-200 px-2 py-1 outline-none focus:bg-gray-300"
              />

                <label htmlFor="lastName" className="mt-2 text-lg ml-1">
               Last Name
              </label>
              <input
                type="text"
                placeholder="lastName"
                value={form.lastName}
                name="lastName"
                onChange={handleChange}
                className="w-[180px] text-black placeholder:text-gray-800  md:w-[200px] lg:w-[250px] rounded-md bg-gray-200 px-2 py-1 outline-none focus:bg-gray-300"
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
                className="w-[180px] text-black placeholder:text-gray-800 md:w-[200px] lg:w-[250px] rounded-md bg-gray-200 px-2 py-1 outline-none focus:bg-gray-300"
              />
              <div className="mt-3 mx-auto">
                <button
                  onClick={
                    handelValidation
                    // setForm(initialValue);
                  }
                  className="px-3 md:px-4 py-1 text-lg md:text-xl bg-gradient-to-b from-white via-gray-500 to-gray-900 rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-xl mb-5 shadow-gray-900"
                >
                  Submit
                </button>
              </div>
              <div className="absolute  left-[70%] md:left-[85%]">
                <button
                  onClick={
                    ()=>setIsAddRowOpen(false)
                  }
                >
                  <span className="hover:scale-105 text-xl">
                    <IoMdClose />
                  </span>
                </button>
              </div>
              {error &&
               <p className="text-red-400 text-center">{error}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
})

export default AddRow;
