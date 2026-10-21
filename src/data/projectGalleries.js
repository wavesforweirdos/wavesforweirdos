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
import photoListadoDesktop from '../assets/projects/photo-gallery/listado-desktop.jpg'
import photoDetalleDesktop from '../assets/projects/photo-gallery/detalle-desktop.jpg'
import photoListadoTablet from '../assets/projects/photo-gallery/listado-tablet.jpg'
import photoListadoMobile from '../assets/projects/photo-gallery/listado-mobile.jpg'
import photoDetalleMobile from '../assets/projects/photo-gallery/detalle-mobile.jpg'
import photoFocoInput from '../assets/projects/photo-gallery/foco-input.jpg'

// width/height: dimensiones reales de cada imagen. Evitan saltos de layout al
// cargar y definen la orientación (horizontal = ocupa las 2 columnas).
const projectGalleries = {
  'zara-phones': [
    { src: zaraListado, width: 1440, height: 900, tags: ['listado', 'búsqueda', 'filtro'] },
    { src: zaraFicha, width: 1440, height: 900, tags: ['ficha', 'color', 'stock'] },
    { src: zaraHover, width: 620, height: 320, tags: ['hover', 'listado', 'desktop'] },
    { src: zaraBusqueda, width: 1440, height: 420, tags: ['búsqueda', 'filtrado', 'desktop'] },
    { src: zaraFichaConfig, width: 1440, height: 900, tags: ['ficha', 'storage', 'specs'] },
    { src: zaraCarrito, width: 1440, height: 900, tags: ['carrito', 'checkout'] },
    { src: zaraMobileListado, width: 390, height: 844, tags: ['listado', 'mobile', '390px'] },
    { src: zaraMobileFicha, width: 390, height: 844, tags: ['ficha', 'mobile', '390px'] },
    { src: zaraTabletListado, width: 834, height: 1112, tags: ['listado', 'tablet', '834px'] },
  ],
  'photo-gallery': [
    { src: photoListadoDesktop, width: 1568, height: 782, tags: ['búsqueda', 'mosaico', 'desktop'] },
    { src: photoDetalleDesktop, width: 1568, height: 782, tags: ['detalle', 'atribución', 'desktop'] },
    { src: photoListadoTablet, width: 917, height: 810, tags: ['listado', 'tablet', '834px'] },
    { src: photoListadoMobile, width: 429, height: 810, tags: ['listado', 'mobile', '390px'] },
    { src: photoDetalleMobile, width: 429, height: 810, tags: ['detalle', 'mobile', '390px'] },
    { src: photoFocoInput, width: 1568, height: 300, tags: ['input', 'foco', 'teclado'] },
  ],
  '3x3-basket-league': [{ src: basketCover, width: 404, height: 316, tags: ['landing'] }],
  'mission-list': [{ src: missionCover, width: 404, height: 316, tags: ['gestión'] }],
}

export default projectGalleries
