// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Path to your JSON file
var url = './health_article.json';

// Initialize the request
xhr.open('GET', url, true);

// Set the expected response type to JSON
xhr.responseType = 'json';

// When the data loads successfully
xhr.onload = function () {
  if (xhr.status === 200) {
    // Access the JSON data
    var articles = xhr.response.articles;
    var articlesDiv = document.getElementById('articles');

    // Loop through each article and create HTML dynamically
    articles.forEach(function(article) {
      var articleDiv = document.createElement('div');
      articleDiv.classList.add('article');

      // Title
      var title = document.createElement('h2');
      title.textContent = article.title;

      // Description
      var description = document.createElement('p');
      description.textContent = article.description;

      // Ways to achieve
      var waysHeader = document.createElement('h3');
      waysHeader.textContent = 'Ways to Achieve:';
      var waysList = document.createElement('ul');

      article.ways_to_achieve.forEach(function(way) {
        var listItem = document.createElement('li');
        listItem.textContent = way;
        waysList.appendChild(listItem);
      });

      // Benefits
      var benefitsHeader = document.createElement('h3');
      benefitsHeader.textContent = 'Benefits:';
      var benefitsList = document.createElement('ul');

      article.benefits.forEach(function(benefit) {
        var listItem = document.createElement('li');
        listItem.textContent = benefit;
        benefitsList.appendChild(listItem);
      });

      articleDiv.appendChild(title);
      articleDiv.appendChild(description);
      articleDiv.appendChild(waysHeader);
      articleDiv.appendChild(waysList);
      articleDiv.appendChild(benefitsHeader);
      articleDiv.appendChild(benefitsList);

      
      articlesDiv.appendChild(articleDiv);
    });
  } else {
    console.error('Error loading JSON file:', xhr.status);
  }
};

xhr.send();
