const addComment = async (event) => {
    event.preventDefault();

    const commentForm = document.querySelector('.comment-Creator');
    commentForm.classList.remove('hidden');
}

const newFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#postComment').value.trim();
    const postId = window.location.pathname.split('/').pop();

    if (comment) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment, post_id: postId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create post');
        }
    }
};

document.querySelector('#start-comment').addEventListener('click', addComment)
document.querySelector('#create-comment').addEventListener('click', newFormHandler);