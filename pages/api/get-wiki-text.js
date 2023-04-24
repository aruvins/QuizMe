export default async function index(req, res) {
  if (req.method !== "POST") {
    req.status(402);
    return;
  }


  const text = JSON.parse(req.body)["text"];
  var returnObject;

  const fetchWikipediaSummary = async (text) => {
    try {
      const getClosest = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
          text
        )}`
      );

      var closestArticleName;

      if (getClosest.ok) {
        const closestArticleData = await getClosest.json();
        closestArticleName = closestArticleData[1][0];
      } else {
        return 500;
      }

      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          closestArticleName
        )}`
      );

      if (response.ok) {
        const data = await response.json();
        returnObject = data;
        return 200;
      } else {
        return 402;
      }
    } catch (error) {
      console.error("Error fetching Wikipedia summary:", error);
      return 500;
    }
  };


  var wikiStatus = await fetchWikipediaSummary(text);

  if (wikiStatus !== 200) {
    res.status(wikiStatus);
  } else {
    res.status(200).json(returnObject.extract);
  }

  return;
}
