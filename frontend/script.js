
let isLogin = true;

const heading = document.getElementById("heading");
const nameInput = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("toggleBtn");
const authForm = document.getElementById("authForm");
const message = document.getElementById("message");

toggleBtn.addEventListener("click", () => {
    isLogin = !isLogin;

    heading.textContent = isLogin ? "Login" : "Signup";
    submitBtn.textContent = isLogin ? "Login" : "Signup";
    nameInput.hidden = isLogin;
    nameInput.required = !isLogin;

    toggleBtn.textContent = isLogin
        ? "Create an account"
        : "Already have an account? Login";

    message.textContent = "";
});

authForm.addEventListener("submit", (event) => {
    event.preventDefault();

    message.textContent = isLogin
        ? "Login form submitted"
        : "Signup form submitted";
});
