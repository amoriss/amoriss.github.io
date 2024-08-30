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
