export const Breadcrumbs = (title: string) => `
  <div class="breadcrumbs">
    <a href="/">Home</a>
    <span>/</span>
    <span class="current">${title}</span>
  </div>
`;
