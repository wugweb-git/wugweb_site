$(document).ready(function () {
  $(".menu-icon").click(function () {
    $(".menu").toggleClass("active");
  });
  $(".menu ul li a").click(function () {
    $(".menu ul li a").removeClass("active");
    $(this).addClass("active");
    $(".menu").removeClass("active");
    $(".menu-icon").removeClass("opened");
  });
});

$("a[href^=#]").on("click", function (e) {
  e.preventDefault();
  var href = $(this).attr("href");
  $("html, body").animate(
    {
      scrollTop: $(href).offset().top,
    },
    "slow"
  );
});

document.querySelector("html").classList.add("js");

const delayArray = [
  5000, 5000, 3000, 5000, 5000, 3000, 5000, 5000, 4500, 5000, 5000, 3000, 5000,
  5000, 4500, 5000, 5000, 3000, 5000, 5000, 3000, 5000, 5000, 4500, 5000, 5000,
  3000, 5000, 5000, 4500, 4500,
];
const checkedArray = [
  10.5, 9.5, 17.5, 10, 10, 8, 9, 10, 10, 17.5, 10, 10, 8, 9, 10, 10, 9.5, 17.5,
  10, 10, 8, 9, 10, 10, 17.5, 10, 10, 8, 9, 10, 10, 10,
];
var sequenceDelay = 1000;

document.querySelectorAll("main section").forEach(function (e, i) {
  setTimeout(function () {
    new TimelineMax()
      .add("1", 0) // The sequence starts, the message block is created
      .add("2", 0.3) // The portrait appears
      .add("3", 0.4) // This phase simulates the composition of the message, the typing dots appear
      .add("4", 1.5) // The dots bubble shrinks and disappears
      .add("5", 1.6) // The typing dots block is removed and the message is prepared
      .add("6", 1.6) // The message is displayed
      .add("7", 0.3 * checkedArray[i]) // And, finally, marked as read
      .set(e, { display: "block" }, "1")
      .set(e.querySelector(".portrait"), { display: "block" }, "2")
      .to(
        e.querySelector(".portrait"),
        1.2,
        { alpha: 1, scale: 1, y: 0, ease: Elastic.easeOut.config(1, 0.3) },
        "2"
      )
      .set(e.querySelectorAll(".dots,.message"), { display: "inline" }, "3")
      .to(
        e.querySelector(".message"),
        1.2,
        { alpha: 1, scale: 1, y: 0, ease: Elastic.easeOut.config(1, 0.3) },
        "3"
      )
      //.to("html", .8, {scrollTo:document.body.clientHeight, ease: Power1.easeOut}, "3" ).
      .to(
        e.querySelectorAll(".message,.image_in"),
        0.1,
        { alpha: 0, ease: Power1.easeOut },
        "4"
      )
      .to(
        e.querySelectorAll(".message,.image_in"),
        0.2,
        { scale: 0, ease: Power1.easeOut },
        "4"
      )
      .set(e.querySelectorAll(".dots"), { display: "none" }, "5")
      .set(
        e.querySelectorAll(
          ".text,.date,.status,.address_out,.address,.single,.image_in"
        ),
        { display: "inline" },
        "5"
      )
      .set(
        e.querySelectorAll(".emoji, .gif_container, .gif"),
        { display: "inline-block" },
        "5"
      )
      .set(
        e.querySelectorAll(".emoji_in, .gif_meta"),
        { display: "block" },
        "5"
      )
      .set(".image_message", { display: "none" }, "5")
      .to(
        e.querySelectorAll(".message,.image_in"),
        0.75,
        { alpha: 1, scale: 1, ease: Elastic.easeOut.config(0.1, 0.065) },
        "6"
      )
      .set(
        e.querySelectorAll(".single, .single svg, .single svg path"),
        { display: "none" },
        "7"
      )
      .set(e.querySelectorAll(".double"), { display: "inline" }, "7");
  }, sequenceDelay);
  sequenceDelay = sequenceDelay + delayArray[i];
});

// $.validator.setDefaults({
//   submitHandler: function (form) {
//     console.log(form);
//     const topics = [];
//     const name = $("#commentForm").find('input[name="name"]').val();
//     const company = $("#commentForm").find('input[name="company"]').val();
//     $("#commentForm")
//       .find('input[name="topics"]:checked')
//       .each(function () {
//         topics.push($(this).val());
//       });
//     const project = $("#commentForm")
//       .find('input[name="project"]:checked')
//       .val();
//     const budget = $("#commentForm").find('input[name="project').val();
//     const email = $("#commentForm").find('input[name="email"]').val();
//     const phoneNumber = $("#commentForm")
//       .find('input[name="phoneNumber"]')
//       .val();

//     var data = {
//       service_id: "service_37dlbzh",
//       template_id: "template_8lowvlh",
//       user_id: "8ez_AlCoLTUYno7Il",
//       template_params: {
//         name,
//         company,
//         topics,
//         project,
//         budget,
//         email,
//         phoneNumber,
//       },
//     };
//     console.log(name, company, topics, project, budget, email, phoneNumber);

//     $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
//       type: "POST",
//       data: JSON.stringify(data),
//       contentType: "application/json",
//     })
//       .done(function () {
//         console.log("this is sucess");
//         Toastify({
//           text: "Thank you for contacting us, we will get back to you soon",
//           duration: 5000,
//           newWindow: true,
//           close: true,
//           gravity: "top", // `top` or `bottom`
//           position: "right", // `left`, `center` or `right`
//           stopOnFocus: true, // Prevents dismissing of toast on hover
//           style: {
//             background: "linear-gradient(to right, #00b09b, #96c93d)",
//           },
//         }).showToast();
//       })
//       .fail(function (error) {
//         alert("Oops... " + JSON.stringify(error));
//       });
//   },
// });

$("#commentForm").validate({
  rules: {
    name: "required",
    company: "required",
    topics: {
      required: "input[type='checkbox']:checked",
      minlength: 1,
    },
    email: {
      required: true,
      email: true,
    },
    phoneNumber: "required",
    agree: "required",
  },
  messages: {
    name: "Please enter your name",
    company: "Please enter your company name",
    email: "Please enter a valid email address",
    phoneNumber: "Please enter a valid phone number",
    topics: "Please select at least 1 topic to discuss",
    agree: "Please accept our policy",
  },
});
