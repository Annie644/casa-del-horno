# Casa del Horno

Quiero construir "El Buen Horno", una app móvil de panadería (pedidos online) en React + Tailwind, mobile-first (ancho de referencia ~390px), basada en un prototipo de Figma de alta fidelidad con estética glassmorphism y "tonal layering" (capas de color en el mismo tono para dar profundidad).

## Paleta y estilo visual

- Estilo cálido de panadería artesanal: tonos tierra/marrón pan horneado como color primario, un acento cálido (ej. ámbar/naranja tostado) para CTAs y precios.

- Tarjetas con esquinas redondeadas (rounded-2xl), sombras suaves.

- Efecto glassmorphism (fondo semitransparente + blur) en el resumen de pedido del checkout.

- Tipografía: un heading serif o display para títulos de producto (sensación artesanal) + sans-serif limpia para el resto.

- Imágenes de producto grandes y protagonistas (hero images).

## Estructura de navegación

Bottom Navigation Bar fija con 4 secciones: Inicio, Bakery/Catálogo, Carrito, Historial.

Top App Bar con logo/marca, que en algunas pantallas se "suprime" visualmente (queda solo la marca, sin íconos de navegación) para dar foco total al contenido — por ejemplo en Detalle de Producto y en la pantalla de Confirmación de Pedido.

## Pantallas a construir (en este orden de flujo)

**1. Login**

- Hero Background Layer (imagen de fondo, ej. pan/horno) con overlay oscuro

- Header con logo y branding de "El Buen Horno"

- Formulario: email + contraseña, botón "Iniciar sesión"

- Footer con link secundario "¿No tienes cuenta? Regístrate"

**2. Inicio (Home)**

- Welcome Section: saludo personalizado al usuario

- Search Bar: buscador de productos

- Category Carousel: carrusel horizontal de categorías (ej. Panes, Pasteles, Galletas, Bebidas)

- Fresh Picks: grid asimétrico tipo "bento" con productos destacados/recomendados (mezcla de cards grandes y pequeñas, no todas del mismo tamaño)

**3. Catálogo (Bakery)**

- Hero Section / título editorial (ej. "Nuestra Panadería")

- Category Filter: píldoras de filtro horizontales ("Bread Box" — todos los panes, dulces, etc.)

- Product Grid en estilo bento/asimétrico con imagen, nombre y precio de cada producto

**4. Detalle de Producto**

- Header con navegación suprimida (solo marca, botón de volver)

- Hero Product Image grande

- Título y precio

- Tags/metadata en formato bento (ej. "Sin gluten", "Recién horneado", tiempo de preparación)

- Descripción del producto

- Sección de ingredientes con "tonal layering" (lista de ingredientes en tarjetas con tonos degradados del mismo color)

- Selector de cantidad (+/-)

- Botón fijo inferior "Agregar al carrito"

**5. Carrito**

- Lista de productos del carrito sin divisores entre ítems, usando cambios de tono de fondo para separar visualmente cada uno

- Resumen de orden (subtotal, envío, total)

- Botón "Proceder al pago"

- Bottom nav con el ícono de Carrito resaltado como activo

**6. Checkout / Pago**

- Header Section con resumen breve

- Method Selection: selección de método de pago (tarjeta, efectivo, etc.) en tarjetas seleccionables

- Payment Details: formulario de datos de pago (debe ser muy claro y accesible — este es un punto crítico de UX)

- Order Summary con efecto glassmorphism (fondo translúcido con blur sobre imagen o color de fondo)

- Botón "Confirmar y pagar" bien visible y fijo

**7. Confirmación de Pedido**

- Header con navegación suprimida

- Ilustración de éxito ("Joyful Success Illustration") — algo alegre, ej. ícono de check animado

- Título de confirmación

- Tarjeta tipo "bento" con detalles del pedido (número de orden, hora, items)

- Imagen de anclaje visual (ej. foto de pan recién horneado)

- Botón principal "Ver mi pedido" o "Volver al inicio"

**8. Historial de Órdenes**

- Lista de órdenes pasadas y activas (Order Cards), cada una mostrando: número de orden, nombre del producto principal, fecha/hora, cantidad de items, precio y estado (ej. "Activa/Reciente")

- Sección de ayuda/soporte al final

**9. Notificación (toast)**

- Componente de notificación flotante reutilizable para mensajes del sistema (ej. "Soporte no disponible por ahora")

## Modelo de datos (usar Supabase)

- `products`: id, nombre, descripción, precio, categoría, imagen_url, tags (array), destacado (bool)

- `categories`: id, nombre, ícono

- `orders`: id, usuario_id, productos (relación), estado, total, fecha, método_pago

- `order_items`: order_id, product_id, cantidad, precio_unitario

- `users`: autenticación estándar de Supabase (email/password)

## Componentes reutilizables (usarlos en todas las pantallas correspondientes)

- `TopAppBar` (con variante "suprimida": solo logo, sin íconos)

- `BottomNavBar` (con estado activo dinámico según la ruta actual)

- `OrderCard`

- `ProductCard` (variantes grande/pequeña para el grid bento)

- `Notification/Toast`

## Prioridad de implementación

1. Estructura de navegación + Login + Inicio

2. Catálogo + Detalle de Producto

3. Carrito + Checkout

4. Confirmación + Historial

5. Pulir microinteracciones (estados activos, glassmorphism, transiciones)

Empieza generando el sistema de diseño (colores, tipografía, componentes base) antes de construir las pantallas, para que todo sea consistente.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://casa-del-horno.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/402f1638-53e7-494f-a2b5-82b74823cf4b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
