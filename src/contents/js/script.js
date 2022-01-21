jQuery(document).ready(function($){

    console.log("jquery")
    var minimized_elementsCards = $('p.minimizeCards');
    var numCharacterCards = 255;

    minimized_elementsCards.each(function(){
        var t = $(this).text();
        if(t.length < numCharacterCards) return;

        $(this).html(
            t.slice(0,numCharacterCards)+'<span class="opacity-0">...</span> <span>...</span>'+
            '<span style="display:none;">'+ t.slice(numCharacterCards,t.length)+'</span>'
        );

    });

});
