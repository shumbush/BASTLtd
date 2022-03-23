const urlParams = new URLSearchParams(window.location.search); //?id=1
const id = urlParams.get('id');
let blog = document.querySelector('.blog');

db.collection('blog')
  .doc(id)
  .get()
  .then((doc) => {
    loading.style.display = 'none';
    console.log(doc.data());
    let article = doc.data();

    if (article) {
      let articleTemplate = `
        <div class="blog-img">
            <img src="${article.image}" alt="" />
        </div>
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <button>Leave a comment</button>
    `;
      blog.innerHTML += articleTemplate;
    } else {
      blog.innerHTML = '<h1>Article has not found!</h1>';
    }
  });

// let article = articles.find((article) => article.id == id);

