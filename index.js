// Fetch the JSON data from the local file

// fetch("data.json")
//   .then(function(response) {
//     if (!response.ok) {
//       throw new Error("Error fetching JSON data");
//     }
//     return response.json();
//   })
//   .then(function(data) {
//     var feedContainer = document.querySelector(".layout-container");
//     var loadMoreBtn = document.querySelector(".load-more-btn");
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImage = document.querySelector('.lightbox-image');
//     const closeBtn = document.querySelector('.close-btn');


//     var visiblePosts = 4;
    
//     function showPosts() {
//       for (var i = 0; i < visiblePosts; i++) {
//         if (i >= data.length) {
//           loadMoreBtn.style.display = "none";
//           break;
//         }

//         var post = data[i];
//         var postCard = document.createElement("div");
//         postCard.classList.add("post-card");

//         var postContent = "";
//         if (post.type === "image") {
//           postContent += '<img src="' + post.image + '" alt="Post Image">';
//         }
//         postContent += '<div class="card-content">' +
//                           '<h4>' + post.caption + '</h4>' +
//                           '<p>' + post.likes + ' Likes</p>' +
//                           '<p>Source: ' + post.source_type + '</p>' +
//                           '<div class="user-info">' +
//                             '<img src="' + post.profile_image + '" alt="Profile Image" class="profile-image">' +
//                             '<span class="user-name">' + post.name + '</span>' +
//                           '</div>' +
//                         '</div>';
//         postCard.innerHTML = postContent;

//         feedContainer.appendChild(postCard);
//       }
//     }

//     showPosts();

//     loadMoreBtn.addEventListener("click", function() {
//       visiblePosts += 4;
//       showPosts();
//     });
//   })
//   .catch(function(error) {
//     console.error(error.message);
//   });

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
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.close-btn');

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

        var profileImage = document.createElement("img");
        profileImage.src = post.profile_image;
        profileImage.alt = "Profile Image";
        profileImage.classList.add("profile-image");
        postCard.appendChild(profileImage);

        var userName = document.createElement("span");
        userName.classList.add("user-name");
        userName.textContent = post.name;
        postCard.appendChild(userName);

        var cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        var caption = document.createElement("h4");
        caption.textContent = post.caption;

        if (post.type === "image") {
          var postImage = document.createElement("img");
          postImage.src = post.image;
          postImage.alt = "Post Image";
          postImage.addEventListener("click", function() {
            lightbox.style.display = "block";
            lightboxImage.src = post.image;
          });
          postCard.appendChild(postImage);
        }

        var likes = document.createElement("p");
        likes.textContent = post.likes + " Likes";

        var source = document.createElement("p");
        source.textContent = "Source: " + post.source_type;

        cardContent.appendChild(caption);
        cardContent.appendChild(likes);
        cardContent.appendChild(source);
        postCard.appendChild(cardContent);

        feedContainer.appendChild(postCard);
      }
    }

    showPosts();

    loadMoreBtn.addEventListener("click", function() {
      visiblePosts += 4;
      showPosts();
    });

    closeBtn.addEventListener("click", function() {
      lightbox.style.display = "none";
    });
  })
  .catch(function(error) {
    console.error(error.message);
  });


// render the social media feed
function renderSocialMediaFeed(data) {
  const feedContainer = document.querySelector('.layout-container');
  let renderedPosts = 0;
  const postsPerPage = 4;

  // create a post card element
  function createPostCard(post) {
    const card = document.createElement('div');
    card.classList.add('post-card');

    const profileImage = document.createElement('img');
    profileImage.src = post.profile_image;
    profileImage.classList.add('profile-image');
    cardContent.appendChild(profileImage);

    const image = document.createElement('img');
    image.src = post.image;
    card.appendChild(image);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const name = document.createElement('h4');
    name.textContent = post.name;
    cardContent.appendChild(name);

    const caption = document.createElement('p');
    caption.textContent = post.caption;
    cardContent.appendChild(caption);

    card.appendChild(cardContent);

    return card;
  }

  // render a batch of posts
  function renderPosts(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      if (i >= data.length) {
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

// switch between dark and light theme
  document.addEventListener('click', function () {
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
