import { useEffect, useState } from "react";
import { APISERVICE } from "../../services/api.service";
import RoleTable from "./RoleTable";
import RoleForm from "./RoleForm";

export default function Role() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const getRoles = async () => {
    let url = "api/roles";
    const response = await APISERVICE.get(url);
    setRoles(response);
  };
  const getPermissions = async () => {
    let url = "api/permissions";
    const response = await APISERVICE.get(url);
    setPermissions(response);
  };
  const createRole = async (body) => {
    let url = "api/create";
    const response = await APISERVICE.post(url, body);
    getRoles();
  };
  const updateStateRole = async (id) => {
    let url = `api/update/${id}`;
    const response = await APISERVICE.delete(url);
    getRoles();
  };
  useEffect(() => {
    getRoles();
    getPermissions();
  }, []);

  return (
    <div className="container mt-5">
     <button className="mb-2">Nuevo Rol</button>
      <RoleTable roles={roles} updateStateRole={updateStateRole} />
    </div>
  );
}
