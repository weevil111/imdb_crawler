const BASEURL = "http://localhost:3001";
export async function fetchMovies(page = 1, limit = 10, query = {}) {

  const response = await fetch(`${BASEURL}/search?page=${page}&limit=${limit}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({filters: query})
  })
  const data = await response.json();
  return data;
}

export async function fetchSelectorFields(){
  const response = await fetch(`${BASEURL}/selectorFields`);
  const data = await response.json();
  return data;
}