// Profile script

// Post Creator function
const newFormHandler = async (event) => {
    event.preventDefault();

    // extracting values from the form
    const name = document.querySelector('#recipeName').value.trim();
    const time = document.querySelector('#prepTime').value.trim();
    let category_id = document.querySelector('#recipeCategory').value;
    const description = document.querySelector('#recipeDescription').value.trim();
    const ingredients = document.querySelector('#recipeIngredients').value.trim();
    const instructions = document.querySelector('#instructions').value.trim();

    // parsing category_id to an integer for the categoryData.json
    category_id = parseInt(category_id);
    console.log(category_id);
    
    // checking if all required fields are filled
    if (name && time && category_id && description && ingredients && instructions) {
        // sending a POST request to create a new recipe
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ name, time, category_id, description, image_url, ingredients, instructions }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // redirecting to the profile page if the request is successful
        if (response.ok) {
            document.location.replace('/profile');
        } else { // displaying an alert if the request fails
            alert('Failed to create recipe');
        }
    }
};

// Delete recipe function

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        // sending a DELETE request to remove a recipe
        const response = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
        });

        // redirecting to the profile page if the request is successful
        if (response.ok) {
            document.location.replace('/profile');
        } else { // displaying an alert if the request fails
            alert('Failed to delete recipe');
        }
    }
};



// event listener for opening the Cloudinary widget on button click
document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
}, false);

// event listener for form submission on share button click
document.querySelector('#shareRecipeBtn').addEventListener('click', newFormHandler);

// event listeners for delete button clicks on each recipe
const delBtn = document.querySelectorAll('#delete-recipe');
for (let i = 0; i <delBtn.length; i++) {
    delBtn[i].addEventListener('click', delButtonHandler);
};