import { NOTE_COLORS } from "./utils/constants";

function App() {
  return (
    <div className="bg-linear-to-br from-indigo-500 to-purple-600 min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8">🏗️ Arquitectura Lista</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Configuración de tipos:
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Tipos de base de datos:</span>
              <span className="text-green-300">✅ Configurado</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Tipos de aplicación:</span>
              <span className="text-green-300">✅ Configurado</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Constantes y colores:</span>
              <span className="text-green-300">
                ✅ {NOTE_COLORS.length} colores
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Supabase tipado:</span>
              <span className="text-green-300">✅ Configurado</span>
            </div>
          </div>

          {/* Mostrar colores reales como post-its */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4 text-white">
              Colores para post-its:
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {NOTE_COLORS.map((color) => (
                <div
                  key={color.value}
                  className={`${color.bg} ${color.text} ${color.border} p-3 rounded-lg shadow-md border transform hover:scale-105 transition-transform cursor-pointer`}
                >
                  <div className="text-sm font-medium">{color.name}</div>
                  <div className="text-xs mt-1 opacity-80">Post-it</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-500/20 rounded-lg">
            <p className="text-green-200">
              🎉 ¡Arquitectura y tipos configurados!
              <br />
              Listo para implementar autenticación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
