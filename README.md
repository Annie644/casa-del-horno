# Casa del Horno — App Móvil de Panadería Artesanal

**Casa del Horno** es un concepto de aplicación móvil (Mobile-First, ~390px) orientada al comercio electrónico de panadería artesanal de alta gama. El proyecto combina una estética cálida con patrones modernos de interfaz como *Glassmorphism*, *Tonal Layering* y *Grids asimétricos tipo Bento*.

---

## Sistema de Diseño y Enfoque UI/UX

* **Estilo Visual:** Inspirado en la calidez de un horno tradicional. Uso de tonos tierra, crema y marrones cálidos como paleta primaria, acompañados de un naranja/ámbar de acento para llamadas a la acción (CTAs) y precios.
* **Tonal Layering:** Fondo y contenedores estructurados por capas cromáticas de una misma gama para dar profundidad visual sin recargar la pantalla.
* **Glassmorphism:** Efecto de desenfoque y translucidéz (`backdrop-blur`) en el resumen de pedido durante el Checkout para priorizar la jerarquía de información.
* **Tipografía Editorial:** Encabezados con tipografía *serif* para evocar un sentimiento artesanal e ingredientes de autor, combinados con una tipografía *sans-serif* limpia para la lecturabilidad de datos y precios.
* **Diseño UI Adaptativo:** Layouts asimétricos (Bento Grid) para destacar productos estrella mediante imágenes protagonistas (*hero images*).

---

## Arquitectura de Información y Pantallas

El prototipo abarca un flujo de usuario completo de 8 pantallas interactivas:

1. **Login & Onboarding:** Autenticación con imagen *Hero Background* y acceso directo.
2. **Inicio (Home):** Saludo personalizado, buscador, carrusel de categorías y recomendaciones en *Bento Grid*.
3. **Catálogo (Bakery):** Filtros por tipo de producto y navegación por colecciones ("Bread Box").
4. **Detalle de Producto:** Vista libre de distracciones (Top App Bar suprimida), etiquetas de valor ("Sin gluten", "Recién horneado") e ingredientes estructurados por capas.
5. **Carrito de Compras:** Lista de ítems diferenciados por tono de fondo (sin divisores rígidos) y barra de navegación con estado activo.
6. **Checkout & Pago:** Proceso de pago en 1-Click con selección de método de pago accesible y resumen en cristal (*glassmorphism*).
7. **Confirmación de Pedido:** Pantalla de éxito visual con detalles de orden y anclaje gráfico.
8. **Historial de Órdenes:** Tarjetas de seguimiento de pedidos en curso y archivo de compras anteriores.

---

## Especificaciones Técnicas

* **Framework:** React + Tailwind CSS
* **Estrategia Layout:** Mobile-First (~390px)
* **Iconografía:** Lucide Icons
* **Estructura de Datos (Supabase Ready):** Diseñado para integración con tablas de `products`, `categories`, `orders` y `users`.

---

## Desarrollo Local

```sh
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/casa-del-horno.git

# 2. Entrar a la carpeta
cd casa-del-horno

# 3. Instalar dependencias con pnpm
pnpm install

# 4. Iniciar el servidor de desarrollo
pnpm dev

 **Nota de Portafolio:** 
Proyecto diseñado y prototipado enfocado en Experiencia de Usuario (UX) e Interfaz de Usuario (UI), utilizando herramientas de generación asistida para desarrollo ágil y refactorizado manualmente en VS Code.
