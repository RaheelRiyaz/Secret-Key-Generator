const numberOfStrings = document.querySelector("#number");
const lengthOfString = document.querySelector("#string");
const resultSection = document.querySelector(".result-section");
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// Alphabets in lowercase
const lowercaseAlphabet = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(97 + index)
);

// Alphabets in uppercase
const uppercaseAlphabet = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index)
);

function generateString() {
  const array = checkUserSelection();
  const x = numberOfStrings.value > 100 ? 100 : numberOfStrings.value;
  const y = lengthOfString.value > 32 ? 32 : lengthOfString.value;
  let strings = [];

  for (let index = 0; index < x; index++) {
    let string = "";
    for (let i = 0; i < y; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      string += array[randomIndex];
    }
    strings.push(string);
    string = "";
  }
  updateResult(strings);
}

function checkUserSelection() {
  const selectors = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked"),
    (checkbox) => checkbox.value
  );

  if (selectors.length === 3) {
    return [...numbers, ...lowercaseAlphabet, ...uppercaseAlphabet];
  } else if (
    selectors.includes("uppercase") &&
    selectors.includes("lowercase")
  ) {
    return [...uppercaseAlphabet, ...lowercaseAlphabet];
  } else if (selectors.includes("numeric") && selectors.includes("lowercase")) {
    return [...numbers, ...lowercaseAlphabet];
  } else if (selectors.includes("numeric") && selectors.includes("uppercase")) {
    return [...numbers, ...uppercaseAlphabet];
  } else if (selectors.includes("numeric")) {
    return numbers;
  } else if (selectors.includes("lowercase")) {
    return lowercaseAlphabet;
  } else if (selectors.includes("uppercase")) {
    return uppercaseAlphabet;
  }
}

function updateResult(array) {
  resultSection.innerHTML = "";
  array.map((_) => {
    resultSection.innerHTML += `<div class="d-flex"><p>${_}</p><i class="fa-solid fa-copy ms-5" onclick="copyToClipboard(event)"></i></div>`;
  });
}

function copyToClipboard(e) {
  const text = e.target.previousElementSibling.innerText;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      fireSwal("Text copied to clipboard");
    })
    .catch((err) => {
      fireSwal("Unable to copy text to clipboard", "error");
    });
}

function fireSwal(text, swalIcon = "success") {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: swalIcon,
    title: text,
  });
}