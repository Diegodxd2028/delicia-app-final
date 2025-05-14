import React, { useState }  from 'react';
import './Home.css';

const Home = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      
      
    {/* Barra superior con logo y navegación */}
    <header class="barra-superior">
        <div class="nombre-negocio">Panadería Delicia</div>
        <nav>
            <a href="#"><i class="fas fa-home"></i> Inicio</a>
            <a href="#"><i class="fas fa-bread-slice"></i> Productos</a>
            <a href="#pedidos"><i class="fas fa-shopping-cart"></i> Pedidos</a>
        </nav>
        <div class="user-auth">
           
           {/*  <button id="login-btn" class="auth-btn"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button> */}
           { /* <button id="register-btn" class="auth-btn"><i class="fas fa-user-plus"></i> Registrarse</button> */}

          <button className="auth-btn" onClick={() => setShowLogin(true)}>
            <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
          </button>
          <button className="auth-btn" onClick={() => setShowRegister(true)}>
            <i className="fas fa-user-plus"></i> Registrarse
          </button>

            <span id="user-greeting" style={{display: 'none'}}></span>
            <button id="logout-btn" class="auth-btn" style={{ display: 'none'}}><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</button>
        </div>
    </header>

    {/* Hero Section */}
    <section class="hero">
        <div class="hero-content">
            <h1>Panadería y Pastelería Delicia</h1>
            <p class="subtexto">El sabor que enamora</p>
            <div class="hero-text">
                <p>Somos una panadería artesanal dedicada a ofrecer panes y pasteles frescos todos los días. Usamos ingredientes de calidad y mucho amor.</p>
                <a href="productos.html" class="btn-primario">Ver Productos</a>
            </div>
        </div>
    </section>


{/* Modal de Login */}
      {showLogin && (
        <div className="auth-modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowLogin(false)}>&times;</span>
            <h2>Iniciar Sesión</h2>
            <form>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" required />
              </div>
              <button type="submit" className="btn-primario">Ingresar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      {showRegister && (
        <div className="auth-modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowRegister(false)}>&times;</span>
            <h2>Registrarse</h2>
            <form>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" required />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input type="text" />
              </div>
              <button type="submit" className="btn-primario">Registrarse</button>
            </form>
          </div>
        </div>
        )}


    {/* Sección de Destacados */}
    <section class="destacados">
        <div class="container">
            <h2>Nuestros Productos Destacados</h2>
            <div class="destacados-grid">
                <div class="destacado-item">
                    <img src="imagenes/pan-frances.png" alt="Pan francés" class="zoom-img"/>
                    <h3>Pan Francés</h3>
                    <p>Recién horneado todos los días</p>
                    <span class="precio">S/2.00</span>
                </div>
                <div class="destacado-item">
                    <img src="imagenes/empanadas-de-pollo.png" alt="Empanada de pollo" class="zoom-img"/>
                    <h3>Empanadas de Pollo</h3>
                    <p>Rellenas con ingredientes frescos</p>
                    <span class="precio">S/5.00</span>
                </div>
                <div class="destacado-item">
                    <img src="imagenes/pastel-de-chocolate.png" alt="Pastel de chocolate" class="zoom-img"/>
                    <h3>Pastel de Chocolate</h3>
                    <p>Puro sabor en cada rebanada</p>
                    <span class="precio">S/20.00</span>
                </div>
                <div class="destacado-item">
                    <img src="imagenes/pay-de-manzana.png" alt="Pay de manzana" class="zoom-img"/>
                    <h3>Pay de manzana</h3>
                    <p>Dulce sabor a manzana</p>
                    <span class="precio">S/10.00</span>
                </div>
                <div class="destacado-item">
                    <img src="imagenes/bizcochos-de-vainilla.png" alt="Bizcocho de vainilla" class="zoom-img"/>
                    <h3>Bizcocho de vainilla</h3>
                    <p>Un sabor que gusta</p>
                    <span class="precio">S/12.00</span>
                </div>
            </div>
        </div>
    </section>

    {/* Sección de Sobre Nosotros */}
    <section class="sobre-nosotros">
        <div class="container">
            <div class="sobre-content">
                <div class="sobre-text">
                    <h2>Nuestra Historia</h2>
                    <p>Desde 1985, Panadería Delicia ha sido un referente en la elaboración de productos artesanales de la más alta calidad. Nuestro secreto es la combinación de técnicas tradicionales con ingredientes seleccionados.</p>
                    <ul class="sobre-lista">
                        <li><i class="fas fa-check"></i> Ingredientes 100% naturales</li>
                        <li><i class="fas fa-check"></i> Elaboración artesanal</li>
                        <li><i class="fas fa-check"></i> Horneado diario</li>
                    </ul>
                </div>
                <div class="sobre-img">
                    <img src="imagenes/panaderia-interior.jpg" alt="Interior de nuestra panadería"/>
                </div>
            </div>
        </div>
    </section>

    {/* Sección de Testimonios */}
    <section class="testimonios">
        <div class="container">
            <h2>Lo que dicen nuestros clientes</h2>
            <div class="testimonios-grid">
                <div class="testimonio-item">
                    <div class="testimonio-text">
                        <p>"El mejor pan francés que he probado en mi vida. Siempre fresco y delicioso."</p>
                    </div>
                    <div class="testimonio-autor">
                        <img src="imagenes/usuario.png" alt="Cliente satisfecho"/>
                        <h4>María González</h4>
                        <span>Cliente frecuente</span>
                    </div>
                </div>
                <div class="testimonio-item">
                    <div class="testimonio-text">
                        <p>"Las empanadas son simplemente increíbles. Siempre pido para llevar cuando visito la ciudad."</p>
                    </div>
                    <div class="testimonio-autor">
                        <img src="imagenes/usuario.png" alt="Cliente satisfecho"/>
                        <h4>Carlos Mendoza</h4>
                        <span>Cliente desde 2010</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Sección de Pedidos */}
    <section id="pedidos" class="pedidos-section">
        <div class="container">
            <h2>Haz tu Pedido</h2>
            <div class="pedidos-content">
                <form class="pedidos-form">
                    <div class="form-group">
                        <label for="nombre">Nombre completo</label>
                        <input type="text" id="nombre" name="nombre" required/>
                    </div>
                    <div class="form-group">
                        <label for="telefono">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" required/>
                    </div>
                    <div class="form-group">
                        <label for="producto">¿Qué deseas ordenar?</label>
                        <select id="producto" name="producto" required>
                            <option value="">Selecciona un producto</option>
                            <option value="pan-frances">Pan Francés</option>
                            <option value="empanada-pollo">Empanada de Pollo</option>
                            <option value="pastel-chocolate">Pastel de Chocolate</option>
                            <option value="biscocho-vainilla">Biscocho de Vainilla</option>
                            <option value="pay-manzana">Pay de Manzana</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cantidad">Cantidad</label>
                        <input type="number" id="cantidad" name="cantidad" min="1" required/>
                    </div>
                    <div class="form-group">
                        <label for="fecha">Fecha de recolección</label>
                        <input type="date" id="fecha" name="fecha" required/>
                    </div>
                    <button type="submit" class="btn-primario">Enviar Pedido</button>
                </form>
                <div class="pedidos-info">
                    <h3>Horario de atención</h3>
                    <p><i class="fas fa-clock"></i> Lunes a Viernes: 7:00 am - 8:00 pm</p>
                    <p><i class="fas fa-clock"></i> Sábados: 7:00 am - 6:00 pm</p>
                    <p><i class="fas fa-clock"></i> Domingos: 8:00 am - 2:00 pm</p>
                    
                    <h3>Métodos de pago</h3>
                    <div class="metodos-pago">
                        <i class="fab fa-cc-visa"></i>
                        <i class="fab fa-cc-mastercard"></i>
                        <i class="fab fa-cc-amex"></i>
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Modal de Inicio de Sesión */}
    <div id="login-modal" class="auth-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Iniciar Sesión</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="login-email">Correo Electrónico</label>
                    <input type="email" id="login-email" required/>
                </div>
                <div class="form-group">
                    <label for="login-password">Contraseña</label>
                    <input type="password" id="login-password" required/>
                </div>
                <button type="submit" class="btn-primario">Ingresar</button>
            </form>
        </div>
    </div>

    {/* Modal de Registro */}
    <div id="register-modal" class="auth-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Registrarse</h2>
            <form id="register-form">
                <div class="form-group">
                    <label for="register-name">Nombre Completo</label>
                    <input type="text" id="register-name" required/>
                </div>
                <div class="form-group">
                    <label for="register-email">Correo Electrónico</label>
                    <input type="email" id="register-email" required/>
                </div>
                <div class="form-group">
                    <label for="register-password">Contraseña</label>
                    <input type="password" id="register-password" required/>
                </div>
                <div class="form-group">
                    <label for="register-phone">Teléfono</label>
                    <input type="tel" id="register-phone" required/>
                </div>
                <div class="form-group">
                    <label for="register-address">Dirección (opcional)</label>
                    <input type="text" id="register-address"/>
                </div>
                <button type="submit" class="btn-primario">Registrarse</button>
            </form>
        </div>
    </div>

    {/* Pie de página */}
    <footer class="pie-pagina">
        <div class="container">
            <div class="footer-content">
                <div class="footer-col">
                    <h3>Panadería Delicia</h3>
                    <p>El sabor tradicional que tu familia merece.</p>
                    <div class="footer-social">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h3>Enlaces</h3>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="productos.html">Productos</a></li>
                        <li><a href="#pedidos">Pedidos</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Contacto</h3>
                    <p><i class="fas fa-map-marker-alt"></i> Calle Panadería 123, Ciudad</p>
                    <p><i class="fas fa-phone"></i> (123) 456-7890</p>
                    <p><i class="fas fa-envelope"></i> info@panaderiadelicia.com</p>
                </div>
                <div class="footer-col">
                    <h3>Newsletter</h3>
                    <p>Suscríbete para recibir promociones</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Tu correo electrónico" required/>
                        <button type="submit"><i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Panadería Delicia. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

      


    </>
  );
};

export default Home;
