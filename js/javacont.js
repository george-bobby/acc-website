$(document).ready(function() {

  // Form validation with jQuery Validate plugin
  $("#submit-form").validate({ // Change to your form's ID if different
    rules: {
      Name: {
        required: true
      },
      MailId: {
        required: true,
        email: true,
        domain: true //  custom domain validation
      },
      Message: {
        required: true
      }
    },
    messages: {
      Name: {
        required: "Please enter your fullname"
      },
      MailId: {
        required: "Please enter your Christ University email",
        email: "Please enter a valid email address",
        domain: "Please enter a valid Christ University email"
      },
      Message: {
        required: "Please enter your message"
      }
    },
    highlight: function(element, errorClass, validClass) {
      $(element).css({
        "color": "red",
        "border-color": "red"
      });
      // Highlight the corresponding i tag
      $(element).prevAll('i.cus').css('color', 'red'); // Adjust selector if needed
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).css({
        "color": "#000",
        "border-color": "#ccc"
      });
      // Reset color of the i tag
      $(element).prevAll('i.cus').css('color', '#000'); // Adjust selector if needed
    }
  });

  // Custom domain validation:
  $.validator.addMethod("domain", function(value, element) {
    return this.optional(element) || /^[\w-]+(\.[\w-]+)*@(.*\.)?(christuniversity\.in)$/.test(value);
  }, "*");

  // Handle contact link click with appropriate mailto URL based on platform
  $('#contact-link').click(function(event) {
    event.preventDefault(); // Prevent default link behavior

    if (/android/i.test(navigator.userAgent)) {
      window.location.href = "mailto:acc.kengeri@christuniversity.in"; // Use mailto for Android
    } else {
      window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=acc.kengeri@christuniversity.in"; // Open Gmail web app for others
    }
  });
});

// For sending the data from the website
$("#submit-form").submit(function(e){
  e.preventDefault();
  
  // Check if the form is valid
  if($(this).valid()){ 
    alert("Submitting, please wait!");
    $.ajax({
      url:"https://script.google.com/macros/s/AKfycbzQLkUQd4OR0DZaLzuEe0B-wYF7skYpzfELuaSbbuab2zkZSaJIV60RpuNDrcSJVSpCrg/exec",
       data:$(this).serialize(),
      method:"post",
      success:function (response){
        window.location.href = "https://christnet-acc.web.app/success.html";
      },
      error:function (err){
        alert("Something Error")
      }
    });
  }
});