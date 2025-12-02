const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/projects/norway.json", "utf8"));

// Add suppliers to known projects
const supplierData = {
  "NO_ka13": [
    { material_type: "concrete", supplier: { name: "SINTEF", country: "NO", role: "validator" } }
  ],
  "NO_skur38": [
    { category: "low_carbon_materials", material_type: "concrete", supplier: { name: "Unicon", country: "NO", role: "supplier" } },
    { category: "low_carbon_materials", material_type: "insulation", supplier: { name: "Protekno", country: "NO", role: "supplier" } }
  ],
  "NO_nedre_sem": [
    { category: "upcycling", material_type: "insulation", supplier: { name: "Bewi", country: "NO", role: "supplier" } }
  ],
  "NO_loren": [
    { category: "upcycling", material_type: "steel", supplier: { name: "AF Offshore Decom", country: "NO", role: "processor" } },
    { category: "material_reuse", material_type: "concrete", supplier: { name: "Resirqel", country: "NO", role: "validator" } }
  ],
  "NO_stovner_bad": [
    { category: "upcycling", material_type: "steel", supplier: { name: "Nordic Circles", country: "NO", role: "methodology" } }
  ],
  "NO_foniks": [
    { material_type: "fixtures", supplier: { name: "Loopfront", country: "NO", role: "logistics" } }
  ]
};

let updateCount = 0;
data.projects.forEach(project => {
  const suppliers = supplierData[project.id];
  if (suppliers && project.circular_features) {
    suppliers.forEach(s => {
      const feature = project.circular_features.find(f =>
        (s.material_type && f.material_type === s.material_type) ||
        (s.category && f.category === s.category && f.material_type === s.material_type)
      );
      if (feature && feature.supplier === undefined) {
        feature.supplier = s.supplier;
        updateCount++;
        console.log("Added supplier to", project.id, "-", s.supplier.name);
      }
    });
  }
});

fs.writeFileSync("data/projects/norway.json", JSON.stringify(data, null, 2));
console.log("\nTotal supplier fields added:", updateCount);
