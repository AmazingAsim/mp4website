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

document.getElementById('queryform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from redirecting

    const formData = new FormData(this);

    fetch('backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            alert("Your message has been sent successfully!"); // Show success popup
            this.reset();
        } else {
            alert("Something went wrong. Please try again."); // Show error popup
            this.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
});