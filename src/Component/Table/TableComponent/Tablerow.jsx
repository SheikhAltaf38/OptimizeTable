
const TableRow =({user, handleTablePopup})=>{

    return(
        <>
        <tr onClick={()=>handleTablePopup(user.id)}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.age < 18 ? "teen" : user.age <= 60 ? "adult" : "old" } </td>
        </tr>
        </>
    )
}
export default TableRow;