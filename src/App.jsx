import React from "react";
import Form from "./Components/Form";

const App = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-primary to-secondary p-5">
      <div className="w-full mx-auto max-w-xl rounded-xl bg-white shadow-lg">
        <div className="w-full">
          <div>
            <h3 className="font-semibold text-center text-white text-xl rounded-tr-lg rounded-tl-lg py-2 bg-[#212529]">Money Converter</h3>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default App;
