$( document ).ready(function() {
  $(".product-livbooking-book-button").click(livTryBook);
  checkIfOccupied();
  $("#livbooking-date").change(checkIfOccupied);
});

function checkIfOccupied() {
  let date = $("#livbooking-date").val();
  let duration = $("#livbooking-duration").val();
  let timezone = $("#livbooking-timezone").val();
  let timezoneC = $("#livbooking-timezone-city").val();
  let startbooking = $("#livbooking-startbooking").val();
  let endbooking = $("#livbooking-endbooking").val();
  let allhours = new Array();
  $(".product-livbooking-timeradio").each(function (index) {
    allhours[index] = $(this).val();
  });

  $.ajax({
    type: "POST",
    url: "https://0088.co.uk/livbooking/check.php",
    data: { 
       livbookDate: date,
       livbookDuration: duration,
       livbookTimezone: timezone,
       livbookTimezoneC: timezoneC,
       livbookStartBookingTime: startbooking,
       livbookEndBookingTime: endbooking,
       livbookAllHours: JSON.stringify(allhours)
    }
  }).done(function(data) {
    let response = data;
     $('.product-livbooking-timeradio').removeAttr("disabled");
     $('.product-livbooking-timeradio').removeClass("disabled");
    for (let i = 0; i < response.length; ++i) {
      $('.product-livbooking-timeradio[value="'+response[i]+'"]').attr("disabled", "disabled").addClass("disabled").removeAttr("checked");
    }

    let currentD = new Date();
    
    $(".product-livbooking-timeradio").each(function (index) {
      let thisHour = $(this).val().split(":");
      let thisHourD = new Date(date);
      thisHourD.setHours(thisHour[0],thisHour[1],0);
      if (currentD > thisHourD){
        $(this).attr("disabled", "disabled").addClass("disabled").removeAttr("checked");
      }
    });
    
    $('.product-livbooking-timeradio').not( ".disabled" ).attr("checked", "checked");
  });
}

function livTryBook() {
  let date = $("#livbooking-date").val();
  let duration = $("#livbooking-duration").val();
  let time = $('.product-livbooking-timeradio[name="properties[livbooking-time]"]:checked').val();
  let timezone = $("#livbooking-timezone").val();
  let timezoneC = $("#livbooking-timezone-city").val();

  $.ajax({
    type: "POST",
    url: "https://0088.co.uk/livbooking/booking.php",
    data: { 
       livbookDate: date,
       livbookDuration: duration,
       livbookTime: time,
       livbookTimezone: timezone,
       livbookTimezoneC: timezoneC
    }
  }).done(function(data) {
    alert(data);
  });

}