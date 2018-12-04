//=============================================================
// Show Modal
//=============================================================
$("#showModal").click((function(){
    $(".modal").addClass("is-active");
}));
//=============================================================
// Toggle Collection Modal
//=============================================================
    function toggleCollectionModal () {
        console.log("You clicked!");
        if (collectionModal.classList.contains('is-active')) {
            collectionModal.classList.remove('is-active');
        } else {
            collectionModal.classList.add('is-active');
        }
    }
//=============================================================
// Toggle Bookmark Modal
//=============================================================
    function toggleBookmarkModal () {
        console.log("You clicked!");
        if (bookmarkModal.classList.contains('is-active')) {
            bookmarkModal.classList.remove('is-active');
        } else {
            bookmarkModal.classList.add('is-active');
        }
    }
//=============================================================
// User Action List
//=============================================================
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

    //=============================================================
    // POST New Bookmark
    //=============================================================
    $("#submitBookmarkBtn").on("click", function() {

        var newBookmark = {
          bookmark_name: $("#addBookmarkName").val().trim(),
          href: $("#addBookmarkLink").val().trim(),
          notes: $("#addBookmarkNotes").val().trim(),
          collection_name: $("#addBookmarkCollection").val().trim(),
          category: $("#addBookmarkCategory").val().trim()
        };


        $.ajax("/bookmarks/:bkmk_id", {
          type: "POST",
          data: newBookmark
        }).then(
          function() {
            console.log("YAY! created new bookmark");
          });

        $("#addBookmarkForm").trigger("reset")
      });

});

//=============================================================
// DELETE Bookmark
//=============================================================
function deleteBookmark(id) {
    $.ajax(`/bookmarks/${id}`, {
        type: "DELETE",
    })
    .then(() => {
        console.log("Bookmark deleted.");
        location.reload()
    })
}
