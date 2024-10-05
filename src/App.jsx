import React, { useState } from 'react';
import { PersonFillIcon } from '@primer/octicons-react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Personalize");
  
  // State to manage selected recipes and items
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [selectedItems, setSelectedItems] = useState(Array(5).fill(false)); // Example initial state

  // Example list of recipes
  const recipes = [
    { title: "Spaghetti Bolognese", description: "A delicious Italian classic" },
    { title: "Chicken Curry", description: "Spicy and flavorful" },
    { title: "Grilled Cheese Sandwich", description: "A quick and tasty snack" },
    { title: "Caesar Salad", description: "Healthy and refreshing" },
    { title: "Chocolate Cake", description: "Rich and decadent dessert" }
  ];

  // Function to toggle recipe selection
  const toggleSelectRecipe = (index) => {
    setSelectedRecipes((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index); // Unselect if already selected
      } else {
        return [...prevSelected, index]; // Select if not selected
      }
    });
  };

  // Function to toggle item selection
  const toggleSelectItem = (index) => {
    setSelectedItems((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index]; // Toggle selection
      return newSelected;
    });
  };

  // Function to handle the "Next" button click
  const handleNext = () => {
    // Move to the next section
    setSelectedMenu(selectedMenu === "Choose" ? "Review" : "Choose");
  };

  // Render the selected recipes in the "Review" section
  const renderSelectedRecipes = () => {
    const selectedRecipeObjects = selectedRecipes.map(index => recipes[index]);
    return selectedRecipeObjects.length > 0 ? (
      selectedRecipeObjects.map((recipe, index) => (
        <div
          key={index}
          className="recipe-container"
          style={{ backgroundColor: '#D9D9D9' }}
        >
          <div className="recipe-text">
            <div className="recipe-title">{recipe.title}</div>
            <div className="recipe-description">{recipe.description}</div>
          </div>
          <div className="recipe-picture"></div>
        </div>
      ))
    ) : (
      <div>No recipes selected yet.</div>
    );
  };

  // Render content based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "Personalize":
        return (
          <div className="personalize-content">
            <h1 className="personalize-title">Personalize</h1>
            
            {/* Cuisine styles section */}
            <div className="menu-descriptor">Choose from the list of cuisine styles</div>
            <div className="personalize-select-container">
              {selectedItems.map((isSelected, index) => (
                <div
                  key={index}
                  className={`personalize-select-item ${isSelected ? 'selected' : ''}`} // Correct class name and condition
                  onClick={() => toggleSelectItem(index)} // Toggle on click
                >
                  Hello {index + 1} {/* Adding an index to differentiate items */}
                </div>
              ))}
            </div>
            
            {/* Custom recipe interests section */}
            <div className="menu-descriptor">Add custom recipe interests here</div>
            
            {/* Text Input Box */}
            <input
              type="text"
              placeholder="Enter your custom recipe interests"
              className="custom-recipe-input"
            />
            
            {/* Next Button */}
            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case "Choose":
        return (
          <div className="personalize-content">
            <h1 className="personalize-title">Choose</h1>
            <div className="menu-descriptor">Choose from the list of generated recipes</div>
            <div className="recipes-container">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className={`recipe-container ${selectedRecipes.includes(index) ? 'selected' : ''}`}
                  onClick={() => toggleSelectRecipe(index)} // Toggle recipe selection
                  style={{ backgroundColor: selectedRecipes.includes(index) ? '#D9D9D9' : '#F4F4F4' }} // Set background based on selection
                >
                  <div className="recipe-text">
                    <div className="recipe-title">{recipe.title}</div>
                    <div className="recipe-description">{recipe.description}</div>
                  </div>
                  <div className="recipe-picture"></div>
                </div>
              ))}
            </div>
            {/* Next Button */}
            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case "Review":
        return (
          <div className="personalize-content">
            <h1 className="personalize-title">Review</h1>
            <div className="menu-descriptor">Review the selected recipes and their ingredients</div>
            <div className="recipes-container">
              {renderSelectedRecipes()} {/* Display selected recipes */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <div className="top-bar-left">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="top-bar-text">Grocery Optimizer</span>
          </div>
          <div className="top-bar-right">
            <div className="user-icon-circle">
              <PersonFillIcon size={24} />
            </div>
          </div>
        </div>
      </header>

      <div className="menu-bar">
        {["Personalize", "Choose", "Review"].map(menuItem => (
          <div
            key={menuItem}
            className={`menu-item ${selectedMenu === menuItem ? 'selected' : ''}`}
            onClick={() => setSelectedMenu(menuItem)}
          >
            {menuItem}
          </div>
        ))}
      </div>

      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
