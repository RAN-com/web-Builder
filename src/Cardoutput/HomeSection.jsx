import React from "react";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const HomeSection = ({ name, title, phone, whatsapp, mapUrl, email, imageUrl }) => {
  return (
    <div className="page-wrapper bg-blue-400 text-white p-6 rounded-lg shadow-lg w-72 h-auto">
      <div className="upper flex flex-col items-center">
        <img src={imageUrl} alt="Profile" className="profile-pic-img w-20 h-20 rounded-full mt-4" crossOrigin="anonymous" />
        <div className="firmname text-lg font-semibold mt-2">{name}</div>
        <div className="firmname-underline w-10 h-1 bg-white mt-1"></div>
        <div className="name text-center mt-4 text-sm">
          <b>{title}</b>
        </div>
      </div>
      <div className="round-contact-buttons flex justify-center gap-4 mt-6 text-xs">
        <a href={`tel:${phone}`} className="flex flex-col items-center text-blue-200 hover:text-white">
          <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full mb-1">
            <FaPhone className="text-white text-lg" />
          </div>
          Call Me
        </a>
        <a href={`https://wa.me/${whatsapp}`} className="flex flex-col items-center text-green-200 hover:text-white">
          <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full mb-1">
            <FaWhatsapp className="text-white text-lg" />
          </div>
          WhatsApp
        </a>
        <a href={mapUrl} className="flex flex-col items-center text-red-200 hover:text-white">
          <div className="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full mb-1">
            <FaMapMarkerAlt className="text-white text-lg" />
          </div>
          Direction
        </a>
        <a href={`mailto:${email}`} className="flex flex-col items-center text-yellow-200 hover:text-white">
          <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 rounded-full mb-1">
            <FaEnvelope className="text-white text-lg" />
          </div>
          Mail
        </a>
      </div>
    </div>
  );
};

export default HomeSection;
