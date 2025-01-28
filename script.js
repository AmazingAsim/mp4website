// to  show and switch reviews 
let reviews = [
    {
        id:1,
        name:"Rohit Gautam",
        title:"Brand Manager",
        review:"4PM HAS CONSISTENTLY IMPREED ME WITH THEIR COMMITMENT AND DEDICATION TO ACHIEVING THE BEST POSSIBLE RESULT FOR OUR BRAND",
        workfor:"Graduvation",
        img:"./assets/avatar1.png",
    },
    {
        id:2,
        name:"Asim Sheikh",
        title:"Mern Stack Trainer",
        review:"4PM HAS CREATED TOP NOTCH CONTENT FOR US TO LEARN FROM AND GROW AS A DEVELOPER",
        workfor:"Graduvation",
        img:"./assets/avatar2.png",
    },
    {
        id:3,
        name:"Arjun Singh",
        title:"Marketing Manager",
        review:"4PM HAS CONSISTENTLY IMPREED ME WITH THEIR COMMITMENT AND DEDICATION TO ACHIEVING THE BEST POSSIBLE RESULT FOR OUR BRAND",
        workfor:"Graduvation",
        img:"./assets/avatar3.png",
    }
]
const reviewbox = document.getElementById("reviewbox");
function updateReview(id){
    const review = reviews.find((review) => review.id === id);
    reviewbox.innerHTML = `
    <p class="r_text"><q>${review.review}</q></p>
    <p class="r_name">${review.name}, ${review.title}</p>
    <p class="r_work">${review.workfor}</p>
    <p class="r_no">${review.id}/${reviews.length}</p>
    `

     // Select all avatar images
     const avatars = document.querySelectorAll(".avatar img");

     avatars.forEach((avatar, index) => {
         if (index === id - 1) {
             // Set opacity to 1 for the selected avatar
             avatar.style.opacity = "1";
             avatar.style.boxShadow = "0px 0px 20px rgb(255, 255, 255)";
         } else {
             // Set opacity to 0.4 for the others
             avatar.style.opacity = "0.4";
             avatar.style.boxShadow = "none";
         }
     });

}
updateReview(1);

// to switch active class of navbar 

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Remove the 'active' class from all links
    navLinks.forEach((nav) => nav.classList.remove("active"));

    // Add the 'active' class to the clicked link
    event.target.classList.add("active");
  });
});


// form submition 

let successmodal = document.getElementById("successmodal");
let failedmodal = document.getElementById("failedmodal");

let failedModalInstance = new bootstrap.Modal(failedmodal);
let successModalInstance = new bootstrap.Modal(successmodal);

document.getElementById('queryform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from redirecting

    const formData = new FormData(this);

    fetch('backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response =>response.json())
    .then(data => {
        console.log(data);
        console.log(data.status);
       
            document.getElementById('successmessage').innerHTML = data.message || "Your query has been submitted successfully";
            successModalInstance.show(); // Show success popup
            this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        failedModalInstance.show(); // Show error popup
        this.reset();
    });
});


const mainContent = document.getElementById('main-content');
const successModal = document.getElementById('successmodal');
const failedModal = document.getElementById('failedmodal');

// Function to handle modal visibility
  function toggleAriaHidden(modal, isVisible) {
    if (isVisible) {
        modal.setAttribute('aria-hidden', 'false');
        mainContent.setAttribute('aria-hidden', 'true');
    } else {
        modal.setAttribute('aria-hidden', 'true');
        mainContent.setAttribute('aria-hidden', 'false');
    }
}

// Event listeners for modals
successModal.addEventListener('show.bs.modal', () => toggleAriaHidden(successModal, true));
successModal.addEventListener('hide.bs.modal', () => toggleAriaHidden(successModal, false));

failedModal.addEventListener('show.bs.modal', () => toggleAriaHidden(failedModal, true));
failedModal.addEventListener('hide.bs.modal', () => toggleAriaHidden(failedModal, false));