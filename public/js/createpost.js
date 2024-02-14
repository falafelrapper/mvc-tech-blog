const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#postName').value.trim();
    const description = document.querySelector('#postDescription').value.trim();

    if (name && description) {

        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else { 
            alert('Failed to create post');
        }
    }
};


document.querySelector('#sharePostBtn').addEventListener('click', newFormHandler);