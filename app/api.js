const baseUrl = "https://rami-notion-api.fly.dev/public";
export const assetBaseUrl = `${baseUrl}/assets`;

export async function loadData(endpoint) {
  try {
    const res = await fetch(baseUrl + endpoint, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    const json = await res.json();
    return { data: json };
  } catch (e) {
    return { error: e };
  }
}

export async function loadProjects() {
  const res = await loadData("/projects.json");
  const projects = res.data?.rows || [];
  const sorted = projects.sort((a, b) => (a.id < b.id ? 1 : -1));
  return sorted;
}

export async function loadPages() {
  const res = await loadData("/pages.json");
  return res.data?.rows || [];
}

export function fileWithFallbackUrl(file) {
  if (file.name) {
    return `${assetBaseUrl}/${file.name}`;
  }
  return file.url;
}
