async function handleSubmit(event) {
	event.preventDefault();
	
	const email = document.getElementById('email').value;
	const resultDiv = document.getElementById('validation-result');

	// Validate email with EVA API
	const isEmailValid = await validateEmail(email);
	if (!isEmailValid) {
		resultDiv.textContent = 'The email address is invalid. Please enter a valid email.';
		return false;
	}

	// If email is valid, submit the form
	//document.getElementById('form').submit();

	 // Submit the form
	 fetch(form.action, {
		method: form.method,
		body: new FormData(form)
	})
	.then(response => {
		if (response.ok) {
			resultDiv.textContent = 'Form successfully sent!';
			form.reset(); // Optionally reset the form after successful submission
		} else {
			resultDiv.textContent = 'There was an error sending the form. Please try again.';
		}
	})
	.catch(error => {
		resultDiv.textContent = 'There was an error sending the form. Please try again.';
		console.error('Error:', error);
	});


	return false; // Prevents the default form submission
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
		return result.status === 'valid';
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}