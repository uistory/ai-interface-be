export const recipePrompt = `Given the following ingredients: {ingredients}, provide an array of 3 recipes. Each recipe must be in the following JSON format:
    [
      {{
        "id": 1,  // A unique numeric identifier for the recipe
        "name": "Chicken Pasta with Tomato Sauce",  // The name of the recipe
        "image": "https://example.com/chicken-pasta.jpg",  // A URL to an image of the dish
        "calories": 550,  // The number of calories per serving
        "prepTime": 30,  // Preparation time in minutes
        "allergens": ["Gluten"],  // List of allergens (e.g., gluten)
        "rating": 4.7,  // Average rating out of 5
        "nutriScore": "B",  // Nutritional score (e.g., A, B, C)
        "tasteProfile": ["Savory", "Umami"],  // Taste profile of the dish
        "ingredients": ["Chicken breast", "Pasta", "Tomatoes", "Garlic", "Olive oil"],  // List of ingredients
        "instructions": [
          "Cook the pasta according to package instructions.",
          "Dice chicken, cook it with olive oil and garlic.",
          "Add tomatoes and cook until a sauce forms.",
          "Combine pasta with sauce and serve."
        ]  // Instructions for preparing the dish
        }},
      {{
        "id": 2,  // Another unique identifier for the second recipe
        "name": "Vegetarian Stir Fry",  // Another recipe name
        "image": "https://example.com/vegetarian-stir-fry.jpg",  // Image URL for this recipe
        "calories": 350,  // Calories for the second recipe
        "prepTime": 20,  // Prep time for the second recipe
        "allergens": ["Soy"],  // Allergen information for this recipe
        "rating": 4.3,  // Rating for this recipe
        "nutriScore": "A",  // Nutritional score for this recipe
        "tasteProfile": ["Sweet", "Savory"],  // Taste profile for this recipe
        "ingredients": ["Bell peppers", "Tofu", "Soy sauce", "Garlic", "Ginger"],  // Ingredients for the second recipe
        "instructions": [
          "Heat oil in a pan, add garlic and ginger.",
          "Add bell peppers and tofu, stir-fry for 5 minutes.",
          "Add soy sauce and stir to combine.",
          "Serve hot."
        ]  // Instructions for the second recipe
      }},
      {{
        "id": 3,  // A unique identifier for the third recipe
        "name": "Beef Tacos",  // Name for the third recipe
        "image": "https://example.com/beef-tacos.jpg",  // Image URL for the third recipe
        "calories": 600,  // Calories for the third recipe
        "prepTime": 25,  // Prep time for the third recipe
        "allergens": ["Dairy", "Gluten"],  // Allergens for this recipe
        "rating": 4.8,  // Rating for the third recipe
        "nutriScore": "B",  // Nutritional score for this recipe
        "tasteProfile": ["Savory", "Spicy"],  // Taste profile for this recipe
        "ingredients": ["Ground beef", "Taco shells", "Lettuce", "Cheese", "Tomato"],  // Ingredients for the third recipe
        "instructions": [
          "Cook the ground beef in a pan, add seasoning.",
          "Prepare taco shells and fill them with cooked beef.",
          "Top with lettuce, tomato, and cheese.",
          "Serve immediately."
        ]  // Instructions for the third recipe
      }}
    ]
    Ensure that the output is **only a JSON array** containing these 3 recipes in the exact format described above. Do **not include any additional fields** (such as a "recipes" key).`;
