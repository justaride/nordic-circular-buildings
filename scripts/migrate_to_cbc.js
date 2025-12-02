/**
 * Migration script: Convert projects to CBC Four Pathways format
 *
 * This script:
 * 1. Converts project_type from string to object with primary, preservation_percent, description
 * 2. Adds cbc_assessment with pathway scores for Tier 1 projects
 * 3. Updates summary statistics
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Project type mappings with preservation estimates
const projectTypeMappings = {
  'NO_ka13': {
    primary: 'transformation',
    preservation_percent: 85,
    description: '1960s office building transformed to modern workplace with 80% material reuse'
  },
  'NO_skur38': {
    primary: 'transformation',
    preservation_percent: 90,
    description: '1915 warehouse transformed to cultural venue preserving historic structure'
  },
  'NO_nedre_sem': {
    primary: 'transformation',
    preservation_percent: 70,
    description: '1887 stone barn transformed to public meeting house'
  },
  'NO_grensen9b': {
    primary: 'transformation',
    preservation_percent: 95,
    description: '1978 office building with 97.3% netto null - minimal new materials'
  },
  'NO_sophies_minde': {
    primary: 'transformation',
    preservation_percent: 80,
    description: 'Historic hospital building transformed preserving character'
  },
  'NO_ka23': {
    primary: 'transformation',
    preservation_percent: 85,
    description: '1950 office building with 50% circular materials and 85% GHG reduction'
  },
  'NO_foniks': {
    primary: 'transformation',
    preservation_percent: 75,
    description: '1969 office transformed with 89% reuse rate - BREEAM Outstanding'
  },
  'NO_hoyblokken': {
    primary: 'renovation',
    preservation_percent: 95,
    description: '1958 government high-rise renovated as icon of adaptive reuse'
  },
  'NO_lilleborg': {
    primary: 'renovation',
    preservation_percent: 90,
    description: '1898-1917 school complex renovated preserving historic character'
  },
  'NO_eikeli': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New school building using 650m² CE-certified reclaimed Danish brick'
  },
  'NO_loren': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New sports facility with world-first ship steel structure reuse'
  },
  'NO_nostebukten': {
    primary: 'hybrid',
    preservation_percent: 40,
    description: 'New housing using 70% materials from donor building on same site'
  },
  'NO_tradlab_tre': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'Demonstration workshop with materials from Nedre Sem'
  },
  'NO_hasle_tre': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'Timber office building with circular principles'
  },
  'NO_nidarvoll_sunnland': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New school with reused materials'
  },
  'NO_stovner_bad': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New swimming facility with ship steel and DfD elements'
  },
  'NO_voldslokka': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'Sports park with design for disassembly steel structure'
  },
  'NO_nrk_normannslokka': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New media headquarters with "Sirkulær" winning concept'
  },
  'NO_oslo_legevakt': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New emergency hospital with extensive material reuse'
  },
  'NO_ruselokka': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New school with reclaimed materials from predecessor'
  },
  'NO_treklang': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'New timber school designed for disassembly'
  },
  'NO_ressurssentral': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'Circular material bank and logistics hub'
  },
  'NO_construction_city': {
    primary: 'new_build',
    preservation_percent: 0,
    description: 'Construction industry hub with furniture reuse focus'
  }
};

// CBC assessments for Tier 1 projects
const cbcAssessments = {
  'NO_ka13': {
    pathway_scores: {
      build_nothing_new: {
        score: 90,
        interventions: {
          structure_preservation: 14,
          functional_transformation: 10,
          lifespan_extension: 9
        },
        notes: '1960s structure fully preserved, transformed function, +40 year lifespan'
      },
      build_for_longterm: {
        score: 55,
        interventions: {
          design_for_disassembly: 5,
          material_passport: 7,
          flexibility: 3
        },
        notes: 'Documented material sources for future reference'
      },
      build_efficiently: {
        score: 40,
        interventions: {
          space_efficiency: 4,
          material_efficiency: 4,
          vertical_extension: 0
        },
        notes: 'Standard office efficiency'
      },
      build_with_right_materials: {
        score: 85,
        interventions: {
          structural_reuse: 12,
          non_structural_reuse: 8,
          reuse_quantity_bonus: 3,
          recycled_content: 2,
          biobased_construction: 0,
          carbon_storage: 0
        },
        notes: '168t concrete, glass, steel, stone from 25+ donor buildings'
      }
    },
    primary_pathway: 'build_nothing_new',
    secondary_pathways: ['build_with_right_materials'],
    total_score: {
      raw_score: 74.25,
      quality_multiplier: 1.2,
      final_score: 89.1,
      grade: 'A'
    },
    assessment_date: '2025-12-02',
    assessed_by: 'Nordic Circular Buildings Database',
    methodology_version: 'CBC-2024-v1',
    notes: 'SINTEF-verified structural concrete reuse. DOGA Hedersmerke 2021.'
  },
  'NO_grensen9b': {
    pathway_scores: {
      build_nothing_new: {
        score: 95,
        interventions: {
          structure_preservation: 15,
          functional_transformation: 8,
          lifespan_extension: 10
        },
        notes: '97.3% netto null - almost entirely preserved structure'
      },
      build_for_longterm: {
        score: 50,
        interventions: {
          design_for_disassembly: 4,
          material_passport: 6,
          flexibility: 3
        },
        notes: 'Materials documented via Loopfront'
      },
      build_efficiently: {
        score: 45,
        interventions: {
          space_efficiency: 5,
          material_efficiency: 6,
          vertical_extension: 0
        },
        notes: 'High material efficiency through minimal intervention'
      },
      build_with_right_materials: {
        score: 80,
        interventions: {
          structural_reuse: 10,
          non_structural_reuse: 8,
          reuse_quantity_bonus: 3,
          recycled_content: 2,
          biobased_construction: 0,
          carbon_storage: 0
        },
        notes: 'Metro rails, timber, materials from Sporveien, Nasjonalmuseet, Munchmuseet'
      }
    },
    primary_pathway: 'build_nothing_new',
    secondary_pathways: ['build_with_right_materials'],
    total_score: {
      raw_score: 76.25,
      quality_multiplier: 1.2,
      final_score: 91.5,
      grade: 'A'
    },
    assessment_date: '2025-12-02',
    assessed_by: 'Nordic Circular Buildings Database',
    methodology_version: 'CBC-2024-v1',
    notes: '99% netto null - exemplary minimal intervention approach'
  },
  'NO_foniks': {
    pathway_scores: {
      build_nothing_new: {
        score: 85,
        interventions: {
          structure_preservation: 13,
          functional_transformation: 8,
          lifespan_extension: 8
        },
        notes: '1969 office structure preserved and upgraded'
      },
      build_for_longterm: {
        score: 45,
        interventions: {
          design_for_disassembly: 4,
          material_passport: 5,
          flexibility: 3
        },
        notes: 'Standard documentation'
      },
      build_efficiently: {
        score: 50,
        interventions: {
          space_efficiency: 5,
          material_efficiency: 6,
          vertical_extension: 0
        },
        notes: 'Efficient use of existing structure'
      },
      build_with_right_materials: {
        score: 90,
        interventions: {
          structural_reuse: 12,
          non_structural_reuse: 8,
          reuse_quantity_bonus: 3,
          recycled_content: 3,
          biobased_construction: 0,
          carbon_storage: 0
        },
        notes: '89% reuse rate - concrete, steel, fixtures'
      }
    },
    primary_pathway: 'build_with_right_materials',
    secondary_pathways: ['build_nothing_new'],
    total_score: {
      raw_score: 75.25,
      quality_multiplier: 1.2,
      final_score: 90.3,
      grade: 'A'
    },
    assessment_date: '2025-12-02',
    assessed_by: 'Nordic Circular Buildings Database',
    methodology_version: 'CBC-2024-v1',
    notes: 'BREEAM Outstanding. FutureBuilt benchmark project.'
  },
  'NO_loren': {
    pathway_scores: {
      build_nothing_new: {
        score: 0,
        interventions: {
          structure_preservation: 0,
          functional_transformation: 0,
          lifespan_extension: 0
        },
        notes: 'New build - no existing structure'
      },
      build_for_longterm: {
        score: 60,
        interventions: {
          design_for_disassembly: 8,
          material_passport: 6,
          flexibility: 4
        },
        notes: 'Ship steel structure documented for future disassembly'
      },
      build_efficiently: {
        score: 55,
        interventions: {
          space_efficiency: 6,
          material_efficiency: 7,
          vertical_extension: 0
        },
        notes: 'Multi-use sports facility, efficient material use'
      },
      build_with_right_materials: {
        score: 85,
        interventions: {
          structural_reuse: 12,
          non_structural_reuse: 6,
          reuse_quantity_bonus: 3,
          recycled_content: 2,
          biobased_construction: 0,
          carbon_storage: 0
        },
        notes: 'World-first ship steel reuse for building structure'
      }
    },
    primary_pathway: 'build_with_right_materials',
    secondary_pathways: ['build_for_longterm', 'build_efficiently'],
    total_score: {
      raw_score: 68.5,
      quality_multiplier: 1.2,
      final_score: 82.2,
      grade: 'A'
    },
    assessment_date: '2025-12-02',
    assessed_by: 'Nordic Circular Buildings Database',
    methodology_version: 'CBC-2024-v1',
    notes: 'Pioneering methodology for ship steel certification (Nordic Circles/DNV)'
  },
  'NO_eikeli': {
    pathway_scores: {
      build_nothing_new: {
        score: 0,
        interventions: {
          structure_preservation: 0,
          functional_transformation: 0,
          lifespan_extension: 0
        },
        notes: 'New build - no existing structure'
      },
      build_for_longterm: {
        score: 50,
        interventions: {
          design_for_disassembly: 5,
          material_passport: 5,
          flexibility: 3
        },
        notes: 'Brick facade documented'
      },
      build_efficiently: {
        score: 45,
        interventions: {
          space_efficiency: 5,
          material_efficiency: 5,
          vertical_extension: 0
        },
        notes: 'Standard school efficiency'
      },
      build_with_right_materials: {
        score: 75,
        interventions: {
          structural_reuse: 0,
          non_structural_reuse: 8,
          reuse_quantity_bonus: 2,
          recycled_content: 2,
          biobased_construction: 0,
          carbon_storage: 0
        },
        notes: '650m² CE-certified reclaimed Danish brick via HØINE AS'
      }
    },
    primary_pathway: 'build_with_right_materials',
    secondary_pathways: ['build_for_longterm'],
    total_score: {
      raw_score: 58.5,
      quality_multiplier: 1.2,
      final_score: 70.2,
      grade: 'B'
    },
    assessment_date: '2025-12-02',
    assessed_by: 'Nordic Circular Buildings Database',
    methodology_version: 'CBC-2024-v1',
    notes: 'First Norwegian project with CE-certified reclaimed brick at scale'
  },
  'NO_nedre_sem': {
    pathway_scores: {
      build_nothing_new: {
        score: 80,
        interventions: {
          structure_preservation: 12,
          functional_transformation: 10,
          lifespan_extension: 8
        },
        notes: '1887 stone barn walls preserved, new function as meeting house'
      },
      build_for_longterm: {
        score: 55,
        interventions: {
          design_for_disassembly: 5,
          material_passport: 6,
          flexibility: 4
        },
        notes: 'Materials documented, some donated to TradLab TRE'
      },
      build_efficiently: {
        score: 40,
        interventions: {
          space_efficiency: 4,
          material_efficiency: 4,
          vertical_extension: 0
        },
        notes: 'Adaptive reuse of existing footprint'
      },
      build_with_right_materials: {
        score: 70,
        interventions: {
          structural_reuse: 8,
          non_structural_reuse: 6,
          reuse_quantity_bonus: 2,
          recycled_content: 2,
          biobased_construction: 6,
          carbon_storage: 2
        },
        notes: '50% circular materials - stone, brick, timber. Fish-box EPS insulation.'
      }
    },
    primary_pathway: 'build_nothing_new',
    secondary_pathways: ['build_with_right_materials'],
    total_score: {
      raw_score: 66.25,
      quality_multiplier: 1.1,
      final_score: 72.9,
      grade: 'B'
    },
    assessment_date: '2025-12-02',
    assessed_by: 'Nordic Circular Buildings Database',
    methodology_version: 'CBC-2024-v1',
    notes: 'Exemplary rural heritage transformation. Stiltre timber processing.'
  }
};

// Migrate each project
data.projects = data.projects.map(project => {
  const mapping = projectTypeMappings[project.id];

  if (mapping) {
    // Convert project_type from string to object
    project.project_type = {
      primary: mapping.primary,
      preservation_percent: mapping.preservation_percent,
      description: mapping.description
    };

    // Keep backwards compatibility
    project.project_type_simple = mapping.primary === 'renovation' ? 'transformation' :
                                   mapping.primary === 'hybrid' ? 'transformation' :
                                   mapping.primary;
  } else {
    // Fallback for unknown projects
    const oldType = typeof project.project_type === 'string' ? project.project_type : 'new_build';
    project.project_type = {
      primary: oldType,
      preservation_percent: oldType === 'transformation' ? 50 : 0,
      description: null
    };
    project.project_type_simple = oldType;
  }

  // Add CBC assessment for Tier 1 projects
  const assessment = cbcAssessments[project.id];
  if (assessment) {
    project.cbc_assessment = assessment;
  }

  return project;
});

// Update summary with new project type counts
const typeCounts = {
  renovation: 0,
  transformation: 0,
  extension: 0,
  hybrid: 0,
  new_build: 0
};

data.projects.forEach(p => {
  const type = p.project_type?.primary || 'new_build';
  typeCounts[type]++;
});

data.summary.by_project_type_detailed = typeCounts;
data.last_updated = '2025-12-02';

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('Migration complete!');
console.log('Project type counts:', typeCounts);
console.log('CBC assessments added:', Object.keys(cbcAssessments).length);
