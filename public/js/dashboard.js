// Dashboard script

// Post Creator function
const newFormHandler = async (event) => {
    event.preventDefault();

    // extracting values from the form
    const name = document.querySelector('#postName').value.trim();
    const description = document.querySelector('#postDescription').value.trim();

    // parsing category_id to an integer for the categoryData.json
    category_id = parseInt(category_id);
    console.log(category_id);
    
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

// Delete post function

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        // sending a DELETE request to remove a recipe
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        // redirecting to the profile page if the request is successful
        if (response.ok) {
            document.location.replace('/dashboard');
        } else { // displaying an alert if the request fails
            alert('Failed to delete recipe');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#edit-post').forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.id;
            
            window.location.href = `/edit-post/${postId}`;
        });
    });
});

// event listener for form submission on share button click
document.querySelector('#sharePostBtn').addEventListener('click', newFormHandler);

// event listeners for delete button clicks on each recipe
const delBtn = document.querySelectorAll('#delete-post');
for (let i = 0; i <delBtn.length; i++) {
    delBtn[i].addEventListener('click', delButtonHandler);
};