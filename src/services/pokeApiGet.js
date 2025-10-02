async function getPkmn(ApiUrl) {
  const response = await fetch(ApiUrl);
  const pkmns = await response.json();
  return pkmns;
}

module.exports = { getPkmn };
