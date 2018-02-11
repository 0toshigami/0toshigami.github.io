$(document).ready(function(){
    $(".left-bar a").click(function() {
        $(".left-bar a.on").removeClass("on");               
        $(this).addClass("on");        

        if ($(this).text()=="SEIMEI") {
            $(".c1").addClass("on");
            if ($(".c2").hasClass("on") || $(".c3").hasClass("on") || $(".c4").hasClass("on")) {
                $(".c2").removeClass("on");                
                $(".c3").removeClass("on");
                $(".c4").removeClass("on");
                $(".c2").css("display", "none");
                $(".c3").css("display", "none");
                $(".c4").css("display", "none");
            }            
            $(".c1").css("display", "block");
        }
        if ($(this).text()=="KAGURA") {
            $(".c2").addClass("on");
            if ($(".c1").hasClass("on") || $(".c3").hasClass("on") || $(".c4").hasClass("on")) {
                $(".c1").removeClass("on");
                $(".c3").removeClass("on");
                $(".c4").removeClass("on");
                $(".c1").css("display", "none");
                $(".c3").css("display", "none");
                $(".c4").css("display", "none");
            }
            $(".c2").css("display", "block");
        }
        if ($(this).text()=="HIROMASA") {
            $(".c3").addClass("on");
            if ($(".c1").hasClass("on") || $(".c2").hasClass("on") || $(".c4").hasClass("on")) {
                $(".c1").removeClass("on");
                $(".c2").removeClass("on");
                $(".c4").removeClass("on");
                $(".c1").css("display", "none");
                $(".c2").css("display", "none");
                $(".c4").css("display", "none");
            }
            $(".c3").css("display", "block");
        }
        if ($(this).text()=="YAO BIKUNI") {
            $(".c4").addClass("on");
            if ($(".c1").hasClass("on") || $(".c2").hasClass("on") || $(".c3").hasClass("on")) {
                $(".c1").removeClass("on");
                $(".c2").removeClass("on");
                $(".c3").removeClass("on");
                $(".c1").css("display", "none");
                $(".c2").css("display", "none");
                $(".c3").css("display", "none");
            }
            $(".c4").css("display", "block");
        }
    });        
});