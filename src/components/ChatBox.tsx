import React from 'react';
import Image from 'next/image'; 

const ChatBox = () => {
    const chatUsers = [
        { id: 1, img: "/bilder(profiltestbilder)/Rectangle 1.png", name: "John Doe", unread: true },
        { id: 2, img: "/bilder(profiltestbilder)/Rectangle 2.png", name: "Jane Smith", unread: true },
        { id: 3, img: "/bilder(profiltestbilder)/Rectangle 3.png", name: "Alice Johnson", unread: false },
        { id: 4, img: "/bilder(profiltestbilder)/Rectangle 4.png", name: "Bob Brown", unread: false },
        { id: 5, img: "/bilder(profiltestbilder)/Rectangle 5.png", name: "Charlie Davis", unread: false },
        { id: 6, img: "/bilder(profiltestbilder)/Rectangle 6.png", name: "Diana Wilson", unread: false },
    ];

    return (
            <div className="w-full h-full">
            <h2 className="text-xl font-bold">Chats</h2>
            <p className="text-gray-500 text-sm mb-4">2 unread messages</p>

            <div className="flex space-x-4">
                {chatUsers.map((user) => (
                    <div key={user.id} className="relative">
                        <Image 
                            src={user.img}  
                            alt={user.name}
                            width={40}  
                            height={40} 
                            className={`rounded-full border-2 border-white object-cover ${
                                user.unread ? 'ring-6 ring-pink-100' : ''
                            }`}
                        />

                        {user.unread && (
                            <span 
                                className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" 
                                title="Unread message"
                            />
                        )}
                    </div>
                ))}
            </div>

            <button className="mt-4 text-sm font-semibold flex items-center hover:text-blue-600 transition-colors">
                All Messages <span className="ml-1">→</span>
            </button>
        </div>
    );
};

export default ChatBox;