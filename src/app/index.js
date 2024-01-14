import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  // Function to fetch messages from the database
  const fetchMessages = async () => {
    const response = await fetch('/api/getMessages');
    const data = await response.json();
    setChat(data);
  };

  useEffect(() => {
    fetchMessages(); // Fetch messages when the component mounts
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    setMessage('');
    fetchMessages(); // Fetch updated messages
  };  

  return (
    <div>
      <h1>Simple Chat with MongoDB</h1>
      <form onSubmit={sendMessage}>
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {Array.isArray(chat) && chat.map((msg, index) => (
          <p key={index}>{msg.message}</p> // Assuming 'msg' has a 'message' field
        ))}
      </div>
    </div>
  );
  
}
