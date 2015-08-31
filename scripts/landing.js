var animateHeroTitle = function () {

	var herotitle = document.getElementsByClassName('hero-title');
	
	herotitle[0].style.transform = "skewX(5deg)";
	herotitle[0].style.msTransform = "skewX(5deg)";
	herotitle[0].style.WebkitTransform = "skewX(5deg)";

};

var animatePoints = function() {

    var points = document.getElementsByClassName('point');

	var revealPoint = function () {
		for (i = 0; i < points.length; i++) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)"; 		
		}
	};

	revealPoint();
	
//    var revealFirstPoint = function() {
//        points[0].style.opacity = 1;
//        points[0].style.transform = "scaleX(1) translateY(0)";
//        points[0].style.msTransform = "scaleX(1) translateY(0)";
//        points[0].style.WebkitTransform = "scaleX(1) translateY(0)";   
//    };
//
//    var revealSecondPoint = function() {
//        points[1].style.opacity = 1;
//        points[1].style.transform = "scaleX(1) translateY(0)";
//        points[1].style.msTransform = "scaleX(1) translateY(0)";
//        points[1].style.WebkitTransform = "scaleX(1) translateY(0)";   
//    };
//
//    var revealThirdPoint = function() {
//        points[2].style.opacity = 1;
//        points[2].style.transform = "scaleX(1) translateY(0)";
//        points[2].style.msTransform = "scaleX(1) translateY(0)";
//        points[2].style.WebkitTransform = "scaleX(1) translateY(0)";   
//    };
//
//    revealFirstPoint();
//    revealSecondPoint();
//    revealThirdPoint();

};