import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useCountry from "../hooks/useCountry";
import { useEffect } from "react";
import { useRef } from "react";

const Form = () => {
  const [openDropDownFrom, setOpenDropDownFrom] = useState(false);
  const [openDropDownTo, setOpenDropDownTo] = useState(false);
  const [fromArray, setFromArray] = useState([]);
  const [toArray, setToArray] = useState({});
  const [fromData, setFromData] = useState("inr");
  const [toData, setToData] = useState(null);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [searchFrom, setSearchFrom] = useState([]);
  const [indexFrom, setIndexFrom] = useState(null);
  const [searchTo, setSearchTo] = useState([]);
  const [indexTo, setIndexTo] = useState(null);

  const ulRef = useRef(null);
  const toUlRef = useRef(null)

  const { countryData, valData } = useCountry(fromData);

  useEffect(() => {
    const array = [];
    if (!countryData) return;
    Object.entries(countryData).forEach(([key, value]) => {
      array.push(`${key.toUpperCase()} - ${value}`);
    });
    setFromArray(array);
  }, [countryData]);

  useEffect(() => {
    if (!valData) return;
    const obj = valData[fromData.trim()];
    setToArray(obj);
  }, [valData]);


//   search type
  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault()
      if (openDropDownFrom) {
        const find = e.key.toUpperCase();
        const pattern = /^[a-zA-Z]$/;

        if (pattern.test(find)) {
            setSearchFrom((prev) => [...prev, find]);
        } else if (e.key === "Backspace") {
            setSearchFrom((prev) => prev.slice(0, -1)); // Removes the last element
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropDownFrom]);
  useEffect(() => {
    function handleKeyDown(e) {
      if (openDropDownTo) {
        const find = e.key.toUpperCase();
        const pattern = /^[a-zA-Z]$/;

        if (pattern.test(find)) {
            setSearchTo((prev) => [...prev, find]);
        } else if (e.key === "Backspace") {
            setSearchTo((prev) => prev.slice(0, -1)); // Removes the last element
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropDownTo]);

  useEffect(() => {
    const arrindex = fromArray.findIndex((data) =>
      data.toUpperCase().includes(searchFrom.join(""))
    );
    setIndexFrom(arrindex);
    //console.log(arrindex)
  }, [searchFrom]);
  useEffect(() => {
    const arrindex = fromArray.findIndex((data) =>
      data.toUpperCase().includes(searchTo.join(""))
    );
    setIndexTo(arrindex);
    //console.log(arrindex)
  }, [searchTo]);

//   initial index
useEffect(() => {
    const arrIndex = fromArray.findIndex((data) => data.toUpperCase().includes(fromData.toUpperCase()))
    console.log(fromData,arrIndex)
    setIndexFrom(arrIndex)
},[fromData,openDropDownFrom])

useEffect(() => {
  if(toData){
    const arrIndex = fromArray.findIndex((data) => data.toUpperCase().includes(toData.toUpperCase()))
    console.log(toData,arrIndex)
    setIndexTo(arrIndex)
  }
},[toData,openDropDownTo])


  //   Auto scroll
  useEffect(() => {
    // Scroll to the currently selected item
    if (ulRef.current) {
        console.log(indexFrom)
      const selectedItem = ulRef.current.children[indexFrom];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          //behavior: "smooth", // Smooth scroll
          block: "center", // Scroll item to the center of the container
          inline: "center",
        });
      }
    }
  }, [indexFrom]);

  useEffect(() => {
    // Scroll to the currently selected item
    console.log(indexTo)
    if (toUlRef.current) {
        console.log(indexTo)
      const selectedItem = toUlRef.current.children[indexTo];
      console.log(selectedItem)
      if (selectedItem) {
        selectedItem.scrollIntoView({
          //behavior: "smooth", // Smooth scroll
          block: "center", // Scroll item to the center of the container
          inline: "nearest",
        });
      }
    }
  }, [indexTo]);



  function handleConvert() {
    console.log(toData)
    if (!toData) return;
    const selectedAmount = Number(toArray[toData.trim()]);
    const amnt = amount * selectedAmount;
    setConvertedAmount(amnt.toFixed(2));
  }

  return (
    <div className="p-5 space-y-6 flex-1">
      <form className="space-y-6">
        <Input
          id="number"
          type="number"
          placeholder="Enter Amount"
          label="Amount"
          setAmount={setAmount}
          amount={amount}
        />
        <div className="flex gap-2">
          <DropDown
            label="From"
            opt={fromArray}
            id="from"
            open={openDropDownFrom}
            setOpen={setOpenDropDownFrom}
            secondSetOpen = {setOpenDropDownTo}
            selectedData={fromData}
            setSelectedData={setFromData}
            search={searchFrom.join("")}
            ulRef={ulRef}
            selectedIndex={indexFrom}
            setSearch={setSearchFrom}
            setIndex={setIndexFrom}
            secondSetIndex={setIndexTo}
          />
          <DropDown
            label="To"
            opt={fromArray}
            id="to"
            open={openDropDownTo}
            setOpen={setOpenDropDownTo}
            secondSetOpen = {setOpenDropDownFrom}
            selectedData={toData}
            setSelectedData={setToData}
            search={searchTo.join("")}
            ulRef={toUlRef}
            selectedIndex={indexTo}
            setSearch={setSearchTo}
            setIndex={setIndexTo}
            secondSetIndex={setIndexFrom}
          />
        </div>
      </form>

      <button
        className="px-2 py-1 bg-lime-600 text-white rounded font-semibold"
        onClick={handleConvert}
      >
        Convert
      </button>

      <div>
        <p className="text-xl font-semibold text-center py-1 px-4 bg-secondary rounded text-white">
          {convertedAmount}
        </p>
      </div>
    </div>
  );
};

function Input({ id, type = "text", placeholder, label, amount, setAmount }) {
  return (
    <div>
      <label htmlFor={id} className="w-full text-black">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={amount}
        placeholder={placeholder}
        className="w-full py-1 px-2 bg-gray-200 rounded outline-none"
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
}

function DropDown({
  label,
  opt,
  open,
  setOpen,
  selectedData,
  setSelectedData,
  search,
  ulRef,
  selectedIndex,
  setSearch,
  setIndex,
  secondSetOpen,
}) {
  return (
    <div className="w-full space-y-1 relative">
      <p>{label}</p>
      <div
        className="bg-gray-200 py-1 px-4 rounded flex items-center justify-between"
        onClick={() => {
            setOpen(!open)
            secondSetOpen(false)
            setIndex(null)
        }}
      >
        <p>
          {search
            ? search
            : selectedData
            ? selectedData.toUpperCase()
            : "Select"}
        </p>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"
            ></path>
          </svg>
        </span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="bg-gray-200 rounded overflow-x-auto absolute inset-x-0 py-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: opt.length <= 10 ? opt.length * 28 : 300,
              opacity: 1,
            }} // Assuming 40px per item
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            ref={ulRef}
          >
            {opt &&
              opt.map((op, index) => (
                <li
                  key={index}
                  value={op}
                  className={`hover:bg-gray-400 px-2 rounded cursor-pointer ${
                    selectedIndex == index ? "bg-gray-400" : ""
                  }`}
                  onClick={() => {
                    const key = op.split("-")[0].toLowerCase();
                    setSelectedData(key);
                    setOpen(false);
                    setSearch([]);
                  }}
                >
                  {op}
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Form;
