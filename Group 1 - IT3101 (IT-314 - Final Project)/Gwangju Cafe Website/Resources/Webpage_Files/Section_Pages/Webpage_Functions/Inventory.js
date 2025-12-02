document.addEventListener("DOMContentLoaded", initInventory);

function initInventory() {
    const container = document.getElementById("inventory_table");

    if (!container) {
        console.error("ERROR: #inventory_table NOT FOUND");
        return;
    }

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    renderInventoryTable(inventory);
}

function renderInventoryTable(inventory) {
    const container = document.getElementById("inventory_table");

    let html = `
        <table class="admin_inventory_table">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (inventory.length === 0) {
        html += `
            <tr>
                <td colspan="7" style="text-align:center; padding:15px; color:gray;">
                    No items in inventory.
                </td>
            </tr>
        `;
    } else {
        inventory.forEach((item, index) => {
            html += `
                <tr>

                    <td>${item.id}</td>

                    <td>
                        <input type="text"
                               value="${item.name}"
                               data-field="name"
                               class="inventory_input">
                    </td>

                    <td>
                        <input type="text"
                               value="${item.category}"
                               data-field="category"
                               class="inventory_input">
                    </td>

                    <td>
                        <input type="text"
                               value="${item.size || ""}"
                               data-field="size"
                               class="inventory_input">
                    </td>

                    <td>
                        <input type="number"
                               value="${item.price}"
                               min="0"
                               data-field="price"
                               class="inventory_input">
                    </td>

                    <td>
                        <input type="number"
                               value="${item.stock}"
                               min="0"
                               data-field="stock"
                               class="inventory_input">
                    </td>

                    <td>
                        <button class="update_button" onclick="updateItem(${index})">
                            Update
                        </button>

                        <button class="delete_button" onclick="deleteInventoryItem(${index})">
                            Delete
                        </button>
                    </td>

                </tr>
            `;
        });
    }

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function updateItem(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    if (!inventory[index]) return;

    const row = document.querySelectorAll("tbody tr")[index];
    const inputs = row.querySelectorAll(".inventory_input");

    inputs.forEach(input => {
        const field = input.dataset.field;
        let value = input.value.trim();

        if (field === "price" || field === "stock") {
            value = Number(value);
        }

        inventory[index][field] = value;
    });

    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventoryTable(inventory);

    alert("Item updated successfully!");
}

function addInventoryItem() {
    const name = prompt("Item name:");
    if (!name) return;

    const category = prompt("Category:") || "Uncategorized";
    const size = prompt("Size:") || "Default";
    const price = Number(prompt("Price:") || 0);
    const stock = Number(prompt("Stock quantity:") || 0);

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    inventory.push({
        id: Date.now() + i,
        name,
        category,
        size,
        price,
        stock
    });

    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventoryTable(inventory);
}


function deleteInventoryItem(index) {
    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    if (!confirm("Remove this item from inventory?")) return;

    inventory.splice(index, 1);

    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventoryTable(inventory);
}

function admin_logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../LogIn.html";
}