import { useState, useEffect } from "react";
import { mockRecipes } from "../utils/mockData";

const RECIPE_STORAGE_KEY = "recipes_app_recipes";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState(mockRecipes);

  useEffect(() => {
    const savedRecipes = localStorage.getItem(RECIPE_STORAGE_KEY);
    if (savedRecipes) {
      try {
        setRecipes(JSON.parse(savedRecipes));
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
        setRecipes([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(RECIPE_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipeData) => {
    const newRecipe = {
      id: Date.now().toString(),
      ...recipeData,
      createdAt: new Date().toISOString(),
    };
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const updateRecipe = (id, recipeData) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, ...recipeData } : recipe
      )
    );
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  };
};
