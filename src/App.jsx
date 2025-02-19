import { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)

  const handleGenerate = ()=>{
    passwordGen()
  }

  const handleCopy = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYTabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*()_+=~`{}[]|<>?'\",.";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);
  useEffect(()=>{
    passwordGen()
  },[length,num,char,passwordGen])

  return (
    <>
      <div className="max-w-lg bg-gray-700 p-5 rounded-lg  mx-auto my-10">
        <h1 className="text-4xl text-center text-white">Password Generator</h1>
        <div>
          <input
            value={password}
            type="text"
            placeholder="password"
            className="bg-white py-1 px-3 outline-none w-[80%] rounded-e-none rounded-md my-4"
            readOnly
            ref={passwordRef}
          />
          <button onClick={handleCopy} className="text-white outline-none hover:bg-orange-500 bg-orange-400 rounded-s-none cursor-pointer py-1 px-3 rounded-md">
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="range"
              name="length"
              max={20}
              min={8}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white text-md">Length : {length}</label>
            <input
              className="cursor-pointer"
              defaultChecked={num}
              type="checkbox"
              onChange={() => {
                setNum(!num);
              }}
              value={num}
              name="Numbers"
            />
            <label className="text-orange-400 font-bold text-md">Number</label>
            <input
              className="cursor-pointer"
              type="checkbox"
              value={char}
              onChange={()=>{
                setChar(!char)
              }}
              name="Characters"
            />
            <label defaultChecked={num} className="text-orange-400 font-bold text-md">
              Charactors
            </label>
          </div>
          <button onClick={handleGenerate} className="bg-blue-500 hover:bg-blue-600 cursor-pointer w-full rounded-lg text-white py-1 px-3">
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
