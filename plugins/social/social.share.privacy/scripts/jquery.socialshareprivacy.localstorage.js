(function($,undefined){$.extend($.fn.socialSharePrivacy.settings,{perma_option:true,set_perma_option:function(service_name){localStorage.setItem("socialSharePrivacy_"+service_name,"perma_on");},del_perma_option:function(service_name){localStorage.removeItem("socialSharePrivacy_"+service_name);},get_perma_options:null,get_perma_option:function(service_name){return localStorage.getItem("socialSharePrivacy_"+service_name)==="perma_on";}});})(jQuery);