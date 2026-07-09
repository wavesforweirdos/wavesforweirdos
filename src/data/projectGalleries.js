// Capturas reales de proyectos (deploy en vivo o cover de Behance cuando no
// hay demo desplegada). No todos los proyectos tienen imágenes todavía —
// se añaden aquí a medida que estén disponibles, sin tocar ProjectDetail.
import zaraListado from '../assets/projects/zara-phones/listado.png'
import zaraFicha from '../assets/projects/zara-phones/ficha-producto.png'
import basketCover from '../assets/projects/3x3-basket-league/cover.jpg'
import missionCover from '../assets/projects/mission-list/cover.jpg'

const projectGalleries = {
  'zara-phones': [
    { src: zaraListado, label: 'listado · búsqueda y filtro' },
    { src: zaraFicha, label: 'ficha · color y almacenamiento' },
  ],
  '3x3-basket-league': [{ src: basketCover, label: 'landing' }],
  'mission-list': [{ src: missionCover, label: 'gestión de tareas' }],
}

export default projectGalleries
