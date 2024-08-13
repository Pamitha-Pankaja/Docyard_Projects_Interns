import React, { useEffect, useState, useReducer } from "react";
import { Tag, Select } from "antd";
import { ExpenseCard } from "./common/ExpenseCard";
import TransactionForm from "./common/transactionForm";
import { useNavigate } from "react-router-dom";
import { FaXmark, FaBars } from "react-icons/fa6";
import { getCategories, getTransactions } from "../Services/transactionService";

const { Option } = Select;

const initialState = { transactionItems: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "Transactions_Loaded":
      return { ...state, transactionItems: action.payload };
    case "Filter_Transactions":
      return { ...state, transactionItems: action.payload };
    default:
      return state;
  }
};

const TransactionPage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isIncomeCardPressed, setIsIncomeCardPressed] = useState(false);
  const { transactionItems } = state;
  const [isExpenseCardPressed, setIsExpenseCardPressed] = useState(false);
  const [isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState({ income: [], expense: [] });
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const loadTransactions = getTransactions();
    const loadCategories = getCategories();
    loadCategories.then(categoriesData => {
      setCategories(categoriesData);
    });
    loadTransactions.then(transactionItems => {
      dispatch({ type: "Transactions_Loaded", payload: transactionItems });
    });
  }, []);

  useEffect(
    () => {
      const filterItems = () => {
        let items = state.transactionItems;

        if (selectedTag === "Income") {
          items = items.filter(item => item.type === "Income");
        } else if (selectedTag === "Expense") {
          items = items.filter(item => item.type === "Expense");
        }

        if (selectedCategory !== "All") {
          items = items.filter(item => item.category === selectedCategory);
        }

        setFilteredItems(items);
      };

      filterItems();
    },
    [state.transactionItems, selectedTag, selectedCategory]
  );

  const handleTagClick = tag => {
    setSelectedTag(tag);
  };

  const handleIncomeCategoryChange = value => {
    setSelectedCategory(value);
  };

  const handleExpenseCategoryChange = value => {
    setSelectedCategory(value);
  };

  const handleIncomeCard = () => {
    navigate("/Form", { state: { type: "Income" } });
  };

  const handleExpenseCard = () => {
    navigate("/transaction", { state: { type: "Expense" } });
  };

  const handleTag = tag => {
    setSelectedTag(tag);
  };
  const toggleButton = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closePopup = () => {
    setIsPopupMenuOpened(false);
    setIsIncomeCardPressed(false);
    setIsExpenseCardPressed(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-2 gap-3 ">
      <div className="lg:col-span-1 h-full ">
        <div className=" border-[5px] border-golden rounded-lg gap-3 runded-xl backdrop-blur-2xl">
          <div className="flex flex-col p-10 m-10 gap-3 ">
            <div
              className="flex w-full h-40 justify-center items-center shadow-lg rounded-lg text-[2rem] opacity-100 text-center bg-incomeBC hover:bg-incomeHover focus:bg-focusColor"
              onClick={e => handleIncomeCard()}
            >
              Income
            </div>
            <div
              className=" flex w-full h-40 shadow-lg rounded-lg text-[2rem] opacity-100 text-center justify-center items-center bg-expenseBC hover:bg-expenseHover"
              onClick={e => handleExpenseCard()}
            >
              Expense
            </div>
          </div>
        </div>
      </div>
      <div className="  lg:col-span-2 ">
        <div className=" w-full h-full backdrop:blur-3xl rounded-lg border-[1px] border-golden ">
          <div className="md:flex hidden flex-row justify-center items-center my-3 mx-10 text-black font-semibold">
            <Tag
              className={`w-full h-8 ${selectedTag === "All"
                ? "bg-golden"
                : "bg-gray-300"} hover:bg-goldenHover focus:bg-focusColor text-[1rem] text-center m-1 p-1 shadow-2xl cursor-pointer`}
              onClick={() => handleTagClick("All")}
            >
              All
            </Tag>
            <Tag
              className={`w-full h-8 ${selectedTag === "Income"
                ? "bg-incomeBC"
                : "bg-gray-300"} hover:bg-incomeHover focus:bg-focusColor text-[1rem] text-center m-1 p-1 shadow-2xl cursor-pointer`}
              onClick={() => handleTagClick("Income")}
            >
              Income
              {selectedTag === "Income" &&
                <Select
                  className="flex w-full shadow-sm"
                  value={selectedCategory}
                  onChange={handleIncomeCategoryChange}
                >
                  <Option value="All">All Incomes</Option>
                  {categories.income.map((category, index) =>
                    <Option key={index} value={category}>
                      {category}
                    </Option>
                  )}
                </Select>}
            </Tag>
            <Tag
              className={`w-full h-8 ${selectedTag === "Expense"
                ? "bg-expenseBC"
                : "bg-gray-300"} hover:bg-expenseHover focus:bg-focusColor text-[1rem] text-center m-1 p-1 shadow-2xl cursor-pointer`}
              onClick={() => handleTagClick("Expense")}
            >
              Expense
              {selectedTag === "Expense" &&
                <Select
                  className="flex w-full shadow-sm "
                  value={selectedCategory}
                  onChange={handleExpenseCategoryChange}
                >
                  <Option value="All">All Expenses</Option>
                  {categories.expense.map((category, index) =>
                    <Option key={index} value={category}>
                      {category}
                    </Option>
                  )}
                </Select>}
            </Tag>
          </div>
          <div className="flex md:hidden w-full items-center justify-end  ">
            <button
              className="text-black focus:outline-none justify-end m-4 focus:test-gray-500  "
              onClick={toggleButton}
            >
              {isMenuOpen
                ? <FaXmark className="h-6 w-6 " />
                : <FaBars className="h-6 w-6 " />}
            </button>
          </div>
          <div
            className={`absolute space-y-2 z-30  right-10 w-[200px] mb-2 rounded-l-lg text-center justify-end items-center py-3 transition-all duration-500000 ease-in-out  bg-primary bg-opacity-10  shadow-lg border-[3px] border-golden border-opacity-50 ${isMenuOpen
              ? " h-auto pl-4 w-[200px] block text-center justify-center items-center hover:transition-transform hovet:text-opacity-100  hover:duration-50000 hover:ease-in-out text-opacity-0 text-subText hover:text-opacity-100 hover:bg-white hover:border-opacity-100 mb-10"
              : "hidden"}`}
          >
            <ul className=" flex flex-col gap-1 relative justify-center w-full !mt-[8.00px] !text-[14px] cursor-pointer  ![font-family:'Inter',Helvetica]  items-start mb-5 ">
              <li key="1">
                <a
                  className="flex relative transform  transition-transform w-full hover:font-bold bg-transparent  hover:text-[black]"
                  onClick={() => handleTag("All")}
                >
                  {" "}All{" "}
                </a>
                <a
                  className="flex relative transform transition-transform w-full hover:font-bold bg-transparent  hover:text-[black]"
                  onClick={() => handleTag("Income")}
                >
                  {" "}Income{" "}
                  {selectedTag === "Income" &&
                    <Select
                      className="flex w-full shadow-sm"
                      value={selectedCategory}
                      onChange={handleIncomeCategoryChange}
                    >
                      <Option value="All">All Incomes</Option>
                      {categories.income.map((category, index) =>
                        <Option key={index} value={category}>
                          {category}
                        </Option>
                      )}
                    </Select>}
                </a>
                <a
                  className="flex relative transform  transition-transform w-full hover:font-bold bg-transparent  hover:text-[black]"
                  onClick={() => handleTag("Expense")}
                >
                  {" "}Expense{" "}
                  {selectedTag === "Expense" &&
                    <Select
                      className="flex w-full mr-10 shadow-sm "
                      value={selectedCategory}
                      onChange={handleExpenseCategoryChange}
                    >
                      <Option value="All">All Expenses</Option>
                      {categories.expense.map((category, index) =>
                        <Option key={index} value={category}>
                          {category}
                        </Option>
                      )}
                    </Select>}
                </a>
              </li>
            </ul>
          </div>
          <div className=" p-2 m-3 border-[2px] rounded border-golden">
            <div className="max-h-[500px] overflow-auto py-1.3 ">
              <table className=" w-[100%] ">
                <thead className="flex w-full sm:no relative text-[1rem] text-[white] bg-black">
                  <tr key="index" className="flex w-full ">
                    <th className="flex w-[40%] border-[1px] pl-3 border-white justify-start items-center ">
                      About Income
                    </th>
                    <th className="flex w-[15%] justify-start items-center pl-3 border-[1px] border-white ">
                      Category
                    </th>
                    <th className="flex  w-[15%] justify-sart items-center pl-3 border-[1px] border-white">
                      Date
                    </th>
                    <th className="flex  w-[15%] justify-start items-center pl-3 border-[1px] border-white">
                      Amount
                    </th>
                    <th className="flex  w-[15%] justify-start items-center pl-3 border-[1px] border-white" />
                  </tr>
                </thead>
                <tbody className="flex justify-center items-center bg-black w-full text-white flex-wrap cursor-pointer">
                  {filteredItems.map((element, index) =>
                    <ExpenseCard
                      key={index}
                      name={element.name}
                      note={element.note}
                      date={element.date}
                      amount={element.amount}
                      category={element.category}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
