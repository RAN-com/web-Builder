import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import HomeSection from "../Cardinputform/Home";

const UserDetail = () => {
  const { pathName } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    fetchUsers();
  }, [pathName]);

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, "users"), where("pathName", "==", pathName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        let userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        userData.sort((a, b) =>
          sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );

        setUsers(userData);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter((user) => user.id !== userId));
        navigate("/");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (users.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 sm:p-8 border bg-blue-500 rounded-lg shadow-lg ">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">User Details</h2>
      <div className="mb-4 flex justify-end bg-blue-600">
        
      </div>
      {users.map((user) => (
        <div key={user.id} className="space-y-8 gap-5 rounded-lg   justify-between">
          <div className="p-10  bg-white shadow-sm justify-center text-center">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-600">Number: {user.number}</p>
            <p className="text-gray-600">Number: {user.number}</p>
                <p className="text-gray-600">Email: {user.email}</p>
                
              
          </div>
          <div className="p-10  bg-white shadow-sm">
          
                <p className="text-gray-500 text-sm">{user.about}</p>
              
          </div>
          
      
        </div>
        
      ))}
      
    </div>
  );
};

export default UserDetail;
