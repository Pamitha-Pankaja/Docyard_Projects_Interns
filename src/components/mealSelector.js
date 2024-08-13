// /*import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaCoffee, FaHamburger, FaUtensils } from 'react-icons/fa';


// const MealSelector = () => {
//   const navigate = useNavigate();

//   const handleMealClick = (meal) => {
//     navigate(`/meal/${meal}`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold mb-10">Select Your Meal</h1>
//       <div className="flex space-x-10">
//         <div className="meal-card bg-yellow-300" onClick={() => handleMealClick('breakfast')}>
//         <FaCoffee size={60} className="text-white" />
//           <h2>Breakfast</h2>
//         </div>
//         <div className="meal-card bg-white" onClick={() => handleMealClick('lunch')}>
//         <FaHamburger size={60} className="text-blue-900" />
//           <h2>Lunch</h2>
//         </div>
//         <div className="meal-card bg-white" onClick={() => handleMealClick('dinner')}>
//         <FaUtensils size={60} className="text-blue-900" />
//           <h2>Dinner</h2>
//         </div>
//       </div>
//       <div className="flex justify-between w-full mt-10">
//         <button className="bg-yellow-300 py-2 px-4 rounded-lg">Back</button>
//         <button className="bg-blue-900 text-white py-2 px-4 rounded-lg">Next</button>
//       </div>
//     </div>
//   );
// };

// export default MealSelector;*/
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaCoffee, FaHamburger, FaUtensils } from 'react-icons/fa';

// const MealSelector = () => {
//   const navigate = useNavigate();

//   const handleMealClick = (meal) => {
//     navigate(`/meal/${meal}`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white">
//       <h1 className="text-4xl font-bold mb-10 text-[#28245F]">Select Your Meal</h1>
//       <div className="flex space-x-10">
//         <div
//           className="meal-card bg-white w-40 h-40 rounded-full flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500"
//           onClick={() => handleMealClick('Breakfast')}
//         >
//           <FaCoffee size={100} className="text-blue-900" />
//           <h2 className="text-xl font-semibold mt-2">Breakfast</h2>
//         </div>
//         <div
//           className="meal-card bg-white w-40 h-40 rounded-full flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500"
//           onClick={() => handleMealClick('Lunch')}
//         >
//           <FaHamburger size={100} className="text-blue-900" />
//           <h2 className="text-xl font-semibold mt-2">Lunch</h2>
//         </div>
//         <div
//           className="meal-card bg-white w-40 h-40 rounded-full flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500"
//           onClick={() => handleMealClick('Dinner')}
//         >
//           <FaUtensils size={100} className="text-blue-900" />
//           <h2 className="text-xl font-semibold mt-2">Dinner</h2>
//         </div>
//       </div>
//       <div className="flex justify-between w-full mt-10 px-4">
//         <button className="bg-yellow-300 py-2 px-4 rounded-lg">Back</button>
//         <button className="bg-blue-900 text-white py-2 px-4 rounded-lg">Next</button>
//       </div>
//     </div>
//   );
// };

// export default MealSelector;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCoffee, FaHamburger, FaUtensils,} from 'react-icons/fa';


const MealSelector = () => {
  const navigate = useNavigate();

  const handleMealClick = (meal) => {
    navigate(`/meal/${meal}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold mb-10 text-[#28245F]">Select Your Meal</h1>
      <div className="flex space-x-10">
        <div className="flex flex-col items-center">
          <div
            className="meal-card bg-white w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500 group"
            onClick={() => handleMealClick('Breakfast')}
          >
            <FaCoffee size={100} className="text-[#28245F] group-hover:text-white" />
          </div>
          <h2 className="text-xl font-semibold mt-2 text-center text-[#28245F] font-medium">Breakfast</h2>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="meal-card bg-white w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500 group"
            onClick={() => handleMealClick('Lunch')}
          >
            <FaHamburger size={100} className="text-[#28245F] group-hover:text-white" />
          </div>
          <h2 className="text-xl font-semibold mt-2 text-center text-[#28245F] font-medium">Lunch</h2>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="meal-card bg-white w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500 group"
            onClick={() => handleMealClick('Dinner')}
          >
            <FaUtensils size={100} className="text-[#28245F] group-hover:text-white" />
          </div>
          <h2 className="text-xl font-semibold mt-2 text-center text-[#28245F] font-medium">Dinner</h2>
        </div>
      </div>
      {/* <div className="flex justify-between w-full mt-10 px-4">
        <button className="bg-[#FFC10C] text-white py-2 px-4 rounded-lg">Back</button>
        <button className="bg-[#28245F] text-white py-2 px-4 rounded-lg">Next</button>
      </div> */}
    </div>
  );
};

export default MealSelector;
