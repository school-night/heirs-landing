const form = document.getElementById("password-form");
const input = document.getElementById("password-input");
const button = document.getElementById("submit-button");
const decodedDestination = atob("aHR0cHM6Ly9pbmRkLmFkb2JlLmNvbS92aWV3LzYwZTQwNTZiLWYzYmMtNDFiMy1iZGMyLWUzN2VmNGQyMTU3ZA==");
const decodedPw = atob("bWJoZGlkaXRhZ2Fpbg==");

function unlock (event) {
  event.preventDefault();
  if (input.value === decodedPw) {
    window.open(decodedDestination, "_blank");
  } else {
    alert("Wrong password");
  }
}

form.addEventListener("submit", unlock);
