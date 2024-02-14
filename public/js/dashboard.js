// Dashboard script

// Post Creator function
const newFormHandler = async (event) => {
    event.preventDefault();


    const name = document.querySelector('#postName').value.trim();
    const description = document.querySelector('#postDescription').value.trim();


    category_id = parseInt(category_id);
    console.log(category_id);
    

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

// Delete post function

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else { 
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


document.querySelector('#delete-post').addEventListener('click', newFormHandler);

const delBtn = document.querySelectorAll('#delete-post');
for (let i = 0; i <delBtn.length; i++) {
    delBtn[i].addEventListener('click', delButtonHandler);
};