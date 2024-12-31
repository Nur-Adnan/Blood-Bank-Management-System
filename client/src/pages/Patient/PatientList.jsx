import React, { useEffect, useState, useRef } from "react";
import API from "../../services/API";
import { io } from "socket.io-client";
import Layout from "../../components/shared/Layout/Layout";
import TableForPatientDetails from "../../components/shared/tables/TableForPatientDetails";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaPaperclip, FaSmile, FaPaperPlane, FaSearch } from "react-icons/fa";

const PatientList = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(
      "https://blood-bank-management-system-8e2n.onrender.com"
    );
    setSocket(newSocket);
    if (user) {
      newSocket.emit("join", { userId: user._id, userType: "donar" });
    }
    return () => newSocket.disconnect();
  }, [user]);

  // Fetch patient data
  const getPatientData = async () => {
    try {
      const response = await API.get("/patient/patient-list");
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  // Fetch chat history
  const fetchChatHistory = async (patientId) => {
    try {
      const { data } = await API.get(
        `/chats/${user._id}?contactId=${patientId}`
      );
      if (data?.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Handle notifications and messages
  useEffect(() => {
    if (socket) {
      socket.on("receiveNotification", (notification) => {
        toast.info(notification.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      });

      socket.on("receiveMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("typing", (typingUser) => {
        if (typingUser === chat?._id) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      });
    }
  }, [socket, chat]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message and save it to the backend
  const handleSendMessage = async () => {
    if (socket && chat && newMessage.trim()) {
      const messageData = {
        senderId: user._id,
        senderName: user.name,
        recipientId: chat._id,
        message: newMessage,
        timestamp: new Date().toISOString(),
      };

      try {
        await API.post("/chats", messageData);
        socket.emit("sendMessage", messageData);
        setMessages((prev) => [...prev, { ...messageData, status: "sent" }]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="md:pl-64">
          <h1 className="flex mt-8 items-center text-black mb-2 justify-center font-serif text-6xl font-bold mx-8 py-2 rounded-lg">
            Welcome Donar {user?.name}
          </h1>
          <TableForPatientDetails
            data={data}
            list={"Patient List"}
            onMessageClick={(patient) => {
              setChat(patient);
              fetchChatHistory(patient._id);
            }}
          />
          {chat && (
            <div className="fixed bottom-0 right-0 w-1/3 h-3/4 bg-white shadow-lg rounded-lg p-4 flex flex-col">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xl font-semibold">{chat.name}</h3>
                <button
                  onClick={() => setChat(null)}
                  className="text-red-500 font-bold"
                >
                  Close
                </button>
              </div>
              <div className="flex items-center border-b py-2">
                <FaSearch className="text-gray-400 mx-2" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="flex-1 border-none outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 overflow-y-auto mt-4 space-y-2">
                {messages
                  .filter((msg) =>
                    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((msg, index) => (
                    <div
                      key={index}
                      className={`${
                        msg.senderId === user._id ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.senderId === user._id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        <div className="text-xs text-gray-500">
                          {msg.senderName} -{" "}
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                        {msg.message}
                      </span>
                    </div>
                  ))}
                {isTyping && (
                  <div className="text-left text-gray-500 text-sm">
                    {chat.name} is typing...
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
              <div className="flex items-center mt-4">
                <button className="text-gray-500 mx-2">
                  <FaSmile size={24} />
                </button>
                <button className="text-gray-500 mx-2">
                  <FaPaperclip size={24} />
                </button>
                <input
                  type="text"
                  className="flex-1 border rounded-l-lg px-4 py-2"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    socket.emit("typing", chat._id);
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-500 text-white px-4 py-2 rounded-r-lg"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PatientList;
