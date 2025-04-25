Gallery App

A simple gallery app built with React and Django.

Features
- Upload images
- Edit image details (title, description)
- Delete images
- Preview images

Requirements
- Node.js (for React frontend)
- Python (for Django backend)
- Django REST framework
- Axios

Installation
Frontend
1. Clone the repository: git clone https://github.com/your-username/gallery-app.git
2. Navigate to the frontend directory: cd gallery-app/frontend
3. Install dependencies: npm install
4. Start the development server: npm start

Backend
1. Navigate to the backend directory: cd gallery-app/backend
2. Create a virtual environment: python -m venv venv
3. Activate the virtual environment: source venv/bin/activate (on Linux/Mac) or venv\Scripts\activate (on Windows)
4. Install dependencies: pip install -r requirements.txt
5. Run migrations: python manage.py migrate
6. Start the development server: python manage.py runserver

API Endpoints
- GET /api/gallery/: Get a list of images
- POST /api/gallery/upload/: Upload a new image
- GET /api/gallery/images/<int:pk>/: Get a specific image
- PATCH /api/gallery/images/<int:pk>/: Edit an image
- DELETE /api/gallery/images/<int:pk>/: Delete an image

Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

License
This project is licensed under the MIT License. See LICENSE for details.