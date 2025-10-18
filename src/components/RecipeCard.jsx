import React from "react";
import { Edit, Trash2, Clock, Users, Eye } from "lucide-react";

export default function RecipeCard({
  recipe,
  onEdit,
  onDelete,
  onViewDetails,
}) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={onViewDetails}
    >
      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-lg">
            Sem imagem
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {recipe.title}
          </h3>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Editar receita"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Excluir receita"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          {recipe.prepTime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime} min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} porções</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Ingredientes:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <li key={index} className="line-clamp-1">
                  • {ingredient}
                </li>
              ))}
              {recipe.ingredients.length > 3 && (
                <li className="text-blue-600 dark:text-blue-400">
                  +{recipe.ingredients.length - 3} mais ingredientes
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Modo de preparo:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
