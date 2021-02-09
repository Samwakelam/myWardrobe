$(document).ready(function () {
  // inport variables
  const { myWardrobeAlerts } = messageData;

  //set up html elements
  const fileChosen = $('#file-chosen');
  const itemFilter = $('#item-filter');



  // ------- getCatId  -----------------------------------
  // Gets the category Id from the database referenced by the outfit name
  // ------------------------------------------------------------
  function getCatId(catName, callback) {
    $.ajax({
      type: 'GET',
      url: '/category/id/' + catName,
    })
      .then((dataReturned) => {
        const categoryData = {
          id: dataReturned[0].id,
          type: dataReturned[0].type,
        };

        // console.log('1',categoryData);
        callback(categoryData);
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }

  // ------- filter carousel  -----------------------------------
  // shows a choses category to display in the carousel
  // ------------------------------------------------------------
  function filterCarousel() {
    // console.log('itemFilter.val() =', itemFilter.val(), typeof(itemFilter.val()));
    const category = itemFilter.val();

    if (category === 'Filter') {
      myWardrobeAlertCall(myWardrobeAlerts.filter);
      // setTimeout(displayTips(), 10000);
    } else if (category === 'View All') {
      const userID = localStorage.getItem('userID');
      window.location.href = `/myWardrobe/${userID}`;
    } else {
      getCatId(category, function (categoryData) {
        // console.log('2', categoryData);
        const userID = localStorage.getItem('userID');
        const type = categoryData.type;
        const catID = categoryData.id;
        window.location.href = `/myWardrobe/${userID}/${type}/${catID}`;
        itemFilter.val(category);
      });
    }
  }

  // event listeners
  itemFilter.change(filterCarousel);

  $(document).on('change', '#myFile',function(){
    const text = this.files[0].name;
    fileChosen.text(text);
  });

});
