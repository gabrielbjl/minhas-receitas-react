import React, { useState } from "react";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import RecipeDetailsModal from "./components/RecipeDetailsModal";
import { useRecipes } from "./hooks/useRecipes";

export default function App() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      recipe.instructions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecipe = (recipeData) => {
    addRecipe(recipeData);
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const handleEditRecipe = (recipeData) => {
    updateRecipe(editingRecipe.id, recipeData);
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (id) => {
    deleteRecipe(id);
  };

  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        onAddClick={() => {
          setEditingRecipe(null);
          setIsModalOpen(true);
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Nenhuma receita encontrada
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm
                ? "Tente outra busca ou"
                : "Adicione sua primeira receita"}
            </p>
            <button
              onClick={() => {
                setEditingRecipe(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Adicionar Receita
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={() => handleEditClick(recipe)}
                onDelete={() => handleDeleteRecipe(recipe.id)}
                onViewDetails={() => handleViewDetails(recipe)}
              />
            ))}
          </div>
        )}
      </main>

      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecipe(null);
        }}
        onSubmit={editingRecipe ? handleEditRecipe : handleAddRecipe}
        recipe={editingRecipe}
      />

      <RecipeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedRecipe(null);
        }}
        recipe={selectedRecipe}
        onEdit={() => {
          setEditingRecipe(selectedRecipe);
          setIsModalOpen(true);
          setIsDetailsModalOpen(false);
        }}
        onDelete={() => {
          handleDeleteRecipe(selectedRecipe.id);
          setIsDetailsModalOpen(false);
          setSelectedRecipe(null);
        }}
      />
    </div>
  );
}
