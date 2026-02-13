const express = require("express");

const app = express();
const port = process.env.PORT || 5001;

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

async function fetchAllCountries() {
  const url =
    "https://restcountries.com/v3.1/all?fields=name,capital,population,region";
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`REST Countries error: ${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("REST Countries returned unexpected data");
  }

  return data;
}

function countryName(c) {
  return c && c.name && c.name.common ? c.name.common : "Unknown";
}

function countryCapital(c) {
  const cap = c && c.capital;
  if (Array.isArray(cap) && cap.length > 0) return cap[0];
  if (typeof cap === "string" && cap.trim()) return cap.trim();
  return "n/a";
}

function countryPopulation(c) {
  return Number.isFinite(c && c.population) ? c.population : 0;
}

function countryRegion(c) {
  const r = c && c.region;
  return typeof r === "string" && r.trim() ? r.trim() : "Unknown";
}

app.get("/", (req, res) => res.redirect("/home"));

app.get("/home", (req, res) => {
  res.status(200).render("home", { title: "Welcome", active: "home" });
});

app.get("/capitals", async (req, res) => {
  try {
    const countries = await fetchAllCountries();
    const rows = countries
      .map((c) => ({ country: countryName(c), capital: countryCapital(c) }))
      .sort((a, b) => a.country.localeCompare(b.country));

    res.status(200).render("capitals", {
      title: "Countries and Capitals",
      active: "capitals",
      rows,
    });
  } catch (err) {
    res.status(500).type("text/plain").send(err.message);
  }
});

app.get("/populous", async (req, res) => {
  try {
    const countries = await fetchAllCountries();
    const rows = countries
      .map((c) => ({
        country: countryName(c),
        population: countryPopulation(c),
      }))
      .filter((x) => x.population >= 50_000_000)
      .sort((a, b) => b.population - a.population);

    res.status(200).render("populous", {
      title: "Most Populous Countries",
      active: "populous",
      rows,
    });
  } catch (err) {
    res.status(500).type("text/plain").send(err.message);
  }
});

app.get("/regions", async (req, res) => {
  try {
    const countries = await fetchAllCountries();

    const counts = {};
    for (const c of countries) {
      const region = countryRegion(c);
      counts[region] = (counts[region] || 0) + 1;
    }

    const rows = Object.entries(counts)
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => a.region.localeCompare(b.region));

    res.status(200).render("regions", {
      title: "Regions of the World",
      active: "regions",
      rows,
    });
  } catch (err) {
    res.status(500).type("text/plain").send(err.message);
  }
});

app.use((req, res) => {
  res.status(404).type("text/plain").send("404 - page not found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
