export function initComparison(baseUrl: string): void {
  const compareBtn = document.getElementById('compare-btn');
  let selectedProjects: string[] = [];

  document.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('compare-checkbox')) {
      const projectId = target.value;
      if (target.checked) {
        selectedProjects.push(projectId);
      } else {
        selectedProjects = selectedProjects.filter((id) => id !== projectId);
      }

      if (compareBtn) {
        if (selectedProjects.length >= 2) {
          compareBtn.classList.remove('hidden');
          compareBtn.textContent = `Compare ${selectedProjects.length} Projects`;
        } else {
          compareBtn.classList.add('hidden');
        }
      }
    }
  });

  compareBtn?.addEventListener('click', () => {
    if (selectedProjects.length >= 2) {
      window.location.href = `${baseUrl}/compare?ids=${selectedProjects.join(',')}`;
    }
  });
}
