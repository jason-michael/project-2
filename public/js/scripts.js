$("#showModal").click((function(){
    $(".modal").addClass("is-active");
}));

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

    $("#addBookmarkBtn").on("click", function(event) {
        
        event.preventDefault();
    
        var newBookmark = {
          bookmark_name: $("#addBookmarkName").val().trim(),
          href: $("#addBookmarkLink").val().trim(),
          notes: $("#addBookmarkNotes").val().trim(),
          collection_name: $("#addBookmarkCollection").val().trim(),
          category: $("#addBookmarkCategory").val()
        };
    
      
        $.ajax("/bookmarks/:bkmk_id", {
          type: "POST",
          data: newBookmark
        }).then(
          function() {
            console.log("YAY! created new bookmark");
            
          }
        );
      });

});




