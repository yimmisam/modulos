var hostname1 = window.location.hostname.replace("www.","");
//var hostname1= $.cookie('account_login_domain_default'); 


function ejecuta_widgets_blog() {


 $(".wdgtBlog.carrusel").each(function () {
var iDBlog=$(this).attr('id');
var datacant=$(this).attr('data-cant');
var datacolum=$(this).attr('data-colum');

carrusel_loop_blog(iDBlog,datacant,datacolum);

});


 $(".wdgtBlog.gridder").each(function () {
var iDBlog=$(this).attr('id');
var datacant=$(this).attr('data-cant');
var datacolum=$(this).attr('data-colum');

grid_loop_blog(iDBlog,datacant,datacolum);

});

}


function carrusel_loop_blog(iDBlog,datacant,datacolum) {


    $.get("https://api-blog.samishop.pe/blogs/detalle/publico/listar/?dominio="+hostname1+"&pagina=1&cantidad="+datacant, function (response) {
               data =  response['obj'];
              $('#widget_loop_blog').remove();
              $('#item_carrusel_blog').remove();
              $('#scriptblog_item').remove();
               load_template_blog_1(data);
    },"json");
            
   function load_template_blog_1(data) {
         $.get('https://storage.googleapis.com/sspe-appv20-resources/'+hostname1+'/modulos/widget_blog/_wdgtblog.tpl.htm?v=2', function(templates) {
         $('body').append(templates);
         $('#widget_loop_blog').tmpl(data).appendTo('#'+iDBlog+' .owl-carousel');
         excute_blog_car(iDBlog,datacolum);
      });
   }


}

function grid_loop_blog(iDBlog,datacant,datacolum) {


    $.get("https://api-blog.samishop.pe/blogs/detalle/publico/listar/?dominio="+hostname1+"&pagina=1&cantidad="+datacant, function (response) {
               data =  response['obj'];
              $('#widget_loop_blog').remove();
              $('#item_carrusel_blog').remove();
              $('#scriptblog_item').remove();
               load_template_blog_2(data);
    },"json");
            
   function load_template_blog_2(data) {
         $.get('https://storage.googleapis.com/sspe-appv20-resources/'+hostname1+'/modulos/widget_blog/_wdgtblog.tpl.htm?v=2', function(templates) {
         $('body').append(templates);
         $('#widget_loop_blog').tmpl(data).appendTo('#'+iDBlog+' .mod_catalogo');

         excute_blog_dom_grid(iDBlog,datacolum);
         
      });
   }


}


function excute_blog_car(iDBlog,datacolum){


var simple = $('#'+iDBlog+' .owl-carousel');
simple.owlCarousel('destroy'); // destroyed
simple.owlCarousel({
                loop:true,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:datacolum
                    },
                    1000:{
                        items:datacolum
                    }
                }
            });

}


function excute_blog_dom_grid(iDBlog,datacolum){
  
  if (datacolum==2){ var columnas="col-lg-6";}
  if (datacolum==3){ var columnas="col-lg-4";}
  if (datacolum==4){ var columnas="col-lg-3";}
  if (datacolum==5){ var columnas="col";}
  if (datacolum==6){ var columnas="col-lg-2";}
 

  $(".mod_catalogo.row>div").each(function () {

   $(this).addClass(columnas);

  });

}


$(document).ready(function() {

setTimeout(function() { 
    
ejecuta_widgets_blog();


    }, 1000);

});