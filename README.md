# Movies

Single-page application.

How to run the app:
1. Download and extract ZIP.
2. Open downloaded folder with Visual Studio Code.
3. Type "node server.js" in terminal in Visual Studio Code or in CMD.
4. Open html file with live server in Visual Studio Code.
5. Try the app.

Functionalities:
- Home button redirects to home page and loads all movies by fetch/GET request from the server.
- Login button redirects to login page. When submit button is clicked, logged user info is saved in session storage by fetch/POST request from the server and redirects to home page where all movies are loaded by fetch/GET request from the server. Requirements: All fields must be filled. Email must be valid (for example jorko@abv.bg). Password must have length >= 6 (for example 123456). User should be registered before. (IF NOT LOGGED IN USER)
- Register button redirects to register page. When submit button is clicked, registered user info is saved in session storage by fetch/POST request from the server and redirects to home page where all movies are loaded by fetch/GET request from the server. Requirements: All fields must be filled. Email must be valid (for example jorko@abv.bg). Passwords must match. Password must have length >= 6 (for example 123456). User should not be registered before. (IF NOT LOGGED IN USER)
- Add movie button redirects to add movie page. When submit button is clicked, a new movie is created by fetch/POST request from the server and redirects to home page where all movies are loaded (including the new movie) by fetch/GET request from the server. Requirements: All fields must be filled. (IF LOGGED IN USER/ELSE THE BUTTON IS NOT VISIBLE)
- Details button redirects to clicked movie page and loads clicked movie information (title, description, image) by fetch/GET request from the server. If logged user is the creator of the movie then he is not able to like the movie, but he is able to edit/delete it. Edit button redirects to edit movie page where you can change title, description and image for the movie with fetch/PUT request from the server. When submit button is clicked then you redirect to clicked movie page and loads a new movie information by fetch/GET request from the server. Requirements: All fields must be filled. Delete button deletes the current movie with fetch/DELETE request from the server and redirects to home page where all movies are loaded by fetch/GET request from the server. If logged user is not the creator of the movie then he is not able to edit/delete the movie, but he is able to like it only 1 time. Like button changes his text content with "Liked: X" where "X" is the count of likes. (IF LOGGED IN USER/ELSE THE BUTTON DOES NOT WORK)
- Logout button clears the session storage and redirects to login page. (IF LOGGED IN USER)

NOTE: THE SERVER IS DOWNLOADED FROM SOFTUNI. I USE IT JUST TO RUN MY APP.
