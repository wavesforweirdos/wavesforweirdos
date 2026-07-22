// Capturas reales de proyectos (deploy en vivo o cover de Behance cuando no
// hay demo desplegada). No todos los proyectos tienen imágenes todavía —
// se añaden aquí a medida que estén disponibles, sin tocar ProjectDetail.
// `tags`: equivalente a la ficha EXIF (f/4.0 · ISO100) del diseño original,
// aquí describiendo qué muestra cada captura en vez de datos de cámara.
import zaraListado from '../assets/projects/zara-phones/listado.png'
import zaraFicha from '../assets/projects/zara-phones/ficha-producto.png'
import zaraHover from '../assets/projects/zara-phones/hover-listado.png'
import zaraBusqueda from '../assets/projects/zara-phones/busqueda-filtrado.png'
import zaraFichaConfig from '../assets/projects/zara-phones/ficha-configuracion.png'
import zaraCarrito from '../assets/projects/zara-phones/carrito.png'
import zaraMobileListado from '../assets/projects/zara-phones/mobile-listado.png'
import zaraMobileFicha from '../assets/projects/zara-phones/mobile-ficha.png'
import zaraTabletListado from '../assets/projects/zara-phones/tablet-listado.png'
import basketCover from '../assets/projects/3x3-basket-league/cover.jpg'
import missionCover from '../assets/projects/mission-list/cover.jpg'

const projectGalleries = {
  'zara-phones': [
    { src: zaraListado, tags: ['listado', 'búsqueda', 'filtro'] },
    { src: zaraFicha, tags: ['ficha', 'color', 'stock'] },
    { src: zaraHover, tags: ['hover', 'listado', 'desktop'] },
    { src: zaraBusqueda, tags: ['búsqueda', 'filtrado', 'desktop'] },
    { src: zaraFichaConfig, tags: ['ficha', 'storage', 'specs'] },
    { src: zaraCarrito, tags: ['carrito', 'checkout'] },
    { src: zaraMobileListado, tags: ['listado', 'mobile', '390px'] },
    { src: zaraMobileFicha, tags: ['ficha', 'mobile', '390px'] },
    { src: zaraTabletListado, tags: ['listado', 'tablet', '834px'] },
  ],
  '3x3-basket-league': [{ src: basketCover, tags: ['landing'] }],
  'mission-list': [{ src: missionCover, tags: ['gestión'] }],
}

export default projectGalleries
