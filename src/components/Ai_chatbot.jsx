import ReactMarkdown from "react-markdown";
import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

function AiChatbot() {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [aimsg, setAimsg] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!ques.trim()) return;
    setAimsg(false);
    setAns("");
    setLoading(true);
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB9LVb45c17ZsSG99yVVrhi9VYXiromnBk",
      {
        contents: [{ parts: [{ text: ques }] }],
      }
    );
    setLoading(false);
    
    setAns(
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
    );
  }

  return (
    <>
    
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      } min-h-screen flex flex-col items-center p-6`}
    >
      <button
        className="absolute sm:top-4 top-2 right-4  p-2 bg-gray-800 text-white rounded-md shadow-md"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1 className="text-4xl font-bold mt-6">AI Chatbot</h1>

      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-md shadow-lg mt-6 w-full max-w-2xl p-6 min-h-[400px] flex flex-col`}
      >
        {aimsg ? (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Welcome to Chat AI! 👋</h2>
            <p>
              Ask about general knowledge, tech, writing help, or
              problem-solving.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto space-y-4">
            <div className="flex justify-end">
              <p className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md max-w-md rounded-br-none font-semibold">
                {ques}
              </p>
            </div>
            <span className="text-xs text-gray-500 flex  justify-end ">{new Date().toLocaleTimeString()}</span>

            {loading ? (
              <p className="text-gray-500 animate-pulse">Typing...</p>
            ) : (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-black px-4 py-2 rounded-lg max-w-md max-h-96 overflow-y-auto whitespace-pre-wrap scrollable">
                  <ReactMarkdown>{ans}</ReactMarkdown>
                  <span className="text-xs text-gray-500 flex justify-end mt-2 ">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 w-full max-w-2xl">
        <textarea
          className={`${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          } flex-1 p-3 rounded-md shadow-md border resize-none min-h-[50px]`}
          value={ques}
          onChange={(e) => setQues(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key=="Enter" && !e.shiftKey){
                e.preventDefault();
                handleClick();
                
            }
          }}
          placeholder="Type your question here..."
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
          onClick={handleClick}
        >
          <FaPaperPlane />
        </button>
      </div>

      
    </div>
    <footer
    className={`${
      darkMode ? " bg-gray-300 text-black" : " bg-black text-white"
    } text-center font-bold min-h-14 pt-3     min-w-full`}
  >
    © 2025 AI Chatbot | Built with ❤️ by VISHAL RAJPUT
  </footer>
  </>
  );
}

export default AiChatbot;
