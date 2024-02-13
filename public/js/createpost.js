const newFormHandler = async (event) => {
    event.preventDefault();

    // extracting values from the form
    const name = document.querySelector('#postName').value.trim();
    const description = document.querySelector('#postDescription').value.trim();


    
    // checking if all required fields are filled
    if (name && description) {
        // sending a POST request to create a new recipe
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // redirecting to the profile page if the request is successful
        if (response.ok) {
            document.location.replace('/dashboard');
        } else { // displaying an alert if the request fails
            alert('Failed to create post');
        }
    }
};

// event listener for form submission on share button click
document.querySelector('#sharePostBtn').addEventListener('click', newFormHandler);