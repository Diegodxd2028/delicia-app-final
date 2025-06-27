import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', formData);
      const usuario = response.data;

      if (!usuario || !usuario.id) {
        throw new Error("Respuesta inválida del servidor");
      }

      localStorage.setItem('usuario', JSON.stringify(usuario));

      toast.success(`Bienvenido, ${usuario.nombre}!`, {
        position: "top-right",
        autoClose: 3000,
      });

      navigate('/');
      window.location.reload();

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      const message = error.response?.data?.message || error.message || 'Credenciales incorrectas';
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-amber-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header con imagen */}
        <div className="bg-gradient-to-r from-pink-600 to-amber-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Bienvenido a Delicia</h2>
          <p className="text-pink-100 mt-2">Inicia sesión para continuar</p>
        </div>

        <div className="p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-pink-600" />
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="correo@ejemplo.com"
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-pink-600" />
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all pr-10"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">Recordar sesión</label>
              </div>

              <a 
                href="/recuperar-contrasena" 
                className="text-sm font-medium text-pink-600 hover:text-pink-500 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 text-white bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 rounded-lg font-medium transition-all shadow-md hover:shadow-lg ${loading ? 'opacity-80' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Enlace a registro */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿No tienes una cuenta?{' '}
              <a 
                href="/registro" 
                className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;