/**
 * Deep gap analysis for all projects
 * Generates detailed report on missing data and potential sources
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const report = {
  generated: new Date().toISOString(),
  summary: {},
  projects: [],
  dataCategories: {
    cost_data: { available: 0, missing: 0, projects: [] },
    material_breakdown: { available: 0, missing: 0, projects: [] },
    cbc_assessment: { available: 0, missing: 0, projects: [] },
    supplier_data: { available: 0, missing: 0, projects: [] },
    quantity_data: { available: 0, missing: 0, projects: [] },
    donor_source: { available: 0, missing: 0, projects: [] },
    preservation_percent: { available: 0, missing: 0, projects: [] },
    budget: { available: 0, missing: 0, projects: [] },
    co2_reduction: { available: 0, missing: 0, projects: [] },
    certifications: { available: 0, missing: 0, projects: [] }
  }
};

data.projects.forEach(project => {
  const projectReport = {
    id: project.id,
    name: project.name,
    status: project.status,
    year: project.year_completed,
    tier: null,
    gaps: [],
    available: [],
    sources_count: project.sources ? project.sources.length : 0,
    primary_sources: [],
    potential_sources: []
  };

  // Determine tier based on data completeness
  const hasCBC = !!project.cbc_assessment;
  const hasBreakdown = project.metrics?.circularity_rate?.breakdown;
  const hasCost = project.metrics?.cost_notes;
  const hasNarrative = !!project.narrative;

  if (hasCBC && hasBreakdown && hasCost && hasNarrative) {
    projectReport.tier = 1;
  } else if (hasNarrative && (hasCBC || hasBreakdown || hasCost)) {
    projectReport.tier = 2;
  } else {
    projectReport.tier = 3;
  }

  // Check each data category
  // 1. Cost data
  if (project.metrics?.cost_notes || project.budget) {
    report.dataCategories.cost_data.available++;
    projectReport.available.push('cost_data');
  } else {
    report.dataCategories.cost_data.missing++;
    report.dataCategories.cost_data.projects.push(project.name);
    projectReport.gaps.push({
      field: 'cost_data',
      importance: 'HIGH',
      description: 'Missing cost comparison (circular vs conventional)',
      potential_sources: [
        'Project experience reports (erfaringsrapporter)',
        'FutureBuilt project documentation',
        'Direct contact with project owner/developer'
      ]
    });
  }

  // 2. Material breakdown
  if (project.metrics?.circularity_rate?.breakdown) {
    report.dataCategories.material_breakdown.available++;
    projectReport.available.push('material_breakdown');
  } else {
    report.dataCategories.material_breakdown.missing++;
    report.dataCategories.material_breakdown.projects.push(project.name);
    projectReport.gaps.push({
      field: 'material_breakdown',
      importance: 'HIGH',
      description: 'Missing breakdown of circularity by material type',
      potential_sources: [
        'Detailed project reports',
        'BREEAM documentation',
        'Environmental product declarations (EPD)'
      ]
    });
  }

  // 3. CBC Assessment
  if (project.cbc_assessment) {
    report.dataCategories.cbc_assessment.available++;
    projectReport.available.push('cbc_assessment');
  } else {
    report.dataCategories.cbc_assessment.missing++;
    report.dataCategories.cbc_assessment.projects.push(project.name);
    projectReport.gaps.push({
      field: 'cbc_assessment',
      importance: 'MEDIUM',
      description: 'CBC Four Pathways assessment not completed',
      potential_sources: [
        'Can be calculated from existing data',
        'Requires evaluation of preservation %, DfD, material reuse'
      ]
    });
  }

  // 4. Supplier data
  const hasSupplier = project.circular_features?.some(f => f.supplier);
  if (hasSupplier) {
    report.dataCategories.supplier_data.available++;
    projectReport.available.push('supplier_data');
  } else {
    report.dataCategories.supplier_data.missing++;
    report.dataCategories.supplier_data.projects.push(project.name);
    projectReport.gaps.push({
      field: 'supplier_data',
      importance: 'MEDIUM',
      description: 'Missing supplier information for circular materials',
      potential_sources: [
        'Project tender documents',
        'Contractor websites',
        'Industry articles about the project'
      ]
    });
  }

  // 5. Quantity data
  const hasQuantity = project.circular_features?.some(f => f.quantity?.value);
  if (hasQuantity) {
    report.dataCategories.quantity_data.available++;
    projectReport.available.push('quantity_data');
  } else {
    report.dataCategories.quantity_data.missing++;
    report.dataCategories.quantity_data.projects.push(project.name);
    projectReport.gaps.push({
      field: 'quantity_data',
      importance: 'HIGH',
      description: 'Missing quantities (tonnes, m², units)',
      potential_sources: [
        'Climate gas calculations',
        'Material passports',
        'Contractor documentation'
      ]
    });
  }

  // 6. Donor source
  const hasDonor = project.circular_features?.some(f => f.donor_source?.name);
  if (hasDonor) {
    report.dataCategories.donor_source.available++;
    projectReport.available.push('donor_source');
  } else {
    report.dataCategories.donor_source.missing++;
    report.dataCategories.donor_source.projects.push(project.name);
    projectReport.gaps.push({
      field: 'donor_source',
      importance: 'HIGH',
      description: 'Missing donor building/source information',
      potential_sources: [
        'Project case studies',
        'Reuse coordinator documentation',
        'Material tracking platforms (Loopfront, Ombygg)'
      ]
    });
  }

  // 7. Preservation percent
  if (project.project_type?.preservation_percent) {
    report.dataCategories.preservation_percent.available++;
    projectReport.available.push('preservation_percent');
  } else {
    report.dataCategories.preservation_percent.missing++;
    report.dataCategories.preservation_percent.projects.push(project.name);
  }

  // 8. Budget
  if (project.budget) {
    report.dataCategories.budget.available++;
    projectReport.available.push('budget');
  } else {
    report.dataCategories.budget.missing++;
    report.dataCategories.budget.projects.push(project.name);
  }

  // 9. CO2 reduction
  if (project.metrics?.co2_reduction?.percent) {
    report.dataCategories.co2_reduction.available++;
    projectReport.available.push('co2_reduction');
  } else {
    report.dataCategories.co2_reduction.missing++;
    report.dataCategories.co2_reduction.projects.push(project.name);
  }

  // 10. Certifications
  if (project.certifications?.length > 0) {
    report.dataCategories.certifications.available++;
    projectReport.available.push('certifications');
  } else {
    report.dataCategories.certifications.missing++;
    report.dataCategories.certifications.projects.push(project.name);
  }

  // Extract primary sources
  if (project.sources) {
    project.sources.forEach(s => {
      if (s.type === 'primary' || s.type === 'report') {
        projectReport.primary_sources.push({
          name: s.name,
          url: s.url,
          type: s.type
        });
      }
    });
  }

  report.projects.push(projectReport);
});

// Calculate summary
report.summary = {
  total_projects: 23,
  tier1_count: report.projects.filter(p => p.tier === 1).length,
  tier2_count: report.projects.filter(p => p.tier === 2).length,
  tier3_count: report.projects.filter(p => p.tier === 3).length,
  completeness_score: Math.round(
    (report.dataCategories.cost_data.available +
     report.dataCategories.material_breakdown.available +
     report.dataCategories.cbc_assessment.available +
     report.dataCategories.supplier_data.available +
     report.dataCategories.quantity_data.available) / (23 * 5) * 100
  )
};

// Output report
console.log(JSON.stringify(report, null, 2));
