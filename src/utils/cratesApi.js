// Fetch crate data from crates.io API
export async function fetchCrateData(crateName) {
  try {
    const [infoResponse, downloadsResponse] = await Promise.all([
      fetch(`https://crates.io/api/v1/crates/${crateName}`),
      fetch(`https://crates.io/api/v1/crates/${crateName}/downloads`)
    ]);

    const infoData = await infoResponse.json();
    const downloadsData = await downloadsResponse.json();

    return {
      info: infoData.crate,
      downloads: downloadsData.version_downloads
    };
  } catch (error) {
    console.error('Error fetching crate data:', error);
    return null;
  }
}

export async function searchCrates(query) {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(`https://crates.io/api/v1/crates?q=${encodeURIComponent(query)}&per_page=5`);
    const data = await response.json();
    return data.crates || [];
  } catch (error) {
    console.error('Error searching crates:', error);
    return [];
  }
}

export function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}