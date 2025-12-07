import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Chart from 'chart.js/auto';

// Make libraries available globally for inline scripts
declare global {
  interface Window {
    L: typeof L;
    Chart: typeof Chart;
  }
}

window.L = L;
window.Chart = Chart;

export { L, Chart };
