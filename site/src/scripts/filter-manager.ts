import type { Project } from '../types/project';
import { matchesFilters, matchesSearch, type FilterState } from './filters';

interface StatsElements {
  visible: HTMLElement | null;
  totalWrapper: HTMLElement | null;
  completed: HTMLElement | null;
  co2: HTMLElement | null;
  circularity: HTMLElement | null;
}

export class FilterManager {
  private projectItems: NodeListOf<Element>;
  private projectsCount: HTMLElement | null;
  private noResults: HTMLElement | null;
  private projectGrid: HTMLElement | null;
  private stats: StatsElements;
  private currentSearch = '';
  private currentFilters: FilterState = {};

  constructor() {
    this.projectItems = document.querySelectorAll('.project-item');
    this.projectsCount = document.getElementById('projects-count');
    this.noResults = document.getElementById('no-results');
    this.projectGrid = document.getElementById('project-grid');
    this.stats = {
      visible: document.getElementById('stat-visible'),
      totalWrapper: document.getElementById('stat-total-wrapper'),
      completed: document.getElementById('stat-completed'),
      co2: document.getElementById('stat-co2'),
      circularity: document.getElementById('stat-circularity'),
    };
  }

  setSearch(query: string): void {
    this.currentSearch = query;
    this.applyFilters();
  }

  setFilters(filters: FilterState): void {
    this.currentFilters = filters;
    this.applyFilters();
  }

  applyFilters(): void {
    let visibleCount = 0;

    this.projectItems.forEach((item) => {
      const el = item as HTMLElement;
      const project: Project = JSON.parse(el.getAttribute('data-project') || '{}');

      const matchSearch = matchesSearch(project, this.currentSearch);
      const matchFilter = matchesFilters(project, this.currentFilters);
      const visible = matchSearch && matchFilter;

      if (visible) {
        el.style.display = '';
        visibleCount++;
      } else {
        el.style.display = 'none';
      }
    });

    this.updateCount(visibleCount);
    this.updateStats();
    this.updateNoResults(visibleCount);
    this.emitResults(visibleCount);
  }

  private updateCount(count: number): void {
    if (this.projectsCount) {
      this.projectsCount.textContent = `(${count})`;
    }
  }

  private updateStats(): void {
    let completedCount = 0;
    const co2Values: number[] = [];
    const circularityValues: number[] = [];
    let visibleCount = 0;

    this.projectItems.forEach((item) => {
      const el = item as HTMLElement;
      if (el.style.display !== 'none') {
        visibleCount++;
        const project: Project = JSON.parse(el.getAttribute('data-project') || '{}');
        if (project.status === 'completed' || project.status === 'operational') {
          completedCount++;
        }
        if (project.metrics?.co2_reduction?.percent) {
          co2Values.push(project.metrics.co2_reduction.percent);
        }
        if (project.metrics?.circularity_rate?.value) {
          circularityValues.push(project.metrics.circularity_rate.value);
        }
      }
    });

    if (this.stats.visible) {
      this.stats.visible.textContent = visibleCount.toString();
    }

    if (this.stats.totalWrapper) {
      if (visibleCount < this.projectItems.length) {
        this.stats.totalWrapper.classList.remove('hidden');
      } else {
        this.stats.totalWrapper.classList.add('hidden');
      }
    }

    if (this.stats.completed) {
      this.stats.completed.textContent = completedCount.toString();
    }

    if (this.stats.co2) {
      if (co2Values.length > 0) {
        const min = Math.min(...co2Values);
        const max = Math.max(...co2Values);
        this.stats.co2.textContent = min === max ? `${min}%` : `${min}–${max}%`;
      } else {
        this.stats.co2.textContent = 'N/A';
      }
    }

    if (this.stats.circularity) {
      if (circularityValues.length > 0) {
        const min = Math.min(...circularityValues);
        const max = Math.max(...circularityValues);
        this.stats.circularity.textContent = min === max ? `${min}%` : `${min}–${max}%`;
      } else {
        this.stats.circularity.textContent = 'N/A';
      }
    }
  }

  private updateNoResults(count: number): void {
    if (this.noResults && this.projectGrid) {
      if (count === 0) {
        this.noResults.classList.remove('hidden');
        this.projectGrid.classList.add('hidden');
      } else {
        this.noResults.classList.add('hidden');
        this.projectGrid.classList.remove('hidden');
      }
    }
  }

  private emitResults(count: number): void {
    window.dispatchEvent(new CustomEvent('filterResults', { detail: { count } }));
  }
}
