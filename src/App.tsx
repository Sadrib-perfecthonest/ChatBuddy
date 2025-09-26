import React, {
  useState,
  useReducer,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
  createContext,
} from "react";

type Message = { id: number; sender: "user" | "bot"; text: string };
type Action = { type: "ADD"; payload: Message } | { type: "CLEAR" };

function chatReducer(state: Message[], action: Action): Message[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const ThemeContext = createContext<{ theme: string; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

// Mini knowledge base
const knowledge: Record<string, string> = {
  computer: "A computer is an electronic device for storing and processing data.",
  javascript:
    "JavaScript is a programming language used to make web pages interactive.",
  react: "React is a JavaScript library for building user interfaces.",
  typescript:
    "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
  ai: "AI stands for Artificial Intelligence, the simulation of human intelligence by machines.",
  python: "Python is a high-level, interpreted programming language known for readability.",
  html: "HTML is the standard markup language for creating web pages.",
  css: "CSS is used to style and layout web pages.",
  internet: "The Internet is a global network connecting millions of computers.",
  api: "An API (Application Programming Interface) allows applications to communicate with each other.",
  database: "A database is an organized collection of structured information or data.",
};

// Enhanced AI engine
function AIEngine(userText: string): string {
  const lower = userText.toLowerCase().trim();
  const randomReplies = [
    "Interesting, tell me more!",
    "Wow, that's cool!",
    "Hmm, I need to think about that...",
    "I see, continue...",
    "Can you explain it in detail?",
    "That's fascinating!",
    "Amazing! Keep going.",
    "Really? I didn't know that.",
    "Oh, I understand now.",
    "Sounds good!",
    "Haha, that's funny!",
    "I like the way you think.",
    "You're very thoughtful!",
    "That's a good point.",
    "Absolutely!",
    "I agree with you.",
    "Nice! Keep it up.",
    "I never thought about that!",
    "That's impressive!",
    "Hmm, very curious.",
    "You made me think.",
    "Wow, tell me more!",
    "I see what you mean.",
    "Interesting perspective!",
    "Good observation!",
    "That's awesome!",
    "I am learning from you.",
    "Wow, I didn’t know that!",
    "That's a clever thought.",
    "I like that idea!",
    "Very insightful!",
  ];

  // Knowledge check
  for (const key in knowledge) {
    if (lower.includes(key)) return knowledge[key];
  }

  if (!lower) return "Please type something so I can respond!";
  if (lower.includes("hi") || lower.includes("hello")) return "Hello! How are you today?";
  if (lower.includes("how are you")) return "I am doing great! What about you?";
  if (lower.includes("your name")) return "I am ChatBuddy, your friendly chatbot!";
  if (lower.includes("time")) return `Current time: ${new Date().toLocaleTimeString()}`;
  if (lower.includes("date")) return `Today's date: ${new Date().toLocaleDateString()}`;
  if (lower.includes("weather")) return "I can't check live weather, but I hope it's sunny!";
  if (lower.includes("joke")) {
    const jokes = [
      "Why did the computer go to the doctor? It caught a virus!",
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "Why was the JavaScript developer sad? Because he didn't Node how to express himself!",
      "Why did the developer go broke? Because he used up all his cache!",
      "Why was the function always happy? Because it had no side effects!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  if (lower.includes("thanks") || lower.includes("thank you")) return "You're welcome! 😊";
  if (lower.includes("bye")) return "Goodbye! Talk to you later!";
  if (lower.includes("love")) return "Aww, that's sweet!";
  if (lower.includes("friend")) return "I am your virtual friend! 🤗";
  if (lower.includes("help")) return "I am here to help you! What do you need?";
  if (lower.includes("game")) return "I love games! Do you want to play a word game?";
  if (lower.includes("music")) return "Music is life! What's your favorite song?";
  if (lower.includes("movie")) return "I enjoy movies! Do you have a favorite one?";
  if (lower.includes("fun")) return "Fun is always welcome! 😄";
  if (lower.includes("study")) return "Studying is important. Need any tips?";
  if (lower.includes("hungry")) return "Oh! Hope you get something delicious to eat!";
  if (lower.includes("sad")) return "It's okay to feel sad sometimes. I'm here!";
  if (lower.includes("happy")) return "Yay! Happiness is contagious! 😊";
  if (lower.includes("bored")) return "Boredom? Let's chat and have some fun!";
  if (lower.includes("question")) return "Sure, ask me anything!";

  return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [idCounter, setIdCounter] = useState(0);
  const [messages, dispatch] = useReducer(chatReducer, []);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );
  const themeValue = useMemo(() => ({ theme, toggle: toggleTheme }), [theme, toggleTheme]);

  useLayoutEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const userId = idCounter;
    const botId = idCounter + 1;
    dispatch({ type: "ADD", payload: { id: userId, sender: "user", text: input } });
    setInput("");
    setIdCounter((prev) => prev + 2);

    setTimeout(() => {
      const botReply = AIEngine(input);
      dispatch({ type: "ADD", payload: { id: botId, sender: "bot", text: botReply } });
    }, 500);
  }, [input, idCounter]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <div
        style={{
          padding: 20,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: theme === "light" ? "#e0f7fa" : "#121212",
          color: theme === "light" ? "#000" : "#fff",
          transition: "all 0.3s ease",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>ChatBuddy</h2>
        <button
          onClick={toggleTheme}
          style={{
            marginBottom: 10,
            alignSelf: "center",
            padding: "6px 12px",
            borderRadius: 20,
            border: "none",
            cursor: "pointer",
            background: theme === "light" ? "#00796b" : "#80deea",
            color: theme === "light" ? "#fff" : "#000",
            transition: "all 0.3s ease",
          }}
        >
          Toggle Theme
        </button>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            borderRadius: 15,
            padding: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: theme === "light" ? "#ffffff" : "#1e1e1e",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                background: m.sender === "user" ? "#26a69a" : "#b0bec5",
                color: m.sender === "user" ? "#fff" : "#000",
                padding: "10px 16px",
                borderRadius: 20,
                maxWidth: "70%",
                wordWrap: "break-word",
                animation: "fadeIn 0.5s",
              }}
            >
              {m.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 25,
              border: "1px solid #b0bec5",
              outline: "none",
              background: theme === "light" ? "#f1f8e9" : "#2c2c2c",
              color: theme === "light" ? "#000" : "#fff",
              transition: "all 0.3s ease",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 16px",
              borderRadius: 25,
              border: "none",
              cursor: "pointer",
              background: "#00796b",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          >
            Send
          </button>
          <button
            onClick={() => dispatch({ type: "CLEAR" })}
            style={{
              padding: "10px 16px",
              borderRadius: 25,
              border: "none",
              cursor: "pointer",
              background: "#c62828",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          >
            Clear
          </button>
        </div>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
