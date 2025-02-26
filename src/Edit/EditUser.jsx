import { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    number: "",
    email: "",
    imageUrl: "",
    about: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userRef = doc(db, "users", id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUser(userDoc.data());
        setEditedData(userDoc.data());
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, editedData);
      navigate("/history"); // Redirect back to history page after update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="max-w-4xl w-80 h-80 mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-4">Edit User</h2>
      <div className="bg-gray-100 p-5 rounded-lg shadow-md">
        <div className="flex flex-col gap-3">
          <input type="text" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} className="border p-2 rounded w-full" />
          <input type="number" value={editedData.number} onChange={(e) => setEditedData({ ...editedData, number: e.target.value })} className="border p-2 rounded w-full" />
          <input type="email" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" value={editedData.imageUrl} onChange={(e) => setEditedData({ ...editedData, imageUrl: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" value={editedData.about} onChange={(e) => setEditedData({ ...editedData, about: e.target.value })} className="border p-2 rounded w-full" />
          <button onClick={handleUpdateUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Update User</button>
          <button onClick={() => navigate("/history")} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
