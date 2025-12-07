export function initMobileDrawer(): void {
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const mobileFilterDrawer = document.getElementById('mobile-filter-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerContent = document.getElementById('drawer-content');
  const closeDrawer = document.getElementById('close-drawer');

  function openDrawer(): void {
    mobileFilterDrawer?.classList.remove('hidden');
    setTimeout(() => {
      drawerContent?.classList.remove('translate-x-full');
    }, 10);
  }

  function closeDrawerFn(): void {
    drawerContent?.classList.add('translate-x-full');
    setTimeout(() => {
      mobileFilterDrawer?.classList.add('hidden');
    }, 300);
  }

  mobileFilterBtn?.addEventListener('click', openDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawerFn);
  closeDrawer?.addEventListener('click', closeDrawerFn);
}
