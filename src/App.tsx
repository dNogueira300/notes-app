import { Heart, Star, CheckCircle } from "lucide-react";

function App() {
  return (
    <div className="bg-linear-to-br from-purple-500 via-blue-500 to-green-500 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
            <h1 className="text-5xl font-bold text-white">
              ¡Tailwind CSS v4 funcionando!
            </h1>
            <Star className="w-8 h-8 text-yellow-300" />
          </div>
          <p className="text-xl text-white/80">
            Todas las funcionalidades confirmadas
          </p>
        </header>

        {/* Grid de funcionalidades */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <Heart className="w-8 h-8 text-red-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Iconos Lucide</h3>
            <p className="text-white/70">✅ Funcionando</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <div className="w-8 h-8 bg-linear-to-r from-pink-500 to-yellow-500 rounded mb-3"></div>
            <h3 className="text-xl font-bold text-white mb-2">Gradientes</h3>
            <p className="text-white/70">✅ Funcionando</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <div className="w-8 h-8 bg-white rounded-full shadow-lg mb-3"></div>
            <h3 className="text-xl font-bold text-white mb-2">Efectos</h3>
            <p className="text-white/70">✅ Funcionando</p>
          </div>
        </div>

        {/* Test de colores para notas */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">
            Colores para notas tipo post-it:
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                name: "Amarillo",
                color: "bg-yellow-200",
                text: "text-yellow-800",
              },
              { name: "Rosa", color: "bg-pink-200", text: "text-pink-800" },
              { name: "Azul", color: "bg-blue-200", text: "text-blue-800" },
              { name: "Verde", color: "bg-green-200", text: "text-green-800" },
              {
                name: "Púrpura",
                color: "bg-purple-200",
                text: "text-purple-800",
              },
              {
                name: "Naranja",
                color: "bg-orange-200",
                text: "text-orange-800",
              },
              { name: "Rojo", color: "bg-red-200", text: "text-red-800" },
              { name: "Gris", color: "bg-gray-200", text: "text-gray-800" },
            ].map((note) => (
              <div
                key={note.name}
                className={`${note.color} ${note.text} p-3 rounded-lg shadow-md transform hover:scale-105 transition-transform cursor-pointer`}
              >
                <p className="font-medium text-sm">{note.name}</p>
                <p className="text-xs mt-1">Post-it style</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
