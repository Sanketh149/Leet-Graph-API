const fetch = require("node-fetch");

const query = `
  query getUserContestRankingHistory($username: String!) {
    userContestRankingHistory(username: $username) {
      attended
          trendDirection
          problemsSolved
          totalProblems
          finishTimeInSeconds
          rating
          ranking
          contest
          {
            title
            startTime
          }
    }
  }
`;

//fetching the data
exports.leetcode = (req, res) => {
  let user = req.params.id;
  fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query: query, variables: { username: user } }),
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.errors) {
        res.send(data);
      } else {
        res.send(data.data);
      }
    })
    .catch((err) => {
      console.error("Error", err);
      res.send(err);
    });
};
