import { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/edit/${userId}`); // Redirect to edit page with userId
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-4">User History</h2>
      <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Back to Users</Link>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Profile</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Number</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">About</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img src={user.imageUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover mx-auto" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/user/${user.pathName}`} className="text-blue-500 hover:underline">
                    {user.name}
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.number}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.about}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  <button onClick={() => handleEditUser(user.id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
                  <button onClick={() => handleDeleteUser(user.id, user.name)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
