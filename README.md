# bootstrap-photo-gallery

A jQuery plugin that will create a Bootstrap based Photo Gallery for your images. Supports variable height for the images and captions. An optional "modal" box with "next" and "previous" paging is also included. Plugin requires Bootstrap (3.3.5 and above) jQuery (1.10 and above). 

[**View Demo**](https://rawgit.com/michaelsoriano/bootstrap-photo-gallery/master/demo.html)

![alt tag](http://michaelsoriano.com/wp-content/uploads/2013/11/bspgallery.gif)

###Change Log:

<strong>Update 6/24/2016: </strong> Several enhancements have been made to the plugin. See the following list for the most recent changes:

1) The Modal box that opens is always going to be the large modal. Images will scale up to 100% to fill the entire modal box. You still have the option of having a small thumbnail and linking to a different image for the large size - mainly for performance purposes. 

2) A new plugin option called "fullHeight" that allows you to have different heights in the thumbnails inside the grid. Most people want to see uniform heights, so I default this value to "true". If you want to see dynamic heights, simply set this to "false". Note that this doesn't affect the modal images. 

3) I've separated the styles into it's own stylesheet. You now have to include this stylesheet in your document, or you can simply copy the contents into your own stylesheet. I tried making everything inline so you only have to include the JS file, but it's been growing and having an external CSS is the only way to manage. 

4) Added glyphicons for the "Next" and "Previous" links in the modal. This just looks better. 

5) Images are required to have an alt tag, so I'm outputting the value of this into the modal as the title. 

6) You can have additional text underneath the grid thumbnails by having a "p" tag with a class of "text". I grab this value and put it in the modal as well. 

<strong>Update 12/13/2015: </strong> I've updated the plugin to support linking to a different image when shown in the modal box. Continue reading below for instructions.

<strong>Update 11/14/2015: </strong>This code for this tutorial have been converted into a jQuery plugin. This means that it's now easier to create a responsive photo gallery. The original tutorial is still available below (where is says "Original Tutorial"). Note that you don't need to follow it if you're using the plugin. But it's good to know the inner workings of Bootstrap regardless. 


###How to Use:

Make sure you include the required files before the plugin.

You need to create an unordered list of your images. 

```
<ul class="first">
   <li>
       <img alt="Night away"  src="images/photodune-174908-rocking-the-night-away-xs.jpg">
       <p class="text">Optional text. This will also show in the modal</p>
   </li>
   <li>
       <img alt="Yellow boy" src="images/photodune-287182-blah-blah-blah-yellow-road-sign-xs.jpg">
   </li>
   <li>
       <img "Some colors"  src="images/photodune-460760-colors-xs.jpg">
   </li>
   ...
</ul>

```

Then initialize the plugin and pass in the Boostrap classes for different sizes as a parameter. The "hasModal" is true by default - but can be turned off by setting it to "false". 

```
$('ul.first').bsPhotoGallery({
    "classes" : "col-lg-2 col-md-4 col-sm-3 col-xs-4 col-xxs-12",
    "hasModal" : true
  });
```

If you need to show a different image in the modal box, you need to add an extra attribute to the image "data-bsp-large-src" with the value as the path to the image.

The original tutorial can be found here: 

"How to create a responsive photo gallery using Bootstrap" :
http://michaelsoriano.com/create-a-responsive-photo-gallery-with-bootstrap-framework/

and

"Let’s Add Next and Previous Buttons to our Bootstrap Photo Gallery"
http://michaelsoriano.com/next-and-previous-buttons-bootstrap-photo-gallery/
