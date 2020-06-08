const express = require('express');

const app = express();

function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

app.get('/api/search', (req, res) => {
  const searchKey = req.headers.searchkey || ''.toLowerCase();
  const delayTime = Math.floor(Math.random() * (5000 - 500 + 1) + 500);
  wait(delayTime);

  if (!searchKey) {
    res.json([]);
  }

  const { data } = require('./db/search.json');

  const searchResults = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].title.toLowerCase().includes(searchKey)) {
      searchResults.push(data[i]);
    }
  }

  res.json(searchResults);
});

app.get('/newfeed/:id', function (req, res) {
  const id = req.params.id;
  const { data } = require('./db/details.json');

  const delayTime = Math.floor(Math.random() * (5000 - 500 + 1) + 500);
  wait(delayTime);

  const detailsData = data.find((item) => item.id === +id);
  res.json(detailsData);
});

const PORT = 8083;

app.use(function (req, res, next) {
  res.status(404);
  res.send({ errorCode: 404, message: 'Unable to find page' });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
