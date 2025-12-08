/**
 * TypeScript type definitions for Nordic Circular Buildings Database
 * Generated from data/schema.json
 */

// ============================================
// ENUMS
// ============================================

export type CountryCode = 'NO' | 'SE' | 'DK' | 'FI' | 'IS';

export type ProjectTypePrimary = 'renovation' | 'transformation' | 'extension' | 'hybrid' | 'new_build';

export type ProjectStatus = 'completed' | 'under_construction' | 'planned' | 'operational';

export type BuildingType =
  | 'office'
  | 'school'
  | 'housing'
  | 'sports_facility'
  | 'care_facility'
  | 'healthcare'
  | 'mixed_use'
  | 'cultural'
  | 'infrastructure'
  | 'workshop'
  | 'government'
  | 'media_facility';

export type CircularCategory =
  | 'material_reuse'
  | 'design_for_disassembly'
  | 'recycled_content'
  | 'adaptive_reuse'
  | 'low_carbon_materials'
  | 'traditional_techniques'
  | 'upcycling'
  | 'material_banking'
  | 'infrastructure'
  | 'other';

export type MaterialType =
  | 'concrete'
  | 'brick'
  | 'steel'
  | 'timber'
  | 'stone'
  | 'glass'
  | 'insulation'
  | 'fixtures'
  | 'furniture'
  | 'other'
  | null;

export type DonorSourceType =
  | 'demolition'
  | 'surplus'
  | 'preservation'
  | 'transfer'
  | 'decommissioning'
  | 'industrial_waste'
  | 'renovation'
  | 'on_site'
  | 'international'
  | 'sustainable_harvest'
  | 'manufacturing_waste'
  | 'office_relocations';

export type SupplierRole = 'supplier' | 'processor' | 'logistics' | 'validator' | 'methodology';

export type QuantityUnit = 'tonnes' | 'm2' | 'm3' | 'units' | 'percent' | 'kg';

export type MeasurementType = 'by_weight' | 'by_volume' | 'by_cost' | 'target';

export type CBCPathway =
  | 'build_nothing_new'
  | 'build_for_longterm'
  | 'build_efficiently'
  | 'build_with_right_materials';

export type Grade = 'A' | 'B' | 'C' | 'D' | 'E';

export type DataQuality = 'strong' | 'moderate' | 'weak';

export type VerificationStatus = 'verified' | 'partially_verified' | 'needs_verification' | 'pending';

export type CertificationStatus = 'achieved' | 'target' | 'in_progress';

export type ScopeCategory = 'core' | 'demonstration' | 'enabling_infrastructure' | 'secondary';

export type SourceType = 'primary' | 'secondary';

// ============================================
// INTERFACES
// ============================================

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  city: string;
  municipality?: string;
  address?: string | null;
  coordinates?: Coordinates | null;
}

export interface ProjectType {
  primary: ProjectTypePrimary;
  preservation_percent?: number | null;
  description?: string | null;
}

export interface Budget {
  amount: number;
  currency?: string;
  excludes_vat?: boolean;
}

export interface Stakeholder {
  role?: string;
  name: string;
  organization?: string;
  contribution?: string;
}

export interface DonorSource {
  name?: string;
  location?: string;
  type?: DonorSourceType;
}

export interface Quantity {
  value: number;
  unit: QuantityUnit;
  description?: string;
}

export interface Supplier {
  name: string;
  country?: string;
  role?: SupplierRole;
}

export interface CostComparison {
  circular_cost?: number;
  conventional_cost?: number;
  reused_cost?: string;
  new_cost?: string;
  currency?: string;
  savings_percent?: number;
  difference?: string;
  vs_new?: string;
  notes?: string;
}

export interface EnvironmentalImpact {
  co2_savings_percent?: number;
  co2_savings_tonnes?: number;
}

export interface Citation {
  source: string;
  url?: string | null;
  page_url?: string;
  quote?: string;
  pages?: string;
}

export interface CircularFeature {
  category: CircularCategory;
  material_type?: MaterialType;
  description: string;
  donor_source?: DonorSource | null;
  quantity?: Quantity | null;
  supplier?: Supplier | null;
  processing?: string | null;
  cost_comparison?: CostComparison | null;
  environmental_impact?: EnvironmentalImpact | null;
  citations?: Citation[];
}

export interface CircularityBreakdown {
  material: string;
  contribution_percent: number;
  notes?: string;
}

export interface CircularityRate {
  value: number;
  unit?: string;
  measurement?: MeasurementType;
  verified?: boolean;
  breakdown?: CircularityBreakdown[];
}

export interface CO2Reduction {
  percent?: number;
  value?: number;
  absolute_tonnes?: number;
  comparison_basis?: string;
}

export interface WasteDiverted {
  tonnes: number;
  description?: string;
}

export interface GHGReductionTarget {
  percent: number;
  comparison_basis?: string;
}

export interface CostSavings {
  amount: number;
  currency?: string;
  comparison?: string;
}

export interface Metrics {
  circularity_rate?: CircularityRate | null;
  co2_reduction?: CO2Reduction | null;
  waste_diverted?: WasteDiverted | null;
  ghg_reduction_target?: GHGReductionTarget | null;
  cost_savings?: CostSavings | null;
  cost_notes?: string;
}

export interface PathwayInterventions {
  structure_preservation?: number | null;
  functional_transformation?: number | null;
  lifespan_extension?: number | null;
  design_for_disassembly?: number | null;
  material_passport?: number | null;
  flexibility?: number | null;
  space_efficiency?: number | null;
  material_efficiency?: number | null;
  vertical_extension?: number | null;
  structural_reuse?: number | null;
  non_structural_reuse?: number | null;
  reuse_quantity_bonus?: number | null;
  recycled_content?: number | null;
  biobased_construction?: number | null;
  carbon_storage?: number | null;
}

export interface PathwayScore {
  score: number;
  interventions?: PathwayInterventions;
  notes?: string | null;
}

export interface PathwayScores {
  build_nothing_new?: PathwayScore;
  build_for_longterm?: PathwayScore;
  build_efficiently?: PathwayScore;
  build_with_right_materials?: PathwayScore;
}

export interface CBCTotalScore {
  raw_score: number;
  quality_multiplier: number;
  final_score: number;
  grade: Grade;
}

export interface CBCAssessment {
  pathway_scores?: PathwayScores;
  primary_pathway?: CBCPathway;
  secondary_pathways?: CBCPathway[];
  total_score?: CBCTotalScore;
  assessment_date?: string;
  assessed_by?: string | null;
  methodology_version?: string;
  notes?: string | null;
}

export interface Certification {
  name: string;
  level?: string | null;
  year?: number;
  status?: CertificationStatus;
}

export interface Program {
  name: string;
  designation?: string;
}

export interface ConstructionSite {
  fossil_free?: boolean;
  emission_free_percentage?: number | null;
  note?: string;
}

export interface Narrative {
  driver?: string;
  lessons_learned?: string;
  challenges?: string[];
}

export interface ScopeNotes {
  in_scope?: boolean;
  category?: ScopeCategory;
  notes?: string;
}

export interface Source {
  type?: SourceType;
  name?: string;
  organization?: string;
  url?: string | null;
  date?: string;
}

export interface CategoryScores {
  basic_info?: number;
  stakeholders?: number;
  metrics_co2?: number;
  metrics_circularity?: number;
  material_inventory?: number;
  cost_data?: number;
  sources_primary?: number;
  certifications?: number;
  narrative?: number;
  donor_sources?: number;
}

export interface DataCompleteness {
  score: number;
  grade: Grade;
  category_scores?: CategoryScores;
  has?: string[];
  missing?: string[];
  upgrade_path?: string;
  calculated_date?: string;
}

// ============================================
// MAIN PROJECT INTERFACE
// ============================================

export interface Project {
  id: string;
  name: string;
  country: CountryCode;
  project_type?: ProjectType;
  project_type_simple?: 'new_build' | 'transformation'; // Deprecated
  is_public_sector: boolean;
  project_url?: string | null;
  location: Location;
  status: ProjectStatus;
  year_completed: number | string;
  building_type: BuildingType;
  size_sqm?: number | null;
  budget?: Budget | number | null; // number for legacy format
  client: string;
  architect: string | string[];
  contractor?: string | null;
  other_stakeholders?: Stakeholder[];
  circular_features: CircularFeature[];
  metrics: Metrics;
  cbc_assessment?: CBCAssessment | null;
  certifications?: (Certification | string)[];
  programs?: (Program | string)[];
  awards?: string[];
  energy_standard?: string | null;
  energy_class?: string;
  original_build_year?: number;
  construction_site?: ConstructionSite | null;
  narrative?: Narrative | null;
  scope_notes?: ScopeNotes | null;
  sources?: Source[];
  data_completeness?: DataCompleteness;
  data_quality?: DataQuality; // Deprecated
  verification_status?: VerificationStatus;
  data_gaps?: string[]; // Deprecated
  circularity_qualification?: string;
  primary_strategies?: string[];
  notes?: string | null;
  last_updated?: string;
}

// ============================================
// DATA FILE INTERFACE
// ============================================

export interface GeographicDistribution {
  [city: string]: number;
}

export interface StatusDistribution {
  completed: number;
  under_construction: number;
  planned: number;
  operational: number;
}

export interface StrategyDistribution {
  material_reuse: number;
  adaptive_reuse: number;
  upcycling: number;
  design_for_disassembly: number;
  infrastructure?: number;
}

export interface ProjectTypeDistribution {
  renovation: number;
  transformation: number;
  extension: number;
  hybrid: number;
  new_build: number;
}

export interface SectorDistribution {
  public: number;
  private: number;
}

export interface AggregateMetrics {
  reuse_rate_range: string;
  co2_reduction_range: string;
}

export interface DataSummary {
  geographic_distribution: GeographicDistribution;
  by_status: StatusDistribution;
  by_strategy: StrategyDistribution;
  aggregate_metrics: AggregateMetrics;
  key_programs: string[];
  by_project_type: {
    transformation: number;
    new_build: number;
  };
  by_sector: SectorDistribution;
  by_project_type_detailed: ProjectTypeDistribution;
}

export interface NorwayData {
  country: CountryCode;
  country_name: string;
  last_updated: string;
  total_projects: number;
  summary: DataSummary;
  projects: Project[];
}

// Generic country data interface for multi-country support
export interface CountryData {
  country: CountryCode;
  country_name: string;
  last_updated: string;
  total_projects: number;
  data_status?: 'initial_research' | 'in_progress' | 'complete';
  summary: DataSummary;
  research_queue?: ResearchQueueItem[];
  projects: Project[];
}

export interface ResearchQueueItem {
  name: string;
  city: string;
  year: number | string;
  type: string;
  highlight: string;
  client?: string;
  architect?: string;
  circular_features?: string[];
  source: string;
}

// Country metadata for navigation and display
export interface CountryMeta {
  code: CountryCode;
  name: string;
  name_local: string;
  flag: string;
  slug: string;
  project_count: number;
  data_status: 'initial_research' | 'in_progress' | 'complete';
}

export const COUNTRIES: CountryMeta[] = [
  { code: 'NO', name: 'Norway', name_local: 'Norge', flag: '🇳🇴', slug: 'no', project_count: 0, data_status: 'complete' },
  { code: 'SE', name: 'Sweden', name_local: 'Sverige', flag: '🇸🇪', slug: 'se', project_count: 0, data_status: 'initial_research' },
  { code: 'DK', name: 'Denmark', name_local: 'Danmark', flag: '🇩🇰', slug: 'dk', project_count: 0, data_status: 'initial_research' },
  { code: 'FI', name: 'Finland', name_local: 'Suomi', flag: '🇫🇮', slug: 'fi', project_count: 0, data_status: 'initial_research' },
  { code: 'IS', name: 'Iceland', name_local: 'Ísland', flag: '🇮🇸', slug: 'is', project_count: 0, data_status: 'initial_research' },
];

export type CountrySlug = 'no' | 'se' | 'dk' | 'fi' | 'is';
