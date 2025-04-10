'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';  

function Message() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 flex flex-col items-center justify-center py-12 relative w-full">
      <div className="absolute inset-0 w-full h-full opacity-30 bg-blue-100"></div> 

      <div className="relative z-10 text-center px-6 max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-[#30498f] mb-6 flex justify-center items-center font-[Poppins] italic drop-shadow-lg">
          <MessageCircle className="h-12 w-12 mr-4 text-gradient-to-r from-purple-400 via-pink-500 to-yellow-500" />
          Vibe talk
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full mx-auto border-2 border-gray-300 hover:shadow-xl hover:border-blue-500 transition-all duration-200">
          <p className="text-lg text-gray-800">
            Vous pouvez consulter, envoyer ou recevoir des messages ici. Nous sommes heureux de vous retrouver ! Profitez d'une expérience conviviale et interactive.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
