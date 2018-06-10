# mec-search-spa

Your API

-Your API will consume this MEC API (replace the search term obviously):

http://www.mec.ca/api/v1/products/search?keywords=bike

-Your API should be self documenting with swagger or something similar.

-Your API will return a list of 5 image urls + 3 dominant colours for each image. The 5 images should be 1 each from the first 5 products in the response. You will need to extract the dominant colours server side as they are not part of the MEC API response. You can either use a server side library to get the dominant colours or you can use imgix to do it.


-Example using imgix to get dominant colours (you don't have to do it this way)

If the MEC api gives you this image url: https://cdn.mec.ca/medias/sys_master/fallback/fallback/8871551991838/5050255-WBR00-fallback.jpg

You can modify the url to get back the dominant colours like this

https://mec.imgix.net/medias/sys_master/fallback/fallback/8871551991838/5050255-WBR00-fallback.jpg?&palette=css&colors=3


Application UI

-Must be a SPA

-Must have search box where user can enter a search term

-When user submits their search, they get back a grid of images with associated dominate colours represented with some kind of ui elements (divs with backgrounds or something). Picture a very stripped down version of MEC’s plp with only non-interactive images and swatches

-Browser back button must work, you should be able to go backwards and forwards through your searches

-Styling is not important


Testing

Write a unit test or two for an aspect of the project using a unit testing framework of your choice. We use Jasmine at MEC. You don't need full coverage, just a demonstration that you can write meaningful tests.


Technical requirements

-Language/Framework of your choice. Use whatever you are most comfortable with.

-Showcase your ability to craft a solution.

-Use libraries for as much or as little as you want.

-Code should be in a git repo.

-I should be able to build and run your application on a Linux/Mac machine with a minimum of fuss from a Readme in your git repo

-Bonus points if the application is hosted some place and I don’t need to install it to see it running
