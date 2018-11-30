
    function toggleCollectionModal () {
        console.log("You clicked!");
        if (collectionModal.classList.contains('is-active')) {
            collectionModal.classList.remove('is-active');
        } else {
            collectionModal.classList.add('is-active');	
        }
    }

    function toggleBookmarkModal () {
        console.log("You clicked!");
        if (bookmarkModal.classList.contains('is-active')) {
            bookmarkModal.classList.remove('is-active');
        } else {
            bookmarkModal.classList.add('is-active');	
        }
    }

$(document).ready(function(){
    $("#addNewCollection").on("click", function(){
        toggleCollectionModal();
        console.log("You clicked!");
    });

    $("#closeBox").on("click", function(){
        toggleCollectionModal();
    });

    $("#addBookmarkBtn").on("click", function(){
        toggleBookmarkModal();
    });

    $("#bookmarkClose").on("click", function(){
        toggleBookmarkModal();
    });

});




