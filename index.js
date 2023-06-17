// index.js

// Fetch the JSON data from the local file
fetch("data.json")
  .then(function(response) {
    if (!response.ok) {
      throw new Error("Error fetching JSON data");
    }
    return response.json();
  })
  .then(function(data) {
    var feedContainer = document.querySelector(".layout-container");
    var loadMoreBtn = document.querySelector(".load-more-btn");

    var visiblePosts = 4;
    
    function showPosts() {
      for (var i = 0; i < visiblePosts; i++) {
        if (i >= data.length) {
          loadMoreBtn.style.display = "none";
          break;
        }

        var post = data[i];
        var postCard = document.createElement("div");
        postCard.classList.add("post-card");

        var postContent = "";
        if (post.type === "image") {
          postContent += '<img src="' + post.image + '" alt="Post Image">';
        }
        postContent += '<div class="card-content">' +
                          '<h4>' + post.caption + '</h4>' +
                          '<p>' + post.likes + ' Likes</p>' +
                          '<p>Source: ' + post.source_type + '</p>' +
                          '<div class="user-info">' +
                            '<img src="' + post.profile_image + '" alt="Profile Image" class="profile-image">' +
                            '<span class="user-name">' + post.name + '</span>' +
                          '</div>' +
                        '</div>';
        postCard.innerHTML = postContent;

        feedContainer.appendChild(postCard);
      }
    }

    showPosts();

    loadMoreBtn.addEventListener("click", function() {
      visiblePosts += 4;
      showPosts();
    });
  })
  .catch(function(error) {
    console.error(error.message);
  });

// Function to render the social media feed
function renderSocialMediaFeed(data) {
  const feedContainer = document.querySelector('.layout-container');
  let renderedPosts = 0;
  const postsPerPage = 4;

  // Function to create a post card element
  function createPostCard(post) {
    const card = document.createElement('div');
    card.classList.add('post-card');

    const image = document.createElement('img');
    image.src = post.image;
    card.appendChild(image);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const profileImage = document.createElement('img');
    profileImage.src = post.profile_image;
    profileImage.classList.add('profile-image');
    cardContent.appendChild(profileImage);

    const name = document.createElement('h4');
    name.textContent = post.name;
    cardContent.appendChild(name);

    const caption = document.createElement('p');
    caption.textContent = post.caption;
    cardContent.appendChild(caption);

    card.appendChild(cardContent);

    return card;
  }

  // Function to render a batch of posts
  function renderPosts(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      if (i >= data.length) {
        // Hide the "Load More" button if all posts have been loaded
        loadMoreBtn.style.display = 'none';
        break;
      }
      const post = data[i];
      const postCard = createPostCard(post);
      feedContainer.appendChild(postCard);
    }
    renderedPosts += postsPerPage;
  }

  // Render the initial batch of posts
  renderPosts(0, postsPerPage);

  document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;
  
    themeSwitch.addEventListener('click', function () {
      if (themeSwitch.checked) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    });
  });
  

  // "Load More" button click event
  const loadMoreBtn = document.querySelector('.load-more-btn');
  loadMoreBtn.addEventListener('click', () => {
    const startIndex = renderedPosts;
    const endIndex = renderedPosts + postsPerPage;
    renderPosts(startIndex, endIndex);
  });
}
