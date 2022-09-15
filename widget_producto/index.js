//Custom Widget


var list_domains  = window.location.hostname.replace("www.","");


function ejecuta_widgets_productos() {
 $(".wdgtProducto.carrusel").each(function () {
var iDgenerarPro=$(this).attr('id');
var dataSearch=$(this).attr('data-tag-wdgt');
var cantSlides=$(this).attr('data-cant-pro');
var tope=$(this).attr('data-limit-pro');

carrusel_loop_productos(iDgenerarPro,dataSearch,cantSlides,tope);

});


 $(".wdgtProducto.gridder").each(function () {
var iDgenerarPro=$(this).attr('id');
var dataSearch=$(this).attr('data-tag-wdgt');
var cantSlides=$(this).attr('data-cant-pro');
var tope=$(this).attr('data-limit-pro');

grid_loop_productos(iDgenerarPro,dataSearch,cantSlides,tope);

});

}


function carrusel_loop_productos(iDgenerarPro,dataSearch,cantSlides,tope) {


    $.get("https://api-inventario.samishop.pe/datoscatalogo/"+list_domains+"/widget/"+dataSearch+"/tope/"+tope, function (response) {
               data =  response['obj'][0];
               load_template(data);
    },"json");
            
   function load_template(data) {
         $.get('https://storage.googleapis.com/sspe-appv20-resources/'+list_domains+'/modulos/widget_producto/_wdgtpro.tpl.htm?v=14', function(templates) {
         $('body').append(templates);
         $('#widget_loop_producto').tmpl(data).appendTo('#'+iDgenerarPro+' .owl-carousel');
         excute_carrusel_dom(iDgenerarPro,cantSlides);
      });
   }


}

function grid_loop_productos(iDgenerarPro,dataSearch,cantSlides,tope) {


    $.get("https://api-inventario.samishop.pe/datoscatalogo/"+list_domains+"/widget/"+dataSearch+"/tope/"+tope, function (response) {
               data =  response['obj'][0];
               load_template(data);
    },"json");
            
   function load_template(data) {
         $.get('https://storage.googleapis.com/sspe-appv20-resources/'+list_domains+'/modulos/widget_producto/_wdgtpro.tpl.htm?v=14', function(templates) {
         $('body').append(templates);
         $('#widget_loop_producto').tmpl(data).appendTo('#'+iDgenerarPro+' .mod_catalogo');

         excute_grid_dom(iDgenerarPro,cantSlides);
         
      });
   }


}


function excute_carrusel_dom(iDgenerarPro,cantSlides){

var simple = $('#'+iDgenerarPro+' .owl-carousel');
simple.owlCarousel('destroy'); // destroyed
simple.owlCarousel({
                loop:true,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:cantSlides
                    },
                    1000:{
                        items:cantSlides
                    }
                }
            });

}


function excute_grid_dom(iDgenerarPro,cantSlides){
  
  if (cantSlides==2){ var columnas="col-lg-6";}
  if (cantSlides==4){ var columnas="col-lg-3";}
  if (cantSlides==5){ var columnas="col";}
  if (cantSlides==6){ var columnas="col-lg-2";}
 

  $(".mod_catalogo.row>div").each(function () {

   $(this).addClass(columnas);

  });

}



$(document).ready(function() {
    console.log( "ready!" );

setTimeout(function() { 
    
ejecuta_widgets_productos();


    }, 400);

});
