import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const Registro = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación en tiempo real para contraseñas
    if (name === "password" || name === "confirmPassword") {
      validatePasswords(value, name);
    }
  };

  const validatePasswords = (value, fieldName) => {
    const updated = {
      ...formulario,
      [fieldName]: value
    };
    if (updated.password && updated.confirmPassword) {
      if (updated.password !== updated.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
      } else {
        setErrors(prev => {
          const { confirmPassword, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formulario.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formulario.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
      newErrors.email = "Email no válido";
    }

    if (!formulario.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formulario.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formulario.password !== formulario.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/registro",
        {
          nombre: formulario.nombre,
          email: formulario.email,
          password: formulario.password
        }
      );

      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión', {
        position: "top-right",
        autoClose: 5000,
      });

      // Limpiar formulario después del registro
      setFormulario({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      let errorMessage = "Ocurrió un error al registrar";

      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "Este email ya está registrado";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }

      toast.error(errorMessage, {
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
          <h2 className="text-3xl font-bold text-white">Únete a Delicia</h2>
          <p className="text-pink-100 mt-2">Crea tu cuenta en minutos</p>
        </div>

        <div className="p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Campo Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-pink-600" />
                  Nombre completo
                </label>
                <div className="relative">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formulario.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-10 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                    placeholder="Tu nombre completo"
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
              </div>

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
                    value={formulario.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-10 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                    placeholder="correo@ejemplo.com"
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                    value={formulario.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-10 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all pr-10`}
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Campo Confirmar Contraseña */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-pink-600" />
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formulario.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-10 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
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
                  Registrando...
                </>
              ) : 'Crear cuenta'}
            </button>
          </form>

          {/* Enlace a login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                to="/login" 
                className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;