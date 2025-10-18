import React from "react";
import { X, Edit, Trash2, Clock, Users } from "lucide-react";

export default function RecipeDetailsModal({
  isOpen,
  onClose,
  recipe,
  onEdit,
  onDelete,
}) {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {recipe.title}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Editar receita"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Excluir receita"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-lg">
                    Sem imagem disponível
                  </span>
                </div>
              )}

              {/* Info Cards */}
              {(recipe.prepTime || recipe.servings) && (
                <div className="grid grid-cols-2 gap-4">
                  {recipe.prepTime && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-900 dark:text-blue-200">
                          Tempo
                        </span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300">
                        {recipe.prepTime} minutos
                      </p>
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-green-900 dark:text-green-200">
                          Porções
                        </span>
                      </div>
                      <p className="text-green-700 dark:text-green-300">
                        {recipe.servings}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Ingredientes
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">
                        •
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Modo de Preparo
                </h3>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {recipe.instructions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
