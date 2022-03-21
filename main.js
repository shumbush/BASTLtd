let menu = document.querySelector(".navbar");
let modal = document.querySelector(".parts-modal-container");

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

const spareParts = [
  {
    id: 1,
    name: "Auto Spare Parts",
    image: "/img/sp1.jpg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    name: "Car Spare Parts",
    image: "/img/sp2.jpg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    name: "Bike Spare Parts",
    image: "/img/sp3.jpg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    name: "Truck Spare Parts",
    image: "/img/sp4.jpg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    name: "Truck Spare Parts",
    image: "/img/sp5.jpg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

spareParts.forEach((part) => {
  let html = `
    <div class="box">
            <img src="${part.image}" alt="">
            <h3>${part.name}</h3>

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
            <h3>${part.name}</h3>
            <p>${part.details}</p>
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
