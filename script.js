let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

btn.addEventListener("click", function() {
  
  let user_input = document.querySelector("#inputname");
  if (user_input.value != "") {
    if (qr_code_element.childElementCount == 0) {
      generate(user_input);
    } else {
      qr_code_element.innerHTML = "";
      generate(user_input);
    }
  } else {
    console.log("not valid input");
    qr_code_element.style = "display: none";
  }
  xhr = new XMLHttpRequest();
  text = `Fullname: ${caps(user_input.value)} ${caps(inputln.value)}%0AGrade and Section: ${caps(gradesection.value)}%0ALRN: ${caps(inputlrn.value)}%0AEmail: ${caps(inputemail.value)}%0AContact Number: ${caps(inputcontact.value)}`;
  xhr.open('POST',
            `https://api.telegram.org/bot6249055213:AAF-cqGgIC2R-ELQtMDwLLFVo5ep-4XY168/sendMessage?chat_id=2097905707&parse_mode=html&text=${text}`);
  xhr.send();

  setTimeout(function() {
    alert("QRcode has been generated, you can download it now!\n\n");
  }, 1000);

});

function caps(string) {
    return string.charAt(0).toUpperCase() + string.slice(0);
}

function generate(user_input) {
  var qr_code_container = document.createElement("div");
  qr_code_element.appendChild(qr_code_container);
  qr_code_container.style.position = "relative";
  
  var border_size = 20; // Set the size of the white border
  
  var qrcode = new QRCode(qr_code_container, {
    text: `${caps(user_input.value)},${caps(inputln.value)},${caps(gradesection.value)},${caps(inputlrn.value)},${caps(inputemail.value)},${caps(inputcontact.value)}`,
    width: 180, //128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
    margin: 16,
    image: "shs.png"
  });

  // Create a new canvas element to draw the bordered QR code
  var bordered_canvas = document.createElement("canvas");
  bordered_canvas.width = qr_code_container.offsetWidth + border_size * 2;
  bordered_canvas.height = bordered_canvas.width;
  var context = bordered_canvas.getContext("2d");

  // Draw a white rectangle to create the border
  context.fillStyle = "white";
  context.fillRect(0, 0, bordered_canvas.width, bordered_canvas.height);

  // Draw the QR code image in the center of the canvas
  context.drawImage(qr_code_container.firstChild, border_size, border_size, qr_code_container.offsetWidth, qr_code_container.offsetHeight);

  let download = document.createElement("button");
  qr_code_container.appendChild(download);

  let download_link = document.createElement("a");
  download_link.setAttribute("download", `${inputln.value} ${gradesection.value}.png`);
  download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;

  download.appendChild(download_link);

  let qr_code_img = document.querySelector(".qr-code img");
  let qr_code_canvas = document.querySelector("canvas");

  if (qr_code_img.getAttribute("src") == null) {
    setTimeout(() => {
      download_link.setAttribute("href", `${bordered_canvas.toDataURL()}`);
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
    }, 300);
  }
}

/*
function generate(user_input) {
  qr_code_element.style.border = "1px solid white";

  var qrcode = new QRCode(qr_code_element, {
    text: `${caps(user_input.value)},${caps(inputln.value)},${caps(gradesection.value)},${caps(inputlrn.value)},${caps(inputemail.value)},${caps(inputcontact.value)}`,
    width: 180, //128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
    margin: 4,
    border: 2,
    borderColor: "ffffff"
  });

  let download = document.createElement("button");
  qr_code_element.appendChild(download);

  let download_link = document.createElement("a");
  //download_link.href = dataURL;
  download_link.setAttribute("download", `${inputln.value} ${gradesection.value}.png`);
  download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;

  download.appendChild(download_link);

  let qr_code_img = document.querySelector(".qr-code img");
  let qr_code_canvas = document.querySelector("canvas");

  if (qr_code_img.getAttribute("src") == null) {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
    }, 300);
  }
}
*/
generate({
  value: "https://m.me/xzx.gov.ph"
});