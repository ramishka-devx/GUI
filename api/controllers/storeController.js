const db = require('../config/db');

const getCanteens = async (req, res) => {
    try {
        db.query("SELECT * FROM canteens", (error, canteens) => {
            if (error) {
                console.error("Error fetching canteens:", error.message);
                return res.status(500).json({ error: 'Failed to fetch canteens' });
            }
            if (canteens.length === 0) {
                return res.status(404).json({ error: 'No canteens found' });
            }
            res.json(canteens);
        });
    } catch (error) {
        console.error("Error fetching canteens:", error.message);
        res.status(500).json({ error: 'Failed to fetch canteens' });
    }
};

const getCategoriesByCanteen = async (req, res) => {
    const canteenId = req.query.canteenId;

    if (!canteenId) {
        return res.status(400).json({ error: 'canteenId is required' });
    }

    try {
        db.query("SELECT * FROM categories WHERE canteenId = ?", [canteenId], (error, categories) => {
            if (error) {
                console.error("Error fetching categories:", error.message);
                return res.status(500).json({ error: 'Failed to fetch categories' });
            }
            if (categories.length === 0) {
                return res.status(404).json({ error: 'No categories found for the given canteenId' });
            }
            res.json(categories);
        });
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

const getFoodsByCategory = async (req, res) => {
    const categoryId = req.query.categoryId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;

    if (!categoryId) {
        return res.status(400).json({ error: 'categoryId is required' });
    }

    try {
        // Query to get the total count of foods for the given category
        db.query("SELECT COUNT(*) as count FROM foods WHERE categoryId = ?", [categoryId], (error, results) => {
            if (error) {
                console.error("Error fetching food count:", error.message);
                return res.status(500).json({ error: 'Failed to fetch food count' });
            }

            const totalItems = results[0].count;
            const totalPages = Math.ceil(totalItems / limit);

            // Query to get the paginated foods
            db.query("SELECT * FROM foods WHERE categoryId = ? LIMIT ? OFFSET ?", [categoryId, limit, offset], (error, foods) => {
                if (error) {
                    console.error("Error fetching foods:", error.message);
                    return res.status(500).json({ error: 'Failed to fetch foods' });
                }
                if (foods.length === 0) {
                    return res.status(404).json({ error: 'No foods found for the given categoryId' });
                }
                res.json({
                    foods,
                    pagination: {
                        totalItems,
                        totalPages,
                        currentPage: page,
                        itemsPerPage: limit
                    }
                });
            });
        });
    } catch (error) {
        console.error("Error fetching foods:", error.message);
        res.status(500).json({ error: 'Failed to fetch foods' });
    }
};

module.exports = { getCanteens, getCategoriesByCanteen, getFoodsByCategory };