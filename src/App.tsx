import { useAuthStore } from "./stores/authStore";
import { LoginButton } from "./components/auth/LoginButton";
import { UserProfile } from "./components/auth/UserProfile";
import {
  StickyNote,
  Plus,
  Search,
  Sparkles,
  Shield,
  Cloud,
  Zap,
} from "lucide-react";

function App() {
  const { user, isLoading, isAuthenticated } = useAuthStore();

  // Loading state con mejor diseño
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-violet-600 via-purple-600 to-blue-600 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <StickyNote className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-xl text-white/90 font-medium">
            Cargando Notes App...
          </p>
        </div>
      </div>
    );
  }

  // Landing page - Diseño según inicio.png
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-violet-950 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md">
          <LoginButton />
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <button className="hover:text-slate-300 transition-colors">
              Términos de servicio
            </button>
            <button className="hover:text-slate-300 transition-colors">
              Política de privacidad
            </button>
            <button className="hover:text-slate-300 transition-colors">
              Ayuda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Aplicación autenticada mejorada
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      {/* Header mejorado */}
      <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo mejorado */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <StickyNote className="w-10 h-10 text-violet-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800 dark:text-white">
                  Notes App
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Tu espacio personal
                </p>
              </div>
            </div>

            <UserProfile />
          </div>
        </div>
      </header>

      {/* Main Content mejorado */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome hero mejorado */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">¡Autenticación completada!</span>
            </div>

            <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-6">
              ¡Bienvenido,{" "}
              <span className="bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {user.email?.split("@")[0]}
              </span>
              ! 👋
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Tu espacio personal de notas está listo. En la siguiente fase
              implementaremos todas las funcionalidades para crear y gestionar
              tus notas.
            </p>
          </div>

          {/* Success status */}
          <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center mb-12 shadow-xl">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">
                Fase 5 Completada Exitosamente
              </h3>
            </div>
            <p className="text-green-100 mb-4">
              Sistema de autenticación implementado y funcionando
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-2">
              <Zap className="w-4 h-4" />
              <span className="font-medium">
                Próximo paso: Sistema de notas CRUD
              </span>
            </div>
          </div>

          {/* Preview cards mejoradas */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Crear Notas
              </h3>
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <span>Notas tipo post-it coloridas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <span>Selección de 8 colores</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <span>Edición en tiempo real</span>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-linear-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Organizar
              </h3>
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Búsqueda inteligente</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Filtrar por colores</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Archivar y organizar</span>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 xl:col-span-1">
              <div className="w-14 h-14 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cloud className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Sincronización
              </h3>
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Guardado automático</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Acceso desde cualquier dispositivo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Modo offline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
