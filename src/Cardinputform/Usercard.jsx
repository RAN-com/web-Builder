import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";

const UserDetail = () => {
  const { pathName } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, [pathName, sortOrder]);

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
    return <p className="text-center text-gray-500 mt-10">No users found...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 sm:p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">User Details</h2>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
        >
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      {users.map((user) => (
        <div key={user.id} className="p-4 bg-white shadow-sm rounded-lg flex justify-between">
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-600">Number: {user.number}</p>
          </div>
          <button
            onClick={() => handleDelete(user.id)}
            className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserDetail;
