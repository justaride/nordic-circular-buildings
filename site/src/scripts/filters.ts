import type { Project } from '../types/project';

export interface FilterState {
  country?: string[];
  project_type?: string[];
  cbc_pathway?: string[];
  cbc_grade?: string[];
  status?: string[];
  building_type?: string[];
  strategy?: string[];
  yearMin?: number;
  yearMax?: number;
  minCircularity?: number;
  hasCircularity?: boolean;
}

export function parseYear(yearValue: number | string | undefined): number | null {
  if (typeof yearValue === 'number') return yearValue;
  if (typeof yearValue === 'string') {
    const match = yearValue.match(/\d{4}/);
    return match ? parseInt(match[0]) : null;
  }
  return null;
}

export function matchesFilters(project: Project, filters: FilterState): boolean {
  // Country filter
  if (filters.country?.length && !filters.country.includes(project.country)) {
    return false;
  }

  // Project type filter
  if (filters.project_type?.length) {
    const projectTypePrimary = typeof project.project_type === 'object'
      ? project.project_type?.primary
      : project.project_type;
    if (!projectTypePrimary || !filters.project_type.includes(projectTypePrimary)) {
      return false;
    }
  }

  // CBC Pathway filter
  if (filters.cbc_pathway?.length) {
    const primaryPathway = project.cbc_assessment?.primary_pathway;
    const secondaryPathways = project.cbc_assessment?.secondary_pathways || [];
    const hasPathway = filters.cbc_pathway.some(
      (p) => p === primaryPathway || secondaryPathways.includes(p as typeof secondaryPathways[number])
    );
    if (!hasPathway) return false;
  }

  // CBC Grade filter
  if (filters.cbc_grade?.length) {
    const grade = project.cbc_assessment?.total_score?.grade;
    if (!grade || !filters.cbc_grade.includes(grade)) {
      return false;
    }
  }

  // Status filter
  if (filters.status?.length && !filters.status.includes(project.status)) {
    return false;
  }

  // Building type filter
  if (filters.building_type?.length && !filters.building_type.includes(project.building_type || '')) {
    return false;
  }

  // Strategy filter
  if (filters.strategy?.length) {
    const hasStrategy = filters.strategy.some((s) =>
      project.primary_strategies?.includes(s)
    );
    if (!hasStrategy) return false;
  }

  // Year filter
  if (filters.yearMin || filters.yearMax) {
    const year = parseYear(project.year_completed);
    if (year) {
      if (filters.yearMin && year < filters.yearMin) return false;
      if (filters.yearMax && year > filters.yearMax) return false;
    }
  }

  // Circularity filter
  if (filters.minCircularity && filters.minCircularity > 0) {
    const rate = project.metrics?.circularity_rate?.value || 0;
    if (rate < filters.minCircularity) return false;
  }

  // Has circularity filter
  if (filters.hasCircularity) {
    const rate = project.metrics?.circularity_rate?.value;
    if (rate === undefined || rate === null) return false;
  }

  return true;
}

export function matchesSearch(project: Project, query: string): boolean {
  if (!query) return true;

  // Extract material types from circular features for search
  const materialTypes = project.circular_features
    ?.map(f => f.material_type)
    .filter(Boolean) || [];

  const searchText = [
    project.name,
    project.location?.city,
    project.building_type,
    project.client,
    project.architect,
    ...materialTypes,
  ].filter(Boolean).join(' ').toLowerCase();

  return searchText.includes(query.toLowerCase());
}
