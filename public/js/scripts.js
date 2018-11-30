$("#showModal").click((function(){
    $(".modal").addClass("is-active");
}));

$(".modal-close").click(function(){
    $(".modal").removeClass("is-active");
});
