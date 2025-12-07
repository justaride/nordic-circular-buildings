import type { Project } from '../types/project';
import { parseYear } from './filters';

export type SortOption = 'cbc_grade' | 'circularity' | 'year' | 'name' | 'status';

const GRADE_ORDER: Record<string, number> = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5 };

export function sortProjects(projects: Project[], sortBy: SortOption): Project[] {
  return [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'cbc_grade': {
        const gradeA = a.cbc_assessment?.total_score?.grade;
        const gradeB = b.cbc_assessment?.total_score?.grade;
        const orderA = gradeA ? GRADE_ORDER[gradeA] : 99;
        const orderB = gradeB ? GRADE_ORDER[gradeB] : 99;
        if (orderA !== orderB) return orderA - orderB;
        const scoreA = a.cbc_assessment?.total_score?.final_score || 0;
        const scoreB = b.cbc_assessment?.total_score?.final_score || 0;
        return scoreB - scoreA;
      }
      case 'name':
        return a.name.localeCompare(b.name);
      case 'year': {
        const yearA = parseYear(a.year_completed) || 0;
        const yearB = parseYear(b.year_completed) || 0;
        return yearB - yearA;
      }
      case 'circularity': {
        const circA = a.metrics?.circularity_rate?.value || 0;
        const circB = b.metrics?.circularity_rate?.value || 0;
        return circB - circA;
      }
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });
}

export function sortProjectElements(
  container: HTMLElement,
  items: NodeListOf<Element> | Element[],
  sortBy: SortOption
): void {
  const itemsArray = Array.from(items) as HTMLElement[];

  itemsArray.sort((a, b) => {
    const projectA: Project = JSON.parse(a.getAttribute('data-project') || '{}');
    const projectB: Project = JSON.parse(b.getAttribute('data-project') || '{}');

    switch (sortBy) {
      case 'cbc_grade': {
        const gradeA = projectA.cbc_assessment?.total_score?.grade;
        const gradeB = projectB.cbc_assessment?.total_score?.grade;
        const orderA = gradeA ? GRADE_ORDER[gradeA] : 99;
        const orderB = gradeB ? GRADE_ORDER[gradeB] : 99;
        if (orderA !== orderB) return orderA - orderB;
        const scoreA = projectA.cbc_assessment?.total_score?.final_score || 0;
        const scoreB = projectB.cbc_assessment?.total_score?.final_score || 0;
        return scoreB - scoreA;
      }
      case 'name':
        return projectA.name.localeCompare(projectB.name);
      case 'year': {
        const yearA = parseYear(projectA.year_completed) || 0;
        const yearB = parseYear(projectB.year_completed) || 0;
        return yearB - yearA;
      }
      case 'circularity': {
        const circA = projectA.metrics?.circularity_rate?.value || 0;
        const circB = projectB.metrics?.circularity_rate?.value || 0;
        return circB - circA;
      }
      case 'status':
        return projectA.status.localeCompare(projectB.status);
      default:
        return 0;
    }
  });

  itemsArray.forEach((item) => container.appendChild(item));
}
