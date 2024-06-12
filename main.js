function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 10px 60px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

var typingEffect = new Typed(".typedText", {
  strings: ["Vaibhavi"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000,
});

const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });
sr.reveal(".project-box", { interval: 200 });
sr.reveal(".top-header", {});

const srLeft = ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

const srRight = ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srRight.reveal(".skills-box", { delay: 100 });
srRight.reveal(".form-control", { delay: 100 });

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

const body = document.querySelector("body"),
  toggleSwitch = document.getElementById("toggle-switch");
toggleSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
});

function saveProfileData(name, email, contactNumber, address, shortBio, profilePicture) {
  const profileData = {
    name,
    email,
    contactNumber,
    address,
    shortBio,
    profilePicture
  };

  localStorage.setItem('profileData', JSON.stringify(profileData));
}

function loadProfileData() {
  const storedData = localStorage.getItem('profileData');

  if (storedData) {
    const profileData = JSON.parse(storedData);

    document.getElementById("displayName").textContent = profileData.name;
    document.getElementById("displayEmail").textContent = profileData.email;
    document.getElementById("displayContact").textContent = profileData.contactNumber;
    document.getElementById("displayAddress").textContent = profileData.address;
    document.getElementById("displayBio").textContent = profileData.shortBio;

    if (profileData.profilePicture) {
      document.getElementById("displayProfilePicture").src = profileData.profilePicture;
    } else {
      document.getElementById("displayProfilePicture").src = "avatar.jpg";
    }

    typingEffect.destroy();
    typingEffect = new Typed(".typedText", {
      strings: [profileData.name],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 2000,
    });
  }
}

function openLink(labelId) {
  const label = document.getElementById(labelId);
  const value = label.textContent.trim();

  switch (labelId) {
    case 'displayEmail':
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${value}`, '_blank');
      break;
    case 'displayContact':
      window.open(`tel:${value}`);
      break;
    case 'displayAddress':
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(value)}`, '_blank');
      break;
  }
}

function handleFormSubmission(event) {
  event.preventDefault(); 

  const name = document.querySelector('input[placeholder="Name"]').value;
  const email = document.querySelector('input[placeholder="Email"]').value;
  const contactNumber = document.querySelector('input[placeholder="Contact number"]').value;
  const address = document.querySelector('input[placeholder="Address"]').value;
  const shortBio = document.querySelector('input[placeholder="Short bio"]').value;
  const profilePicture = document.querySelector("#profile-picture").files[0];

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Contact Number:", contactNumber);
  console.log("Address:", address);
  console.log("Short Bio:", shortBio);
  console.log("Profile Picture:", profilePicture);

  document.getElementById("displayName").textContent = name;
  document.getElementById("displayEmail").textContent = email;
  document.getElementById("displayContact").textContent = contactNumber;
  document.getElementById("displayAddress").textContent = address;
  document.getElementById("displayBio").textContent = shortBio;

  if (profilePicture) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("displayProfilePicture").src = e.target.result;

      saveProfileData(name, email, contactNumber, address, shortBio, e.target.result);
    };
    reader.readAsDataURL(profilePicture);
  } else {
    document.getElementById("displayProfilePicture").src = "avatar.jpg"; 
    saveProfileData(name, email, contactNumber, address, shortBio, null);
  }

  typingEffect.destroy();
  typingEffect = new Typed(".typedText", {
    strings: [name],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
  });
}

document.querySelector("form").addEventListener("submit", handleFormSubmission);
window.addEventListener("load", loadProfileData);