
const TableDataPopUp = ({user , setIsOpen})=>{
    return (
        <>
         <div className="fixed h-full w-full rgba(0,0,0,.2) flex justify-center items-center ">
            <div className=" bg-gray-100 absolute top-50% left-50% h-72 w-80 ">
                <div className="space-y-2 flex flex-col">
                    <h3>user id : {user.id} </h3>
                    <h3>user id : {user.name} </h3>
                    <h3>user id : {user.age} </h3>
                </div>
            </div>
         </div>
        </>
    )
}
export default TableDataPopUp