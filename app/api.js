const baseUrl = "https://rami-notion-api.fly.dev/public/";

export async function loadData(fetch, endpoint) {
  try {
    const res = await fetch(baseUrl + endpoint);
    const json = await res.json();
    return { data: json };
  } catch (e) {
    return { error: e };
  }
}

export async function loadProjects(fetch) {
  const res = await loadData(fetch, "projects.json");
  const projects = res.data?.rows || [];
  const sorted = projects.sort((a, b) => (a.id < b.id ? 1 : -1));
  return sorted;
}
