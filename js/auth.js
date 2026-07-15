document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggle =
        document.getElementById("togglePassword") ||
        document.getElementById("signupPasswordToggle");
    const createLink = document.getElementById("createAccountLink");
    const signupPasswordInput = document.getElementById("signupPassword");
    const signInBtn = document.querySelector(".sign-in-button");
    const passwordFieldWrapper = document.querySelector(".password-field");

    if (createLink) {
        createLink.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "signup.html";
        });
    }

    if (toggle && signupPasswordInput) {
        toggle.addEventListener("click", function () {
            const isHidden = signupPasswordInput.type === "password";
            signupPasswordInput.type = isHidden ? "text" : "password";
            toggle.textContent = isHidden ? "Hide" : "Show";
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document
                .getElementById("signupName")
                .value
                .trim();

            const email = document
                .getElementById("signupEmail")
                .value
                .trim();

            const pass = signupPasswordInput
                ? signupPasswordInput.value
                : "";

            if (!name || !email || pass.length < 6) {
                alert(
                    "Fill all fields. Password must be at least 6 characters."
                );
                return;
            }

            const isWeakPassword =
                !/[A-Z]/.test(pass) ||
                !/[!@#$%^&*(),.?":{}|<>]/.test(pass);

            if (isWeakPassword) {
                alert("Enter a strong password before creating an account.");
                return;
            }

            const account = {
                name: name,
                email: email,
                password: pass
            };

            localStorage.setItem(
                "novaPlusAccount",
                JSON.stringify(account)
            );

            alert("Account created successfully!");
            window.location.href = "login.html";
        });
    }

    if (signupPasswordInput && passwordFieldWrapper) {
        const errorMsg = document.createElement("p");
        errorMsg.textContent =
            "Password must contain at least one uppercase letter and one special character.";
        errorMsg.style.color = "red";
        errorMsg.style.display = "none";
        errorMsg.style.marginTop = "0.25rem";
        passwordFieldWrapper.appendChild(errorMsg);

        signupPasswordInput.addEventListener("input", () => {
            const hasError =
                !/[A-Z]/.test(signupPasswordInput.value) ||
                !/[!@#$%^&*(),.?":{}|<>]/.test(signupPasswordInput.value);
            errorMsg.style.display = hasError ? "block" : "none";
            if (signInBtn) signInBtn.disabled = false;
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document
                .getElementById("email")
                .value
                .trim();

            const pass = document
                .getElementById("password")
                .value;

            const error = document.getElementById("loginError");

            const savedAccount =
                localStorage.getItem("novaPlusAccount");

            const user = savedAccount
                ? JSON.parse(savedAccount)
                : null;

            if (
                !user ||
                user.email !== email ||
                user.password !== pass
            ) {
                if (error) {
                    error.textContent =
                        "Invalid email or password.";
                }
                return;
            }

            sessionStorage.setItem(
                "novaPlusSession",
                JSON.stringify({
                    name: user.name,
                    email: user.email,
                    authenticated: true
                })
            );

            window.location.href = "profiles.html";
        });
    }
});