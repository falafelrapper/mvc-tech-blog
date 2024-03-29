document.addEventListener('DOMContentLoaded', async () => {
    const postId = document.querySelector('#postId').value;

    document.querySelector('#editPostBtn').addEventListener('click', async () => {
        const newName = document.querySelector('#postName').value.trim();
        const newDescription = document.querySelector('#postDescription').value.trim();

        if (newName && newDescription) {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({ name: newName, description: newDescription }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.href = `/posts/${postId}`;
            } else {
                alert('Failed to update post');
            }
        } else {
            alert('Please fill out all fields');
        }
    });
});
