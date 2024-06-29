import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "../index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeRole from "../components/ChangeRole";

const AllUsers = () => {
    const user = useSelector((state) => state?.user?.user);
    const [allUser, setAllUser] = useState([]);
    const fetchAllUsers = async()=>{
        const responseData = await fetch(summaryApi.allUsers.url,{
            method : summaryApi.allUsers.method,
            credentials :'include'
        })
        const data = await responseData.json();
        if(data.success){
            setAllUser(data.data);
        }
        if(data.error){
            toast.error(data.message);
        }
    }
    useEffect(()=>{
        fetchAllUsers();
    },[])
    return (
      <div className="min-h-[calc(100vh-120px)] md:flex hidden">
        <aside className=" z-10 min-h-full w-full bg-slate-700 max-w-60 custom-shadow">
          <div className="h-32 flex flex-col justify-center items-center">
            <div className="text-5xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img className="w-16 h-16 rounded-full" src={user?.profilePic} />
              ) : (
                <FaRegCircleUser/>
              )}
            </div>
            <p className="text-lg capitalize font-semibold">{user?.name}</p>
            <p>{user?.role}</p>
          </div>
          <div>
            <nav className="grid p-4">
              <Link to="/admin/all-users" className="px-2 py-1 hover:bg-slate-800">All users</Link>
              <Link to="/admin/all-products" className="px-2 py-1 hover:bg-slate-800">All Products</Link>
            </nav>
          </div>
        </aside>
        <main className="w-full h-full p-2">
            <div>
                <table className="w-full userTable">
                    <thead>
                        <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Crerated date</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="pb-4">
                        {
                            allUser.map((el,index)=>{
                                return(<tr className="pb-4" key={index}>
                                    <td>{index+1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('ll')}</td>
                                    <td><button className="bg-green-200 hover:bg-green-400 p-2 rounded-full cursor-pointer"><MdModeEdit color="black"/></button></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <ChangeRole/>
            </div>
        </main>
      </div>
    );
  };

export default AllUsers