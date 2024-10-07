const express = require('express');
const router = express.Router();
const Routes = require('../models/routes'); // Ensure the path to your model is correct

// 1. Create a new route
router.post('/create', async (req, res) => {
    try {
        const route = await Routes.create(req.body);
        res.status(201).json(route); // 201 Created status
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// 2. Get all routes
router.get('/getAll', async (req, res) => {
    try {
        const routes = await Routes.find({});
        res.status(200).json(routes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// 3. Update a route by routesID
router.put('/update/:routesID', async (req, res) => {
    const { routesID } = req.params;
    const { routeName } = req.body;

    try {
        const updatedRoute = await Routes.findOneAndUpdate(
            { routesID }, // Find the route by routesID
            { routeName }, // Update with new route name
            { new: true } // Return the updated document
        );

        if (!updatedRoute) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.status(200).json(updatedRoute);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// 4. Delete a route by routesID
router.delete('/delete/:routesID', async (req, res) => {
    const { routesID } = req.params;

    try {
        const deletedRoute = await Routes.findOneAndDelete({ routesID });

        if (!deletedRoute) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
