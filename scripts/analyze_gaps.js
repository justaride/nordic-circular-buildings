const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/projects/norway.json', 'utf8'));

// Analyze gaps
const analysis = {
  total: data.projects.length,
  withNarrative: 0,
  withBreakdown: 0,
  withCostData: 0,
  withSuppliers: 0,
  missingNarrative: [],
  missingBreakdown: [],
  projectsWithCircularityRate: [],
  missingSuppliers: [],
  lowDataQuality: [],
  missingQuantities: []
};

data.projects.forEach(p => {
  // Check narrative
  if (p.narrative && p.narrative.driver) {
    analysis.withNarrative++;
  } else {
    analysis.missingNarrative.push({id: p.id, name: p.name, type: p.project_type, public: p.is_public_sector});
  }

  // Check breakdown
  if (p.metrics && p.metrics.circularity_rate && p.metrics.circularity_rate.breakdown) {
    analysis.withBreakdown++;
  }

  // Check if has circularity rate
  if (p.metrics && p.metrics.circularity_rate && p.metrics.circularity_rate.value) {
    analysis.projectsWithCircularityRate.push({
      id: p.id,
      name: p.name,
      rate: p.metrics.circularity_rate.value,
      hasBreakdown: !!(p.metrics.circularity_rate.breakdown)
    });
  }

  // Check suppliers
  let hasSupplier = false;
  if (p.circular_features) {
    hasSupplier = p.circular_features.some(f => f.supplier);
  }
  if (hasSupplier) {
    analysis.withSuppliers++;
  } else {
    analysis.missingSuppliers.push({id: p.id, name: p.name});
  }

  // Check data quality
  if (p.data_quality === 'weak') {
    analysis.lowDataQuality.push({id: p.id, name: p.name});
  }

  // Check missing quantities in circular features
  if (p.circular_features) {
    const missingQty = p.circular_features.filter(f => !f.quantity || f.quantity === null);
    if (missingQty.length > 0) {
      analysis.missingQuantities.push({
        id: p.id,
        name: p.name,
        missingCount: missingQty.length,
        totalFeatures: p.circular_features.length,
        materials: missingQty.map(f => f.material_type).filter(Boolean)
      });
    }
  }
});

console.log(JSON.stringify(analysis, null, 2));
