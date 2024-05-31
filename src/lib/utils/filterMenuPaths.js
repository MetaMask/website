export const filterMenuPaths = (menus, paths) =>
  menus?.map(menu => ({
    ...menu,
    modules: menu.modules?.filter(m => !paths.includes(m.ctaLink)),
  }))
