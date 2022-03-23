(function () {
  if (document.cookie.indexOf("token") === -1) {
    document.location.href = "login.html";
  }
})();

const formContainer = document.querySelector(".form-container");
const createBtn = document.querySelector(".create-btn");
const closeModal = document.querySelector(".close-modal");
const addArticleForm = document.querySelector(".add-article-form");
const title = document.querySelector("#title");
const description = document.querySelector("#content");
const image = document.querySelector("#image");
const addArticleBtn = document.querySelector(".add-article-btn");
const alert = document.querySelector(".alert");
const loading = document.querySelector(".loading");
const updateArticleBtn = document.querySelector(".update-article-btn");
const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.onclick = function () {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "login.html";
};

function displayArticles(articles) {
  let blog = "";
  for (let i = 0; i < articles.length; i++) {
    let template = `
        <a class="article" href="#" data-id=${articles[i].id} >
            <div>
                <div class="article-img">
                    <img src="${articles[i].image}" alt="image">
                </div>
                <h3>${articles[i].title}</h3>
                <p>${articles[i].description}</p>
                <div class="action-btn">
                  <button type="submit" class="edit-btn">
                    <i class="far fa-edit"></i>
                  </button>
                  <button type="submit" class="delete-btn">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
            </div>
        </a>
        `;
    blog += template;
  }
  return blog;
}

const articlesContainer = document.querySelector(".articles");

//open modal when create article button is clicked
createBtn.addEventListener("click", () => {
  updateArticleBtn.style.display = "none";
  formContainer.classList.toggle("open-modal");
});

//close modal when cancel button is clicked
closeModal.addEventListener("click", () => {
  formContainer.classList.toggle("open-modal");
});

addArticleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //check if all fields are filled
  if (!title.value || !description.value || !image.value) {
    alert.style.display = "block";
    alert.style.backgroundColor = "#f44336";
    alert.style.color = "#fff";
    alert.innerHTML = `Please fill all fields`;
  } else {
    const article = {
      title: title.value,
      description: description.value,
      image: image.value,
    };
    console.log(article);

    addArticleBtn.innerHTML += '<i class="fas fa-spinner fa-spin"></i>';
    addArticleBtn.setAttribute("disabled", "disabled");

    //add article to firebase
    db.collection("products")
      .add(article)
      .then(() => {
        alert.style.display = "block";
        alert.innerHTML = `Article added successfully`;
        addArticleBtn.innerHTML = "Add Article";
        addArticleBtn.removeAttribute("disabled");

        //close modal when successful added
        setTimeout(() => {
          formContainer.classList.toggle("open-modal");
          window.location.reload();
        }, 1000);
      });
  }
});

//Display articles
db.collection("products")
  .get()
  .then((snapshot) => {
    let articles = [];
    snapshot.docs.forEach((doc) => {
      articles.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        image: doc.data().image,
      });
    });
    console.log("ART::", articles);
    loading.style.display = "none";
    articlesContainer.innerHTML = displayArticles(articles);
    console.log(articlesContainer);

    const articlesLinks = document.querySelectorAll(".article");
    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");

    // articlesLinks.forEach((article) => {
    //   article.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     console.log(article.getAttribute('data-id'));
    //     const id = article.getAttribute('data-id');
    //     window.location.href = `blog.html?id=${id}`;
    //   });
    // });

    deleteBtns.forEach((btn) => {
      //btn to delete article
      btn.addEventListener("click", (e) => {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        e.preventDefault();
        const id =
          btn.parentElement.parentElement.parentElement.getAttribute("data-id");
        db.collection("products")
          .doc(id)
          .delete()
          .then(() => {
            btn.innerHTML = '<i class="far fa-trash-alt"></i>';
            window.location.reload();
          });
      });
    });

    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", (e) => {
        addArticleBtn.style.display = "none";
        updateArticleBtn.style.display = "block";
        editBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        e.preventDefault();
        const id =
          editBtn.parentElement.parentElement.parentElement.getAttribute(
            "data-id"
          );

        //get the article details and fill data in the form
        db.collection("products")
          .doc(id)
          .get()
          .then((doc) => {
            title.value = doc.data().title;
            description.value = doc.data().description;
            image.value = doc.data().image;
            formContainer.classList.toggle("open-modal");
            editBtn.innerHTML = '<i class="far fa-edit"></i>';
            console.log(doc.data());

            //update article
            updateArticleBtn.addEventListener("click", (e) => {
              updateArticleBtn.innerHTML +=
                '<i class="fas fa-spinner fa-spin"></i>';

              e.preventDefault();
              const article = {
                title: title.value,
                description: description.value,
                image: image.value,
              };
              console.log(article);
              db.collection("products")
                .doc(id)
                .update(article)
                .then(() => {
                  alert.style.display = "block";
                  alert.innerHTML = `Article updated successfully`;
                  updateArticleBtn.innerHTML = "Update Article";

                  setTimeout(() => {
                    formContainer.classList.toggle("open-modal");
                    window.location.reload();
                  }, 1000);
                });
            });
          });
      });
    });
  });
