import { FilterManager } from './filter-manager';
import { sortProjectElements, type SortOption } from './sort-manager';
import { initComparison } from './comparison';
import { initMobileDrawer } from './mobile-drawer';
import type { FilterState } from './filters';

export function initDashboard(baseUrl: string): void {
  const filterManager = new FilterManager();
  const projectGrid = document.getElementById('project-grid');
  const projectItems = document.querySelectorAll('.project-item');
  const sortSelect = document.getElementById('sort-select') as HTMLSelectElement | null;

  // Listen for search events
  window.addEventListener('search', ((e: CustomEvent<{ query: string }>) => {
    filterManager.setSearch(e.detail.query);
  }) as EventListener);

  // Listen for filter events
  window.addEventListener('filterChange', ((e: CustomEvent<FilterState>) => {
    filterManager.setFilters(e.detail);
  }) as EventListener);

  // Sort change
  sortSelect?.addEventListener('change', () => {
    if (projectGrid) {
      sortProjectElements(projectGrid, projectItems, sortSelect.value as SortOption);
    }
  });

  // Initial sort by CBC grade
  if (projectGrid) {
    sortProjectElements(projectGrid, projectItems, 'cbc_grade');
  }

  // Initialize comparison feature
  initComparison(baseUrl);

  // Initialize mobile drawer
  initMobileDrawer();
}

// Auto-initialize if script is loaded directly
if (typeof window !== 'undefined') {
  const initOnReady = () => {
    const baseUrl = (window as unknown as { BASE_URL?: string }).BASE_URL || '';
    initDashboard(baseUrl);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOnReady);
  } else {
    initOnReady();
  }
}
