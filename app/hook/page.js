"use client";

//import { useState, useContext, createContext } from "react";

// context api

// import { createContext, useState } from 'react';

// // 1. Initialize context with a default value
// export const ThemeContext = createContext(null);

// // 2. Build a custom Provider component
// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// import { ThemeProvider } from './ThemeContext';
// import DisplayComponent from './DisplayComponent';

// function App() {
//   return (
//     <ThemeProvider>
//       <DisplayComponent />
//     </ThemeProvider>
//   );
// }

// export default App;
// import { useContext } from 'react';
// import { ThemeContext } from './ThemeContext';

// function DisplayComponent() {
//   // Extract state values directly from the provider
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
//       <p>The current theme is {theme}</p>
//       <button onClick={toggleTheme}>Toggle Theme</button>
//     </div>
//   );
// }

// export default DisplayComponent;

//11 Redux Toolkit Integration

//npm install @reduxjs/toolkit react-redux

// import { createSlice } from "@reduxjs/toolkit";

// const counterSlice = createSlice({
//   name: "counter",
//   initialState: {
//     value: 0,
//   },
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//   },
// });

// export const { increment, decrement } = counterSlice.actions;
// export default counterSlice.reducer;

// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import App from "./App";
// import { store } from "./store";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./counterSlice";

// export default function App() {
//   const count = useSelector((state) => state.counter.value);

//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>{count}</h1>

//       <button onClick={() => dispatch(increment())}>
//         Increment
//       </button>

//       <button onClick={() => dispatch(decrement())}>
//         Decrement
//       </button>
//     </div>
//   );
// }

// 12 Drag and Drop List in React

// export default function DragDrop() {
//   const [items, setItems] = useState([
//     "React",
//     "JavaScript",
//     "Node.js",
//     "TypeScript",
//   ]);

//   const [draggedItem, setDraggedItem] = useState(null);

//   const handleDrop = (dropIndex) => {
//     const updatedItems = [...items];

//     const item = updatedItems[draggedItem];

//     // Remove dragged item
//     updatedItems.splice(draggedItem, 1);

//     // Insert at new position
//     updatedItems.splice(dropIndex, 0, item);

//     setItems(updatedItems);
//   };

//   return (
//     <div>
//       <h2>Drag & Drop</h2>

//       {items.map((item, index) => (
//         <div
//           key={index}
//           draggable
//           onDragStart={() => setDraggedItem(index)}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={() => handleDrop(index)}
//           style={{
//             padding: "10px",
//             margin: "5px",
//             border: "1px solid black",
//           }}
//         >
//           {item}
//         </div>
//       ))}
//     </div>
//   );
// }
//React.memo

//Without React.memo

// import { useState } from "react";

// function Child() {
//   console.log("Child Rendered");

//   return <h2>Child Component</h2>;
// }

// export default function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1>{count}</h1>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>

//       <Child />
//     </>
//   );
// }

// //With React.memo
// import { useState, memo } from "react";

// const Child = memo(() => {
//   console.log("Child Rendered");

//   return <h2>Child Component</h2>;
// });

// export default function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1>{count}</h1>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>

//       <Child />
//     </>
//   );
// }

//useMemo

// import { useState, useMemo } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");

//   const squaredValue = useMemo(() => {
//     console.log("Calculating...");
//     return count * count;
//   }, [count]);

//   return (
//     <>
//       <h2>Count: {count}</h2>
//       <h2>Square: {squaredValue}</h2>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>

//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type here"
//       />
//     </>
//   );
// }

//useCallback

// import { useState, useCallback } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);

//   const handleClick = useCallback(() => {
//     console.log("Button Clicked");
//   }, []);

//   return (
//     <>
//       <h2>Count: {count}</h2>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>

//       <button onClick={handleClick}>
//         Click Me
//       </button>
//     </>
//   );
// }

//16 Optimizing Re-renders

// import React, { useState, useCallback } from "react";

// const Child = React.memo(({ onClick }) => {
//   console.log("Child Rendered");

//   return <button onClick={onClick}>Click</button>;
// });

// export default function App() {
//   const [count, setCount] = useState(0);

//   const handleClick = useCallback(() => {
//     console.log("Button Clicked");
//   }, []);

//   return (
//     <>
//       <h2>{count}</h2>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>

//       <Child onClick={handleClick} />
//     </>
//   );
// }

//17 API Caching

//Cache Using Local Storage
//Best Practice: React Query / TanStack Query

// import { useEffect, useState } from "react";

// export default function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const cachedUsers = localStorage.getItem("users");

//     if (cachedUsers) {
//       setUsers(JSON.parse(cachedUsers));
//       return;
//     }

//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//         localStorage.setItem("users", JSON.stringify(data));
//       });
//   }, []);

//   return (
//     <ul>
//       {users.map((user) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// }

//19 Simple OTP Input (React)
// import { useState } from "react";

// export default function OTPInput() {
//   const [otp, setOtp] = useState(["", "", "", ""]);

//   const handleChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   return (
//     <div>
//       {otp.map((digit, index) => (
//         <input
//           key={index}
//           type="text"
//           maxLength={1}
//           value={digit}
//           onChange={(e) => handleChange(e.target.value, index)}
//           style={{ width: "40px", margin: "5px" }}
//         />
//       ))}

//       <p>OTP: {otp.join("")}</p>
//     </div>
//   );
// }

//file upload

// import { useState } from "react";

// export default function FileUpload() {
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleChange} />

//       {file && (
//         <p>
//           File Name: {file.name}
//         </p>
//       )}
//     </div>
//   );
// }

// Multi-Step Form

// import { useState } from "react";

// export default function MultiStepForm() {
//   const [step, setStep] = useState(1);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//   });

//   return (
//     <div>
//       {/* Step 1 */}
//       {step === 1 && (
//         <>
//           <h3>Step 1 - Name</h3>

//           <input
//             placeholder="Enter Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />

//           <br />
//           <button onClick={() => setStep(2)}>Next</button>
//         </>
//       )}

//       {/* Step 2 */}
//       {step === 2 && (
//         <>
//           <h3>Step 2 - Email</h3>

//           <input
//             placeholder="Enter Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />

//           <br />
//           <button onClick={() => setStep(1)}>Previous</button>

//           <button onClick={() => setStep(3)}>Review</button>
//         </>
//       )}

//       {/* Step 3 */}
//       {step === 3 && (
//         <>
//           <h3>Review Details</h3>

//           <p>Name: {form.name}</p>
//           <p>Email: {form.email}</p>

//           <button onClick={() => setStep(2)}>Edit</button>

//           <button onClick={() => alert("Form Submitted")}>Submit</button>
//         </>
//       )}
//     </div>
//   );
// }

//Simple Counter

// import { useState } from "react";

// export default function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h2>Count: {count}</h2>

//       <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>

//       <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>

//       <button onClick={() => setCount(0)}>Reset</button>
//     </div>
//   );
// }

//Todo App

// import { useState } from "react";

// export default function TodoApp() {
//   const [task, setTask] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const addTodo = () => {
//     if (!task.trim()) return;

//     if (editId) {
//       setTodos(
//         todos.map((todo) =>
//           todo.id === editId ? { ...todo, text: task } : todo,
//         ),
//       );
//       setEditId(null);
//     } else {
//       setTodos([
//         ...todos,
//         {
//           id: Date.now(),
//           text: task,
//           completed: false,
//         },
//       ]);
//     }

//     setTask("");
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const editTodo = (todo) => {
//     setTask(todo.text);
//     setEditId(todo.id);
//   };

//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? {
//               ...todo,
//               completed: !todo.completed,
//             }
//           : todo,
//       ),
//     );
//   };

//   return (
//     <div>
//       <h2>Todo App</h2>

//       <input
//         type="text"
//         value={task}
//         placeholder="Enter task"
//         onChange={(e) => setTask(e.target.value)}
//       />

//       <button onClick={addTodo}>{editId ? "Update" : "Add"}</button>

//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <span
//               style={{
//                 textDecoration: todo.completed ? "line-through" : "none",
//               }}
//             >
//               {todo.text}
//             </span>

//             <button onClick={() => toggleComplete(todo.id)}>
//               {todo.completed ? "Undo" : "Complete"}
//             </button>

//             <button onClick={() => editTodo(todo)}>Edit</button>

//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//crud app

// import { useState } from "react";

// export default function CrudApp() {
//   const [name, setName] = useState("");
//   const [users, setUsers] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const handleSubmit = () => {
//     if (!name.trim()) return;

//     if (editId) {
//       // Update
//       setUsers(
//         users.map((user) =>
//           user.id === editId
//             ? { ...user, name }
//             : user
//         )
//       );
//       setEditId(null);
//     } else {
//       // Create
//       setUsers([
//         ...users,
//         {
//           id: Date.now(),
//           name,
//         },
//       ]);
//     }

//     setName("");
//   };

//   const handleEdit = (user) => {
//     setName(user.name);
//     setEditId(user.id);
//   };

//   const handleDelete = (id) => {
//     setUsers(
//       users.filter((user) => user.id !== id)
//     );
//   };

//   return (
//     <div>
//       <h2>CRUD App</h2>

//       <input
//         type="text"
//         placeholder="Enter Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <button onClick={handleSubmit}>
//         {editId ? "Update" : "Add"}
//       </button>

//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name}

//             <button
//               onClick={() => handleEdit(user)}
//             >
//               Edit
//             </button>

//             <button
//               onClick={() =>
//                 handleDelete(user.id)
//               }
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//Search Filter

// import { useState } from "react";

// export default function SearchFilter() {
//   const [search, setSearch] = useState("");

//   const users = [
//     "Rahul",
//     "Amit",
//     "Priya",
//     "Neha",
//     "Rohit",
//   ];

//   const filteredUsers = users.filter((user) =>
//     user.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search User..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <ul>
//         {filteredUsers.map((user, index) => (
//           <li key={index}>{user}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//What is Debouncing?

// import { useState, useEffect } from "react";

// export default function Search() {
//   const [search, setSearch] = useState("");
//   const [debouncedValue, setDebouncedValue] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(search);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <p>Searching for: {debouncedValue}</p>
//     </div>
//   );
// }

//Infinite Scroll

// import { useState } from "react";

// export default function InfiniteScroll() {
//   const allItems = Array.from(
//     { length: 50 },
//     (_, i) => `Item ${i + 1}`
//   );

//   const [visibleCount, setVisibleCount] = useState(10);

//   const loadMore = () => {
//     setVisibleCount((prev) => prev + 10);
//   };

//   return (
//     <div>
//       <h2>Infinite Scroll</h2>

//       {allItems
//         .slice(0, visibleCount)
//         .map((item) => (
//           <p key={item}>{item}</p>
//         ))}

//       {visibleCount < allItems.length && (
//         <button onClick={loadMore}>
//           Load More
//         </button>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from "react";

// export default function InfiniteScroll() {
//   const items = Array.from(
//     { length: 100 },
//     (_, i) => `Item ${i + 1}`
//   );

//   const [visibleCount, setVisibleCount] = useState(10);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight +
//           window.scrollY >=
//         document.body.offsetHeight - 100
//       ) {
//         setVisibleCount((prev) => prev + 10);
//       }
//     };

//     window.addEventListener(
//       "scroll",
//       handleScroll
//     );

//     return () =>
//       window.removeEventListener(
//         "scroll",
//         handleScroll
//       );
//   }, []);

//   return (
//     <div>
//       {items
//         .slice(0, visibleCount)
//         .map((item) => (
//           <p key={item}>{item}</p>
//         ))}
//     </div>
//   );
// }

//Custom Hooks

// import { useState } from "react";

// function useCounter(initialValue = 0) {
//   const [count, setCount] = useState(initialValue);

//   const increment = () => setCount((prev) => prev + 1);
//   const decrement = () => setCount((prev) => prev - 1);
//   const reset = () => setCount(initialValue);

//   return {
//     count,
//     increment,
//     decrement,
//     reset,
//   };
// }

// export default useCounter;

// import useCounter from "./useCounter";

// export default function App() {
//   const {
//     count,
//     increment,
//     decrement,
//     reset,
//   } = useCounter(0);

//   return (
//     <div>
//       <h2>{count}</h2>

//       <button onClick={increment}>
//         Increment
//       </button>

//       <button onClick={decrement}>
//         Decrement
//       </button>

//       <button onClick={reset}>
//         Reset
//       </button>
//     </div>
//   );
// }

//Form Validation

// import { useState } from "react";

// export default function FormValidation() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};

//     if (!form.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       alert("Form Submitted");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             name: e.target.value,
//           })
//         }
//       />

//       {errors.name && (
//         <p>{errors.name}</p>
//       )}

//       <br />

//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             email: e.target.value,
//           })
//         }
//       />

//       {errors.email && (
//         <p>{errors.email}</p>
//       )}

//       <br />

//       <button type="submit">
//         Submit
//       </button>
//     </form>
//   );
// }

//Modal Component

// import { useState } from "react";

// export default function App() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div>
//       <button
//         onClick={() => setShowModal(true)}
//       >
//         Open Modal
//       </button>

//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: "20px",
//               borderRadius: "8px",
//             }}
//           >
//             <h2>Modal Title</h2>
//             <p>This is a modal.</p>

//             <button
//               onClick={() =>
//                 setShowModal(false)
//               }
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Modal({
//   isOpen,
//   onClose,
//   children,
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="overlay">
//       <div className="modal">
//         {children}

//         <button onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import Modal from "./Modal";

// export default function App() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//       >
//         Open
//       </button>

//       <Modal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//       >
//         <h2>User Details</h2>
//       </Modal>
//     </>
//   );
// }

//Pagination

// import { useState } from "react";

// export default function Pagination() {
//   const items = Array.from(
//     { length: 20 },
//     (_, i) => `Item ${i + 1}`
//   );

//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;

//   const startIndex = (page - 1) * itemsPerPage;
//   const currentItems = items.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(
//     items.length / itemsPerPage
//   );

//   return (
//     <div>
//       <h2>Pagination</h2>

//       {currentItems.map((item) => (
//         <p key={item}>{item}</p>
//       ))}

//       <button
//         disabled={page === 1}
//         onClick={() => setPage(page - 1)}
//       >
//         Previous
//       </button>

//       <span> Page {page} </span>

//       <button
//         disabled={page === totalPages}
//         onClick={() => setPage(page + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// }

export default function Inter() {
  return (
    <>
      <h1>inter</h1>
    </>
  );
}
