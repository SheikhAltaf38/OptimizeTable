import "./tablerow.css"
const TableRow =({user, handleTablePopup})=>{

    return(
        <>
        <tr  className="tablerow flex justify-between text-center border w-[506px] cursor-pointer 
        shadow-xl shadow-gray-700"
        onClick={()=>handleTablePopup(user.id)}>
            <td className="w-20 text-lg" >{user.id}</td>
            <td className="w-20 text-lg">{user.name}</td>
            <td className="w-20 text-lg">{user.age}</td>
            <td className={`w-20 text-lg ${user.age < 18 ? "bg-yellow-300 text-black transition-all duration-300 hover:bg-yellow-400" :
                 user.age <= 60 ? "bg-green-300 text-black transition-all duration-300 hover:bg-green-400" : 
                 "bg-red-300 text-black transition-all duration-300 hover:bg-red-400" }`}>
                {user.age < 18 ? "Teen" : user.age <= 60 ? "Adult" : "Old" } </td>
        </tr>
        </>
    )
}
export default TableRow;