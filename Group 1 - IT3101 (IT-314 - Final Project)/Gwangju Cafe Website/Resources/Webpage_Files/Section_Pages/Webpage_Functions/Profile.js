function initProfile() {
    const currentUser = localStorage.getItem("currentUser");
    const container = document.getElementById("profile_container");

    if (!container) return;

    if (!currentUser) {
        container.innerHTML = `
            <p>You are not logged in. 
                <a href="../Webpage_Sections/LogIn.html">Log in</a> 
                to view your profile.
            </p>
        `;
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[currentUser];

    if (!user) {
        container.innerHTML = `<p>User data not found.</p>`;
        return;
    }

    renderProfile(user, currentUser);
}

function renderProfile(user, username) {
    const container = document.getElementById("profile_container");

    const passwordMasked = user.password
        ? "∙".repeat(String(user.password).length)
        : "";

    const a = user.address || {};

    container.innerHTML = `
        <div class="profile_box">
            <h3>PROFILE</h3>
            <hr>

            <div class="profile_details">
                <div class="profile_data">

                    <p><strong>Full Name:</strong> ${escapeHtml(a.firstName || "")} ${escapeHtml(a.lastName || "")}</p>

                    <p><strong>Username:</strong> ${escapeHtml(username)}</p>

                    <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>

                    <p><strong>Password:</strong> ${passwordMasked}</p>

                    <h4 class="profile_section_title">ADDRESS:</h4>

                    <p class="indent"><strong>House No.:</strong> ${escapeHtml(a.houseNumber || "")}</p>
                    <p class="indent"><strong>Street:</strong> ${escapeHtml(a.street || "")}</p>
                    <p class="indent"><strong>Barangay:</strong> ${escapeHtml(a.barangay || "")}</p>
                    <p class="indent"><strong>Town: San Luis, Batangas, Philippines</strong></p>
                </div>
                <hr>
            </div>
        </div>
    `;
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../Webpage_Sections/LogIn.html";
}

function nav_logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../../Section_Pages/Webpage_Sections/LogIn.html";
}

function escapeHtml(str) {
    if (!str && str !== 0) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}