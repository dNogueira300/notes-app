import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  ArrowRight,
  StickyNote,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

export const LoginButton = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signUp, signInWithGoogle, isLoading, error, clearError } =
    useAuthStore();

  const closeModals = useCallback(() => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
    setEmail("");
    setPassword("");
    setShowPassword(false);
    clearError();
  }, [clearError]);

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (isLoginOpen || isSignUpOpen)) {
        closeModals();
      }
    };

    if (isLoginOpen || isSignUpOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isLoginOpen, isSignUpOpen, closeModals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      if (isSignUpOpen) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }

      closeModals();
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
    clearError();
  };

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
    clearError();
  };

  // Manejar clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModals();
    }
  };

  // Calcular fortaleza de contraseña
  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 10) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return Math.min(strength, 3);
  };

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <>
      {/* Tarjeta de bienvenida - Diseño según inicio.png */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl">
        {/* Icono circular con fondo púrpura */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-600 blur-2xl opacity-60 rounded-full"></div>
            <div className="relative w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center">
              <StickyNote className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Bienvenido
        </h1>

        {/* Descripción */}
        <p className="text-slate-300 text-center mb-8 leading-relaxed">
          Organiza tus ideas, listas y proyectos en un espacio diseñado para tu
          creatividad.
        </p>

        {/* Botón Iniciar Sesión */}
        <button
          onClick={openLoginModal}
          className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors mb-4 shadow-lg shadow-violet-600/30"
        >
          <span>Iniciar Sesión</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Botón Google */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
            />
            <path
              fill="#34A853"
              d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
            />
            <path
              fill="#4A90E2"
              d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
            />
            <path
              fill="#FBBC05"
              d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>

        {/* Divisor */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="text-slate-500 text-sm">o</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Texto de registro */}
        <p className="text-center text-slate-400 text-sm">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={openSignUpModal}
            className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
          >
            Regístrate aquí
          </button>
        </p>
      </div>

      {/* Modal de Iniciar Sesión - Diseño según iniciar sesion.png */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
          onClick={handleOverlayClick}
        >
          <div className="relative w-full max-w-md animate-slideUp">
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
              {/* Botón cerrar */}
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Contenido */}
              <div className="p-8">
                {/* Encabezado */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Iniciar Sesión
                  </h2>
                  <p className="text-slate-400">
                    Bienvenido de nuevo a tus notas
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                      placeholder="nombre@ejemplo.com"
                      required
                      autoComplete="email"
                    />
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 pr-12 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                        placeholder="••••••••"
                        minLength={6}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <div className="text-right mt-2">
                      <button
                        type="button"
                        className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors shadow-lg shadow-violet-600/20"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <span>Iniciar Sesión</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Divisor */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-slate-600"></div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider">
                    O continúa con
                  </span>
                  <div className="flex-1 h-px bg-slate-600"></div>
                </div>

                {/* Google Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 bg-slate-800/80 hover:bg-slate-700 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro - Diseño según crear cuenta.png */}
      {isSignUpOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
          onClick={handleOverlayClick}
        >
          <div className="relative w-full max-w-md animate-slideUp">
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Gradiente inferior decorativo */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-yellow-500 via-pink-500 to-violet-500"></div>

              {/* Contenido */}
              <div className="p-8">
                {/* Icono */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center">
                    <StickyNote className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Encabezado */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Crear cuenta
                  </h2>
                  <p className="text-slate-400">
                    Empieza a organizar tus ideas hoy.
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                      <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                        placeholder="ejemplo@correo.com"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label
                      htmlFor="signup-password"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 pl-10 pr-12 bg-slate-900/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                        placeholder="••••••••"
                        minLength={6}
                        required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Barra de fortaleza de contraseña */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1 h-1">
                          <div
                            className={`flex-1 rounded-full transition-colors ${
                              passwordStrength >= 1
                                ? "bg-red-500"
                                : "bg-slate-700"
                            }`}
                          ></div>
                          <div
                            className={`flex-1 rounded-full transition-colors ${
                              passwordStrength >= 2
                                ? "bg-yellow-500"
                                : "bg-slate-700"
                            }`}
                          ></div>
                          <div
                            className={`flex-1 rounded-full transition-colors ${
                              passwordStrength >= 3
                                ? "bg-green-500"
                                : "bg-slate-700"
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors shadow-lg shadow-violet-600/20"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <span>Registrarse</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Divisor */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-slate-600"></div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider">
                    O regístrate con
                  </span>
                  <div className="flex-1 h-px bg-slate-600"></div>
                </div>

                {/* Google Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 bg-white hover:bg-slate-100 text-slate-900 font-medium rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                {/* Link a login */}
                <p className="text-center text-slate-400 text-sm mt-6">
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    onClick={openLoginModal}
                    className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                  >
                    Inicia sesión
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
