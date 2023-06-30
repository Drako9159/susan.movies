async function api(){
    const url = `https://api.themoviedb.org/3/search/multi?query=harry&include_adult=true&language=es&page=1`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTliMDFlZDM0NmNhZWY2ZmEzODJhZWM3ZmE3OGFiNSIsInN1YiI6IjYzMzYwOWJjMjU1ZGJhMDA4MTY5ZDZmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y5sFjoFAoVU_W17h1dKh1-npovEmh2Lw12Ah9ABYzUQ",
  },
};

const response = await fetch(url, options);
// .then((res) => res.json())
// .then((json) => (json))
// .catch((err) => console.error("error:" + err));
const data = await response.json();
console.log(data);
}
api()
