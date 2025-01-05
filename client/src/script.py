import json
import random

# Filepath to the db.json file
filepath = 'D:/ecommerce-heavenly/backend/db.json'

# Load the JSON data from the file
with open(filepath, 'r') as file:
    data = json.load(file)

# List of possible badges
badges = ["bestseller", "trending", "new arrival"]

# Add a random badge to each product
for product in data:
    product['badge'] = random.choice(badges)

# Write the updated JSON data back to the file
with open(filepath, 'w') as file:
    json.dump(data, file, indent=4)

print("Badges added to each product successfully.")