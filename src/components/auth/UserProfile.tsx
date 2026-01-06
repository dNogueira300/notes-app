import { useState } from "react";
import { User, LogOut, Mail, Calendar } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isLoading } = useAuthStore();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 hover:bg-white/20 transition-colors"
      >
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-medium hidden sm:block">
          {user.email?.split("@")[0]}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white rounded-xl shadow-xl border border-gray-200 min-w-72 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {user.user_metadata?.name || user.email?.split("@")[0]}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>

            {/* Fecha de registro */}
            {user.created_at && (
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Desde {formatDate(user.created_at)}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 p-2">
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
          </div>
        </div>
      )}

      {/* Overlay para cerrar dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
