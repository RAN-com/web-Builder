import { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import AboutInput from "../Cardoutput/Usercard"; // Import the AboutInput component

const UserCards = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [about, setAbout] = useState("");
  const [pathName, setPathName] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();

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

  const logHistory = async (action) => {
    try {
      await addDoc(collection(db, "history"), {
        action,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error logging history:", error);
    }
  };

  const handleAddOrUpdateUser = async () => {
    if (!name || !number || !email || !imageUrl || !about || !pathName) {
      alert("All fields are required.");
      return;
    }

    const formattedPathName = pathName.toLowerCase().replace(/\s+/g, "-");

    if (editingUserId) {
      try {
        const userRef = doc(db, "users", editingUserId);
        await updateDoc(userRef, { name, number, email, imageUrl, about, pathName: formattedPathName });
        setUsers(users.map(user => user.id === editingUserId ? { id: editingUserId, name, number, email, imageUrl, about, pathName: formattedPathName } : user));
        setEditingUserId(null);
        await logHistory(`Updated user: ${name}`);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "users"), { name, number, email, imageUrl, about, pathName: formattedPathName });
        setUsers([...users, { id: docRef.id, name, number, email, imageUrl, about, pathName: formattedPathName }]);
        await logHistory(`Added user: ${name}`);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }

    setName("");
    setNumber("");
    setEmail("");
    setImageUrl("");
    setAbout("");
    setPathName("");
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setNumber(user.number);
    setEmail(user.email);
    setImageUrl(user.imageUrl);
    setAbout(user.about);
    setPathName(user.pathName);
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter((user) => user.id !== userId));
        await logHistory(`Deleted user: ${userName}`);
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
          <h3 className="text-lg font-semibold mb-3">{editingUserId ? "Edit User" : "Add New User"}</h3>
          <div className="flex flex-col gap-3">
            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" />
            <input type="number" placeholder="Enter Number" value={number} onChange={(e) => setNumber(e.target.value)} className="border p-2 rounded w-full" />
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Enter Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border p-2 rounded w-full" />
            <AboutInput about={about} setAbout={setAbout} />
            <input type="text" placeholder="Enter Path Name" value={pathName} onChange={(e) => setPathName(e.target.value.toLowerCase().replace(/\s+/g, "-"))} className="border p-2 rounded w-full" />
            <button onClick={handleAddOrUpdateUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              {editingUserId ? "Update User" : "Add User"}
            </button>
            <button onClick={() => navigate("/history")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              View History
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default UserCards;
