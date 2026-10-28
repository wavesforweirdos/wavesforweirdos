// Capturas reales de proyectos (deploy en vivo o cover de Behance cuando no
// hay demo desplegada). No todos los proyectos tienen imágenes todavía —
// se añaden aquí a medida que estén disponibles, sin tocar ProjectDetail.
// `tags`: equivalente a la ficha EXIF (f/4.0 · ISO100) del diseño original,
// aquí describiendo qué muestra cada captura en vez de datos de cámara.
import kfacilInicio from '../assets/projects/kfacil/inicio-desktop.webp'
import kfacilPropiedades from '../assets/projects/kfacil/propiedades-desktop.webp'
import kfacilInmueble from '../assets/projects/kfacil/inmueble-desktop.webp'
import kfacilServicios from '../assets/projects/kfacil/servicios-desktop.webp'
import kfacilAcceso from '../assets/projects/kfacil/acceso-desktop.webp'
import kfacilPanel from '../assets/projects/kfacil/panel-desktop.webp'
import kfacilGestion from '../assets/projects/kfacil/gestion-inmuebles-desktop.webp'
import kfacilNuevoInmueble from '../assets/projects/kfacil/nuevo-inmueble-desktop.webp'
import kfacilEditarInmueble from '../assets/projects/kfacil/editar-inmueble-desktop.webp'
import kfacilUsuarios from '../assets/projects/kfacil/usuarios-desktop.webp'
import kfacilNuevoUsuario from '../assets/projects/kfacil/nuevo-usuario-desktop.webp'
import kfacilPaginas from '../assets/projects/kfacil/gestion-paginas-desktop.webp'
import kfacilStudio from '../assets/projects/kfacil/studio-paginas-desktop.webp'
import kfacilNavbar from '../assets/projects/kfacil/navbar-desktop.webp'
import kfacilTipos from '../assets/projects/kfacil/tipos-propiedad-desktop.webp'
import kfacilAgente from '../assets/projects/kfacil/panel-agente-desktop.webp'
import kfacilPropiedadesTablet from '../assets/projects/kfacil/propiedades-tablet.webp'
import kfacilInicioMobile from '../assets/projects/kfacil/inicio-mobile.webp'
import kfacilInmuebleMobile from '../assets/projects/kfacil/inmueble-mobile.webp'
import zaraListado from '../assets/projects/zara-phones/listado.webp'
import zaraFicha from '../assets/projects/zara-phones/ficha-producto.webp'
import zaraHover from '../assets/projects/zara-phones/hover-listado.webp'
import zaraBusqueda from '../assets/projects/zara-phones/busqueda-filtrado.webp'
import zaraFichaConfig from '../assets/projects/zara-phones/ficha-configuracion.webp'
import zaraCarrito from '../assets/projects/zara-phones/carrito.webp'
import zaraMobileListado from '../assets/projects/zara-phones/mobile-listado.webp'
import zaraMobileFicha from '../assets/projects/zara-phones/mobile-ficha.webp'
import zaraTabletListado from '../assets/projects/zara-phones/tablet-listado.webp'
import mealBienvenida from '../assets/projects/meal-planner/bienvenida-desktop.webp'
import mealPlan from '../assets/projects/meal-planner/plan-desktop.webp'
import mealRecetas from '../assets/projects/meal-planner/recetas-desktop.webp'
import mealCompra from '../assets/projects/meal-planner/compra-desktop.webp'
import mealPlanOscuro from '../assets/projects/meal-planner/plan-oscuro-desktop.webp'
import mealPlanTablet from '../assets/projects/meal-planner/plan-tablet.webp'
import mealPlanMobile from '../assets/projects/meal-planner/plan-mobile.webp'
import mealRecetasMobile from '../assets/projects/meal-planner/recetas-mobile.webp'
import diceAcceso from '../assets/projects/dices-api-rest/acceso-desktop.webp'
import diceJuego from '../assets/projects/dices-api-rest/juego-desktop.webp'
import diceTiradas from '../assets/projects/dices-api-rest/tiradas-desktop.webp'
import diceRanking from '../assets/projects/dices-api-rest/ranking-desktop.webp'
import diceJuegoMobile from '../assets/projects/dices-api-rest/juego-mobile.webp'
import diceRankingMobile from '../assets/projects/dices-api-rest/ranking-mobile.webp'
import basketInicio from '../assets/projects/3x3-basket-league/inicio-desktop.webp'
import basketLiga from '../assets/projects/3x3-basket-league/liga-desktop.webp'
import basketEquipos from '../assets/projects/3x3-basket-league/equipos-desktop.webp'
import basketPartidos from '../assets/projects/3x3-basket-league/partidos-desktop.webp'
import basketLigaMobile from '../assets/projects/3x3-basket-league/liga-mobile.webp'
import basketCover from '../assets/projects/3x3-basket-league/cover.webp'
import missionLista from '../assets/projects/mission-list/lista-desktop.webp'
import missionAcceso from '../assets/projects/mission-list/acceso-desktop.webp'
import missionNueva from '../assets/projects/mission-list/nueva-mision-desktop.webp'
import missionListaMobile from '../assets/projects/mission-list/lista-mobile.webp'
import missionCover from '../assets/projects/mission-list/cover.webp'
import photoListadoDesktop from '../assets/projects/photo-gallery/listado-desktop.webp'
import photoDetalleDesktop from '../assets/projects/photo-gallery/detalle-desktop.webp'
import photoListadoTablet from '../assets/projects/photo-gallery/listado-tablet.webp'
import photoListadoMobile from '../assets/projects/photo-gallery/listado-mobile.webp'
import photoDetalleMobile from '../assets/projects/photo-gallery/detalle-mobile.webp'
import photoFocoInput from '../assets/projects/photo-gallery/foco-input.webp'

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
  'meal-planner': [
    { src: mealBienvenida, width: 1440, height: 900, tags: ['bienvenida', 'login', 'desktop'] },
    { src: mealPlan, width: 1440, height: 900, tags: ['plan', 'drag & drop', 'desktop'] },
    { src: mealRecetas, width: 1440, height: 900, tags: ['recetas', 'filtros', 'desktop'] },
    { src: mealCompra, width: 1440, height: 900, tags: ['lista de la compra', 'desktop'] },
    { src: mealPlanOscuro, width: 1440, height: 900, tags: ['plan', 'modo oscuro', 'desktop'] },
    { src: mealPlanTablet, width: 834, height: 1112, tags: ['plan', 'tablet', '834px'] },
    { src: mealPlanMobile, width: 390, height: 844, tags: ['plan', 'mobile', '390px'] },
    { src: mealRecetasMobile, width: 390, height: 844, tags: ['recetas', 'mobile', '390px'] },
  ],
  'dices-api-rest': [
    { src: diceAcceso, width: 1440, height: 900, tags: ['acceso', 'login', 'desktop'] },
    { src: diceJuego, width: 1440, height: 900, tags: ['juego', 'dados', 'desktop'] },
    { src: diceTiradas, width: 1440, height: 900, tags: ['tiradas', 'historial', 'desktop'] },
    { src: diceRanking, width: 1440, height: 900, tags: ['ranking', 'éxito', 'desktop'] },
    { src: diceJuegoMobile, width: 390, height: 844, tags: ['juego', 'mobile', '390px'] },
    { src: diceRankingMobile, width: 390, height: 844, tags: ['ranking', 'mobile', '390px'] },
  ],
  '3x3basketleague': [
    { src: basketInicio, width: 1440, height: 900, tags: ['inicio', 'landing', 'desktop'] },
    { src: basketLiga, width: 1440, height: 900, tags: ['liga', 'ficha', 'desktop'] },
    { src: basketEquipos, width: 1440, height: 900, tags: ['equipos', 'plantillas', 'desktop'] },
    { src: basketPartidos, width: 1440, height: 900, tags: ['partidos', 'resultados', 'desktop'] },
    { src: basketLigaMobile, width: 390, height: 844, tags: ['liga', 'mobile', '390px'] },
    { src: basketCover, width: 404, height: 316, tags: ['landing'] },
  ],
  'mission-list': [
    { src: missionLista, width: 1440, height: 900, tags: ['lista', 'filtros', 'desktop'] },
    { src: missionAcceso, width: 1440, height: 900, tags: ['acceso', 'login', 'desktop'] },
    { src: missionNueva, width: 1440, height: 900, tags: ['nueva misión', 'formulario', 'desktop'] },
    { src: missionListaMobile, width: 390, height: 844, tags: ['lista', 'mobile', '390px'] },
    { src: missionCover, width: 404, height: 316, tags: ['gestión'] },
  ],
  kfacil: [
    { src: kfacilInicio, width: 1440, height: 900, tags: ['inicio', 'landing', 'desktop'] },
    { src: kfacilPropiedades, width: 1440, height: 900, tags: ['propiedades', 'buscador', 'desktop'] },
    { src: kfacilInmueble, width: 1440, height: 900, tags: ['inmueble', 'ficha', 'desktop'] },
    { src: kfacilServicios, width: 1440, height: 900, tags: ['servicios', 'web pública', 'desktop'] },
    { src: kfacilAcceso, width: 1440, height: 900, tags: ['acceso', 'login', 'desktop'] },
    { src: kfacilPanel, width: 1440, height: 900, tags: ['panel', 'administración', 'desktop'] },
    { src: kfacilGestion, width: 1440, height: 900, tags: ['inmuebles', 'gestión', 'desktop'] },
    { src: kfacilNuevoInmueble, width: 1440, height: 900, tags: ['nuevo inmueble', 'formulario', 'desktop'] },
    { src: kfacilEditarInmueble, width: 1440, height: 900, tags: ['editar inmueble', 'imágenes y planos', 'desktop'] },
    { src: kfacilUsuarios, width: 1440, height: 900, tags: ['usuarios', 'roles', 'desktop'] },
    { src: kfacilNuevoUsuario, width: 1440, height: 900, tags: ['nuevo usuario', 'formulario', 'desktop'] },
    { src: kfacilPaginas, width: 1440, height: 900, tags: ['contenidos', 'páginas', 'desktop'] },
    { src: kfacilStudio, width: 1440, height: 900, tags: ['page studio', 'editor', 'desktop'] },
    { src: kfacilNavbar, width: 1440, height: 900, tags: ['navbar', 'configuración', 'desktop'] },
    { src: kfacilTipos, width: 1440, height: 900, tags: ['catálogos', 'tipos', 'desktop'] },
    { src: kfacilAgente, width: 1440, height: 900, tags: ['panel agente', 'permisos', 'desktop'] },
    { src: kfacilPropiedadesTablet, width: 834, height: 1112, tags: ['propiedades', 'tablet', '834px'] },
    { src: kfacilInicioMobile, width: 390, height: 844, tags: ['inicio', 'mobile', '390px'] },
    { src: kfacilInmuebleMobile, width: 390, height: 844, tags: ['inmueble', 'mobile', '390px'] },
  ],
}

export default projectGalleries
