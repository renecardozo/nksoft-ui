
export default function RoleTableBody({roles,updateStateRole}) {

    const onEdit=()=>{
        console.log("edited")
    }
    const onDelete=(id)=>{
      updateStateRole(id)
    }
    return (
        <tbody>
          { roles &&
            roles.map((role) => (
              <tr key={role.id} className="py-5">
                <td>{role.name}</td>
                <td className="text-center">
                  {role.state ? (
                    <button className="btn-active "  onClick={() => onDelete(role.id)}>Activo</button>
                  ) : (
                    <button className="btn-inactive "  onClick={() => onDelete(role.id)}>Inactivo</button>
                  )}
                </td>
                <td>
                  <button className="main" onClick={() => onEdit(role)}>
                    Editar
                  </button>
    
                  
                </td>
                
              </tr>
            ))}
            
        </tbody>
  )
}