import React, { useState } from 'react';
// import openai from '../utils/openai';

const Chat = ({ prompt, classes }) => {
    const [messages, setMessages] = useState("");
    const [response, setResponse] = useState("");

    const handleChatSubmission = async () => {
        try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });
        const response = chatCompletion.data.choices[0].message;
        const newMessage = { role: 'bot', content: response };
        setMessages([...messages, newMessage]);
        } catch (error) {
        console.error('Error fetching API response:', error);
        // Handle error state if needed
        }
    };

    return (
        <div className={props.classes}>
            <div>
                <textarea onChange={(e) => setMessages(e.target.value)} placeholder="Send your message here" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
    );
};

export default Chat;
