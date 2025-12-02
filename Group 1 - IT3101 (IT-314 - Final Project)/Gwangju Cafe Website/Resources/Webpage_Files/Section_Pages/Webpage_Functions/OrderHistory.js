function initHistory() {
    const container = document.getElementById("profile_container");
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        container.innerHTML = `
            <p>You are not logged in. 
                <a href="../Webpage_Sections/LogIn.html">Log in</a> 
                to view your orders.
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

    container.innerHTML = `<div id="orders_list"></div>`;
    displayOrders(currentUser);
}

function displayOrders(username) {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[username];
    const orders = user.orders ? user.orders.slice().reverse() : [];
    const ordersList = document.getElementById("orders_list");

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No previous orders.</p>";
        return;
    }

    ordersList.innerHTML = "";

    orders.forEach((order, index) => {
        const realIndex = user.orders.length - 1 - index;

        const itemsHtml = order.items.map(i =>
            `${i.name} x ${i.quantity} — P ${(i.price * i.quantity).toFixed(2)}`
        ).join("<br>");

        const card = document.createElement("div");
        card.className = "order_card";

        card.innerHTML = `
            <p><strong>Order Date:</strong> ${order.date}</p>
            <div>${itemsHtml}</div>
            <p><strong>Items Total:</strong> P ${order.total}</p>
            <p><strong>Shipping Fee:</strong> P ${order.shippingFee}</p>
            <p><strong>Final Total:</strong> P ${order.finalTotal}</p>

            <div class="order_status">
                <strong>Status: <span id="status_${realIndex}">${order.status || "Pending"}</span></strong> 
                <br><br>

                <div id="rating_container_${realIndex}">
                    ${
                        order.status === "Received"
                        ? renderStarsInteractive(username, realIndex, order.rating || 0)
                        : `<button class="received_button" onclick="markReceived(${realIndex})">Order Received</button>`
                    }
                </div>
            </div>
        `;

        ordersList.appendChild(card);
    });
}

function markReceived(i) {
    const username = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users"));

    users[username].orders[i].status = "Received";
    users[username].orders[i].rating = users[username].orders[i].rating || 0;

    localStorage.setItem("users", JSON.stringify(users));
    initHistory();
}

function renderStarsInteractive(username, orderIndex, rating) {
    let stars = "<strong>Rating:</strong> ";
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star" onclick="setRating(${orderIndex}, ${i})">${i <= rating ? "★" : "☆"}</span>`;
    }
    return stars;
}

function setRating(orderIndex, stars) {
    const username = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users"));

    users[username].orders[orderIndex].rating = stars;

    localStorage.setItem("users", JSON.stringify(users));
    initHistory();
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}