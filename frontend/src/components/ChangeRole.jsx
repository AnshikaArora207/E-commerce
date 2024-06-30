import { useState } from "react"; 
import ROLE from "../common/role";
import { IoClose } from "react-icons/io5";
import summaryApi from "../common";
import { toast } from "react-toastify";

const ChangeRole = ({ name, email, role, onClose, userId, callFunc }) => {
  const [userRole, setUserRole] = useState(role);
  const handleChange = (e) => {
    setUserRole(e.target.value);
    // console.log(e.target.value);
  };
  const updateUser = async () => {
    const responseData = await fetch(summaryApi.updateUser.url, {
      method: summaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const data = await responseData.json();
    if (data.success) {
      toast.success(data.message);
      onClose();
      callFunc();
    }
    console.log(data);
  };
  return (
    <div className="h-full w-full fixed top-0 bottom-0 left-0 z-10 flex justify-center items-center bg-white bg-opacity-30">
      <div className="w-full mx-auto bg-[#262626] shadow-xl max-w-sm p-4">
        <button className="block ml-auto" onClick={onClose}>
          <IoClose />
        </button>
        <h1 className="text-lg font-medium pb-4">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex flex-row justify-start gap-4 items-center">
          <p>Role</p>
          <select
            className=" border-black border px-4 py-1 my-1 bg-[#262626]"
            value={userRole}
            onChange={handleChange}
          >
            {Object.values(ROLE).map((el, index) => {
              return (
                <option key={index} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto mt-3 block bg-green-700 px-4 py-1 rounded-full hover:bg-green-800"
          onClick={updateUser}
        >
          Update Changes
        </button>
      </div>
    </div>
  );
};

export default ChangeRole;
