import { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const UserCards = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [pathName, setPathName] = useState("");

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
      console.error("Error fetching users:", error);
    }
  };

  const checkPathNameExists = async (path) => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("pathName", "==", path));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleAddUser = async () => {
    if (!name || !number || !pathName) {
      alert("All fields are required.");
      return;
    }

    const formattedPathName = pathName.toLowerCase().replace(/\s+/g, "-");

    if (await checkPathNameExists(formattedPathName)) {
      alert("Path Name already exists! Please choose a different one.");
      return;
    }

    const newUser = { name, number, pathName: formattedPathName };

    try {
      const docRef = await addDoc(collection(db, "users"), newUser);
      setUsers((prevUsers) => [...prevUsers, { id: docRef.id, ...newUser }]);
      setName("");
      setNumber("");
      setPathName("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-4">User ID Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Add New User</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Enter Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter Path Name (e.g., john-doe)"
              value={pathName}
              onChange={(e) => setPathName(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add User
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-center">
              <div>
                <Link to={`/user/${user.pathName}`}>
                  <h3 className="text-lg font-semibold text-blue-500 hover:underline cursor-pointer">
                    {user.name}
                  </h3>
                </Link>
                <p className="text-gray-600">Number: {user.number}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCards;
