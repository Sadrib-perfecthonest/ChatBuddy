# 🤖 ChatBuddy - AI-like React Chatbot

ChatBuddy is a simple AI-like chatbot built with **React + TypeScript**.  
It uses **React Hooks** and a **mini knowledge base** to reply dynamically without requiring any external API or authentication tokens.

---

## 🚀 Features
- 💬 Simulated AI replies with 30+ random dynamic responses
- 📚 Knowledge-based answers (e.g., "define computer", "what is React")
- 🎨 Light/Dark theme toggle
- ✨ Smooth chat bubble animations
- 🧹 Clear chat history button
- ⌨️ Send messages via **Enter** key or **Send** button
- ⚡ Powered entirely by React Hooks (no external backend)

---

## 🛠️ Tech Stack
- **React** (Frontend UI)
- **TypeScript** (type safety)
- **React Hooks**: 
  - `useState` → manage input, theme, counters  
  - `useReducer` → handle chat messages  
  - `useRef` → scroll to bottom of chat  
  - `useCallback` → optimize functions  
  - `useMemo` → memoize theme context values  
  - `useLayoutEffect` → auto-scroll on new messages  

---

## 📦 Packages Used
- **React**  
- **TypeScript**  
- No extra dependencies! 🎉 (everything is built-in React)

---

## 📚 What I Learned
- How to use **React Hooks** effectively for state and UI management  
- Using `useReducer` for managing chat messages more cleanly than `useState`  
- Implementing **Context API** for theme switching  
- Creating a **mini AI engine** with keyword detection + knowledge base  
- Adding **animations** with CSS keyframes for better UX  

---

## 💡 Challenges Faced
- Handling **message IDs** properly to avoid duplicate keys  
- Designing a **knowledge base system** for static answers  
- Ensuring the chat auto-scrolls when new messages arrive  
- Making the UI look friendly and animated with minimal CSS  

---

## 🔮 Future Improvements
- Add **typing indicator** (e.g., "ChatBuddy is typing...")  
- Save chat history in **localStorage** so it persists on reload  
- Expand the **knowledge base** with more categories (science, history, etc.)  
- Integrate with a **real AI API** (like OpenAI or Hugging Face)  
- Add **voice input/output** for accessibility  
- Create a **mobile-friendly responsive UI**  

---

## ▶️ How to Run
```bash
# Clone the repository
cd chatbuddy

# Install dependencies
npm install

# Run the app
npm start
