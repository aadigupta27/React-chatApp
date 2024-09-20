import React, { useEffect, useState } from 'react'
import { db, auth } from '../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import './styles/chat.css'

function Chat(props) {
    const {room} = props;

    const [newMessage, setNewMessage] = useState("");
    const newMessageRef = collection(db, "messages");

    const [messages, setMessages] = useState([]);

    const chatSubmitHandler = async (e) => {
        e.preventDefault();
        if(newMessage === "") return;
              
        await addDoc(newMessageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth?.currentUser?.displayName,
            room
        });

        setNewMessage("");
    }

    useEffect(() => {
        const queryMessages = query(newMessageRef, where("room", "==", room), orderBy("createdAt"));
        const cleanUp = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
             snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            })
            setMessages(messages);
        })
        // cleaning up useEffect
        return () => cleanUp();
    },[])

    return (
        <div className='chat-app'>
            <div className='chat-app-header'>
                <div> Welcome to: <span>{room.toUpperCase()}</span></div>
            </div>
        <div className='chat-messages-div'>
            <div className='chat-messages'> {
                messages.map((message) => <div key={message.id}>
                    <div className='chat-message-card'>
                    <div>
                        {message.user}
                    </div>
                    <div>
                        {message.text}
                    </div>
                    </div>
                </div>)
            }</div>
        </div>
           <div className='form-div'>
           <form className='chat-form' onSubmit={chatSubmitHandler}>
                <input placeholder='Type your message here...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
                <button type='submit'>Send</button>
            </form>
           </div>
        </div>
    )
}

export default Chat
