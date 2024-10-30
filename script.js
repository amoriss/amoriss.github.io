async function handleSubmit(event) {
	event.preventDefault(); // Prevent default form submission
	
	const form = document.getElementById('form');
	const resultDiv = document.getElementById('form-result');
	const email = document.getElementById('email').value;
	
	// Validate email with EVA API
	const isEmailValid = await validateEmail(email);
	
	if (!isEmailValid) {
		resultDiv.textContent = 'The email address is invalid. Please enter a valid email.';
		return false; // Prevent form submission
	}

	// Submit the form if email is valid
	try {
		const response = await fetch(form.action, {
			method: form.method,
			body: new FormData(form),
			headers: { 'Accept': 'application/json' } // Ensure that the server responds with JSON
		});

		if (response.ok) {
			resultDiv.textContent = 'Form successfully sent!';
			form.reset(); // Optionally reset the form
		} else {
			resultDiv.textContent = 'There was an error sending the form. Please try again.';
		}
	} catch (error) {
		resultDiv.textContent = 'There was an error sending the form. Please try again.';
		console.error('Error:', error);
	}

	return false; // Prevent default form submission
}

async function validateEmail(email) {
	const url = `https://api.eva.pingutil.com/email?email=${encodeURIComponent(email)}`;
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	try {
		const response = await fetch(url, requestOptions);
		const result = await response.json();
		return result.status === 'valid'; // Check the validity status
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}


/*---------PROJECT IMAGES---------------*/
document.querySelectorAll('.project-overlay').forEach(function(overlay) {
    var placeholder = overlay.getAttribute('data-placeholder');
    if (placeholder) {
      overlay.style.backgroundImage = 'url(' + placeholder + ')';
    }
  });

/*-----------CANVA PDF CAROUSEL--------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderItems = document.querySelectorAll('.slider-item');
    const itemWidth = sliderItems[0].clientWidth; // Width of one item
    const totalItems = sliderItems.length;
    let currentIndex = 0;
    const slidesToShow = 3; // Number of items to show at once
    const intervalTime = 3000; // Time between slides in milliseconds

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function slideNext() {
        currentIndex = (currentIndex + 1) % (totalItems - slidesToShow + 1);
        updateSlider();
    }

    setInterval(slideNext, intervalTime);

    // Initialize
    updateSlider();
});

/*-----------REVIEWS CAROUSEL----------------*/
document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = carouselImages.querySelectorAll('img');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    // const imageWidth = 900; // Width of each image in pixels
    const imageWidth = images[0].offsetWidth;

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * imageWidth; // Calculate offset
        carouselImages.style.transform = `translateX(${offset}px)`;
        prevButton.classList.toggle('show', currentIndex > 0);
        nextButton.classList.toggle('show', currentIndex < images.length - 1);
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    updateCarousel(); // Initialize carousel position
});

/*--------- SWIPER -------------*/

const reviews = [
    { name: "Taylor", feedback: "Amoriss is the best!", relation: "Student", link: "https://docs.google.com/presentation/d/10q9A9nj10WiStojQ9a3DUnXpBFoIbvp7WAD5MX5c_ks/edit?usp=sharing" },
    { name: "Kim", feedback: "My instructor is so nice, so patient and so knowledgable; I'm sure she could have a job anywhere", relation: "Student", link: "https://g.co/kgs/6b9exGw" },
    { name: "Bryan", feedback: "Hey Amoriss, hope all is going well! I just wanted to reach out and say thank you for all your help when I was in class! You were a great teacher. I got a job about 7 months ago with an amazing small company, my wife and I were able to buy a home  recently and honestly couldn't have done it without you guys! Just wanted to share and hope it's encouraging🙂", relation: "Student", link: "https://docs.google.com/presentation/d/1bd7-XtSfAGt06_LaAX59E3rxzJ3mrWr4nSJ_m-7-Bno/edit?usp=sharing" },
    { name: "Joseph", feedback: "As someone who has been to a few different colleges and many and other bootcamps,...shout out to our teacher Amoriss who does a great job. I can say I have Left every class not feeling overwhelmed and being able to retain that knowledge!", relation: "Student", link: "https://www.linkedin.com/posts/truecodersio_truecoders-codingbootcamp-careerincode-activity-7190758675521650689-0Cqr?utm_source=share&utm_medium=member_desktop" }, 
    { name: "Doug", feedback: "invaluable asset in any technical setting", relation: "Senior QA Engineer", link: "https://www.linkedin.com/in/amoriss/" },   
    { name: "Annie", feedback: "Amoriss, was such an amazing teacher and was very knowledgeable, patient and helpful.", relation: "Student", link: "https://www.coursereport.com/schools/truecoders?shared_review=66099#reviews" },    
    { name: "Derek", feedback: "Huge shoutout to Amoriss for spending a lot of her time helping me truly understand what I was doing.", relation: "Student", link: "https://www.coursereport.com/schools/truecoders" },
    { name: "Eric", feedback: "Thank you Amoriss", relation: "Student", link: "https://docs.google.com/presentation/d/174OXZCTsNtG5ISchi9-byqM1cZG6IZcTjm_lbfhTDCA/edit?usp=sharing" },
    
  ];

/*--------- NAV HEADER HAMBUGER-------------*/

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    console.log('JavaScript Loaded');
    console.log('Hamburger:', hamburger);
    console.log('Nav Menu:', navMenu);

    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked');
        navMenu.classList.toggle('active');
    });
});

const reviewSlides = document.getElementById('review-slides');

reviews.forEach(review => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
        <div class="review-card">
            <h3>${review.name}</h3>
            <p class="relation-badge"> ${review.relation}</p>
            <p>${review.feedback}</p>
            <a href="${review.link}" target="_blank">Read more</a>
        </div>
    `;
    reviewSlides.appendChild(slide);
});

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});