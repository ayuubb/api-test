const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory "database"
let items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
];

// GET all items
app.get("/api/items", (req, res) => {
    res.json(items);
});

// GET single item by ID
app.get("/api/items/:id", (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
});

// POST create new item
app.post("/api/items", (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT update item
app.put("/api/items/:id", (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = req.body.name;
    res.json(item);
});

// DELETE item
app.delete("/api/items/:id", (req, res) => {
    const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
    if (itemIndex === -1)
        return res.status(404).json({ message: "Item not found" });

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
