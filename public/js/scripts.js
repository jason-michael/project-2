
    function toggleModal () {
        if (collectionModal.classList.contains('is-active')) {
            collectionModal.classList.remove('is-active');
        } else {
            collectionModal.classList.add('is-active');	
        }
    }

    $("#addNewCollection").on("click", function(event){
        toggleModal(event);
        console.log("You clicked!");
    });




