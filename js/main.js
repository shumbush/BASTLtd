document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
let menu = document.querySelector(".navbar");
let modal = document.querySelector(".parts-modal-container");
const loading = document.querySelector(".loading");

//  hide menu bar
window.onscroll = () => {
  menu.classList.remove("active");
};
// header
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

let menubar = document.querySelector("#menu-bar");
menubar.onclick = () => {
  menu.classList.toggle("active");
  menu.classList.toggle("show");
};

db.collection("products")
  .get()
  .then((snapshot) => {
    let spareParts = [];
    snapshot.docs.forEach((doc) => {
      spareParts.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        image: doc.data().image,
      });
    });
    loading.style.display = "none";
    renderSpareParts(spareParts);
  });

const renderSpareParts = (spareParts) => {
  spareParts.forEach((part) => {
    let html = `
    <div class="box">
            <img src="${part.image}" alt="">
            <h3>${part.title}</h3>

            <div class="box-action">
                <a href="https://wa.me/250787734109" class="btn-whatsapp"><i class="fa-brands fa-whatsapp"></i></a>
                <a class="details" data-id="${part.id}">View Details</a>
            </div>
        </div>
    `;
    document
      .querySelector(".parts-container")
      .insertAdjacentHTML("beforeend", html);
  });

  let detailsBtn = document.querySelectorAll(".details");

  Array.from(detailsBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      modal.classList.add("show");
      document.querySelector(".parts-modal-container").innerHTML = "";
      let part = spareParts.find((part) => part.id == id);
      let html = `
        <div class="parts-modal">
            <div class="parts-modal-img">
                <img src="${part.image}" alt="">
            </div>
            <h3>${part.title}</h3>
            <p>${part.description}</p>
                <button class="parts-modal-close"><i class="fa-solid fa-circle-xmark"></i></button>
        </div>
      `;
      document
        .querySelector(".parts-modal-container")
        .insertAdjacentHTML("beforeend", html);
      let modalClose = document.querySelector(".parts-modal-close");

      modalClose.addEventListener("click", () => {
        modal.classList.remove("show");
      });
    });
  });
};
