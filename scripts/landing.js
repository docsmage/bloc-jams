var pointsArray = document.getElementsByClassName('point');
 
 var animatePoints = function(points) {
	
	var revealPoint = function () {
		forEach (points, function(point){
		    point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";  
		})
		
	};
	
	revealPoint();

}; // having both of these functions is redundant, according to John

 window.onload = function() {
 
     // Automatically animates the points on a tall screen where scrolling can't trigger the animation
     if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
	 
     window.addEventListener('scroll', function(event) {
			 
         if (pointsArray[0].getBoundingClientRect().top <= 500) {
             animatePoints(pointsArray);
         }
     
		 });
 }