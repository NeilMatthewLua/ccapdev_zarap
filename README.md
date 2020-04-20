# zarap

This project creates a database of restaurants wherein users can look up the restaurants, view their menus, write reviews, and more. In addition to that, users are able to collect posts by getting upvotes from their reviews that are given by other users.   

## Getting Started

1. Clone the repository
2. Open two terminals inside the project
    * One inside /view
    * One inside /server

##### For Server side
1. Install the packages (`npm i`)
2. Type `npm run backend`
3. Open http://localhost:9090/populate

**By this part, database should already been populated**

##### For View side
1. Install the packages (`npm i`)
2. Type `npm run serve`
3. Open http://localhost:3000 

**Remember to keep both terminals opened**

### Test Cases
#### Test Case 1 (Unlogged User)
1. Once you open the app at http://localhost:3000 , you will be greeted with the landing page. 

![alt text][1.1]

2. From here you can scroll down to see the section with the title of “Collections” which is also considered as the featured restaurants’ section. The restaurants in this section differ every time the user navigates back to this page.  Feel free to choose from one of the three restaurants by clicking the “view restaurant” button under the desired restaurant. 

![alt text][1.2]

3. After clicking on the chosen restaurant, you will be brought to that restaurant’s page. 

![alt text][1.3]

4. Here you can access the Photos (Photos of the restaurant establishment), Menu (Photos of restaurant menu), and Reviews (which contains the reviews of that specified restaurant). These can be accessed at the top right section of the screen just below the navbar. 

![alt text][1.4]

5. As an unlogged user, you do not have access to saving the restaurant to your dining history or writing reviews for any restaurant. 

6. When you are at the Menu or Photos section of the restaurant page, the lower-left half of the screen will be a carousel of images. Each image can be clicked to be enlarged and shown in a modal. 

![alt text][1.5]

7. While in the modal, you can navigate through the pictures of that section by using the left and right arrow buttons beside the current image. If you wish to exit, you may press the close button present at the top section of the modal. 

![alt text][1.6]

8. At the Review section, you may view the popular review which is the review for the restaurant with the most upvotes. You may also check all the reviews for the restaurant by pressing “All Reviews”. 

![alt text][1.7]

9. Each review may or may not have pictures. Reviews with pictures can also be zoomed by pressing the desired image, displaying it in a modal similar to images in the Photos section.  

![alt text][1.8]

10. All the names of the reviewers at the review section are clickable and clicking on it will navigate you to their user detail page. 

11. At the user detail page of the selected user, you will be initially brought to their profile section where you will see their basic user info. 

![alt text][1.9]

12. The side menu present allows you to navigate to other sections of the user detail page. All three sections are: Profile, Dining History, and Reviews. 

![alt text][1.10]

13. The Dining History section contains the list of restaurants they have made reviews for or have bookmarked using the “Been Here” button. 

![alt text][1.11]

14. The Reviews section contains the list of reviews they have made for different restaurants. 

![alt text][1.12]

15. The restaurant names for the Dining History and Reviews section both have clickable names. Clicking on the name of the restaurant will bring you to its corresponding Restaurant page. 


#### Test Case 2 (Logged User)

1. From the landing page, you will find the “login” and “register” buttons. Click on the register button to navigate to the register page. 

![alt text][2.1]

2. Once at the register page, create a new account by filling up the details (Profile picture is required and only one can be uploaded). 
  * Sidenote: If you wish to change the picture you uploaded, simply click on the image and click remove to remove the image. Afterwards, you can upload another picture. 

![alt text][2.2]

* Additional Notes
    * Should you wish to log-in with a pre-made user, refer to the pre-made data sub-chapter

3. A successful registration will bring you back to the landing page. 

![alt text][2.3]

4. Click login and input your credentials. Granting access will bring you back to the landing page

![alt text][2.4]

5. From the landing page, search for a restaurant in the search bar, then select that restaurant (in this case, starbucks was looked up)
As per implementation, search results are based on matching AT LEAST 40% of the WHOLE RESTURANT NAME
** Filtering of results has yet to be implemented **

![alt text][2.5]

6. Arriving in the restaurant page, you can check the menu, photos, and reviews of that restaurant
  * You can toggle the beenHere* button if you want it saved for your dining history (no need to make a review)
        * This will be automatically toggled once the user has made a review

![alt text][2.6]

7. Click on reviews, and you will see some reviews made by others, as well as yours (should you have any)

8. You can like/unlike the reviews

![alt text][2.7]

9. Writing / Editing / Deleting reviews
    * You don’t have a review in the restaurant 
        * Add a review 
            1. Uploading of images (Optional)
            2. Adding a review (Required)
            3. Rating the restaurant (Required)

            ![alt text][2.8]

            ![alt text][2.9]

            ![alt text][2.10]

    * You have a review in the restaurant

        ![alt text][2.11]

        * You can edit your review
            1. Change images of your review
            2. Remove images from a review 
            3. Change rating 
            4. Change review text 

            ![alt text][2.12]

            ![alt text][2.13]
        * You can delete review
            1. Confirm your decision on the pop up modal
            
            ![alt text][2.14]

            2. Your points will be adjusted depending on how many upvotes that review had

10. Go to your own profile via the navbar dropdown or sidenav (once screen gets small)
	
![alt text][2.15]

11. Go to ‘My Reviews’ 

![alt text][2.16]

12. The user can edit his/her reviews there, as well as delete them
    * User’s points and dining history will be adjusted accordingly

13. Go to ‘My Profile’
14. Edit your profile by clicking ‘Edit Profile’

![alt text][2.17]

15. Update whichever details you need, except for your email. Once you are satisfied with your updated details, simply re*type in your password and hit submit. 
	
![alt text][2.18]

16. Once you’re done, submit it and your profile shall be updated accordingly.

![alt text][2.19]

	

[1.1]: server/images/Test_Cases_Pcitures/1.1.png 
[1.2]: server/images/Test_Cases_Pcitures/1.2.png 
[1.3]: server/images/Test_Cases_Pcitures/1.3.png 
[1.4]: server/images/Test_Cases_Pcitures/1.4.png 
[1.5]: server/images/Test_Cases_Pcitures/1.5.png 
[1.6]: server/images/Test_Cases_Pcitures/1.6.png 
[1.7]: server/images/Test_Cases_Pcitures/1.7.png 
[1.8]: server/images/Test_Cases_Pcitures/1.8.png 
[1.9]: server/images/Test_Cases_Pcitures/1.9.png 
[1.10]: server/images/Test_Cases_Pcitures/1.10.png 
[1.11]: server/images/Test_Cases_Pcitures/1.11.png 
[1.12]: server/images/Test_Cases_Pcitures/1.12.png 
[2.1]: server/images/Test_Cases_Pcitures/2.1.png 
[2.2]: server/images/Test_Cases_Pcitures/2.2.png 
[2.3]: server/images/Test_Cases_Pcitures/2.3.png 
[2.4]: server/images/Test_Cases_Pcitures/2.4.png 
[2.5]: server/images/Test_Cases_Pcitures/2.5.png 
[2.6]: server/images/Test_Cases_Pcitures/2.6.png 
[2.7]: server/images/Test_Cases_Pcitures/2.7.png 
[2.8]: server/images/Test_Cases_Pcitures/2.8.png 
[2.9]: server/images/Test_Cases_Pcitures/2.9.png 
[2.10]: server/images/Test_Cases_Pcitures/2.10.png 
[2.11]: server/images/Test_Cases_Pcitures/2.11.png 
[2.12]: server/images/Test_Cases_Pcitures/2.12.png 
[2.13]: server/images/Test_Cases_Pcitures/2.13.png 
[2.14]: server/images/Test_Cases_Pcitures/2.14.png 
[2.15]: server/images/Test_Cases_Pcitures/2.15.png 
[2.16]: server/images/Test_Cases_Pcitures/2.16.png 
[2.17]: server/images/Test_Cases_Pcitures/2.17.png 
[2.18]: server/images/Test_Cases_Pcitures/2.18.png
[2.19]: server/images/Test_Cases_Pcitures/2.19.png

## Pre-Made Data
* Should you wish to log-in with a pre-made user:
    * email: ben@gmail.com
    * password: bensicles
* Restaurants Made: 
    * Big Bowl Noodles
    * Golden Fortune
    * Tim Hortons
    * Tasty Dumplings
    * Yabu
    * Choi Garden
    * Frankies
    * Italiannis
    * KFC
    * KFC
    * Mad Marks Creamery
    * Makchang
    * Mutsarap
    * Starbucks
    * Sushi Yum
    * Tajimaya
    * Tendon Kohaku
    * Texas Roadhouse
    * Vikings
    * Yellow Cab


## Built With

* [Vue](https://vuejs.org/) - The web framework used
* [NodeJS](https://nodejs.org/en/) - The backend framework used

## Authors

* *Neil Matthew Lua* 
* *Kurt Bradley Tanting* 
* *Richard Alvin Zapanta* 

## Acknowledgments

* Mr. Jonal Ticug for being our supportive and helpful daddy/mommy
* Mr. Matthew Lua for enlightening us with his knowledge of Vue and Vuex
* Pres. Duterte for Quarantine Season (Stay Safe :<)
* Our last two brain cells for being enough
* Nintendo Switch for stress-relief
* Father Tio for Pizza Hut
* Little Tio for Mozarella Sticks
* Mr. Richard Zapanta for Vroom Vroom
