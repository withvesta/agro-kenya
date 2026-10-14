import React, { useState } from 'react';
import { X, Send, MessageSquare, Phone, Shield } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function MessagingModal({ listing, onClose }) {
  const { messages, sendMessage } = useData();
  const { currentUser } = useAuth();
  const [inputText, setInputText] = useState('');

  if (!listing) return null;

  // Filter message thread between currentUser & listing seller
  const thread = messages.filter(
    (m) =>
      m.listingId === listing.id ||
      (m.senderId === currentUser?.id && m.receiverId === listing.userId) ||
      (m.senderId === listing.userId && m.receiverId === currentUser?.id)
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(listing.userId, listing.id, listing.title, inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[600px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">

        {/* CHAT HEADER */}
        <div className="bg-[#064E3B] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={listing.sellerImage}
              alt={listing.sellerName}
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
            />
            <div>
              <h3 className="font-bold text-sm text-white">{listing.sellerName}</h3>
              <p className="text-[11px] text-emerald-200 truncate max-w-[220px]">
                Re: {listing.title}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LISTING CONTEXT BANNER */}
        <div className="bg-[#E8F6EE] px-4 py-2 border-b border-[#087A4B]/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <img src={listing.images[0]} alt="thumb" className="w-7 h-7 rounded object-cover" />
            <span className="font-semibold text-slate-800 truncate">{listing.title}</span>
          </div>
          <span className="font-black text-[#087A4B] whitespace-nowrap">KSh {listing.price.toLocaleString()}</span>
        </div>

        {/* MESSAGE HISTORY LIST */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAF4]">
          {thread.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold">Start the conversation</p>
              <p>Ask about availability, delivery options, or pricing.</p>
            </div>
          ) : (
            thread.map((msg) => {
              const isMe = msg.senderId === currentUser?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs shadow-sm leading-relaxed ${
                      isMe
                        ? 'bg-[#087A4B] text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.message}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* CHAT INPUT FORM */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to seller..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#087A4B]"
          />
          <button
            type="submit"
            className="bg-[#087A4B] hover:bg-[#064E3B] text-white p-2.5 rounded-full shadow-md transition flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
