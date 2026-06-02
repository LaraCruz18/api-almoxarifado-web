const express = require('express');

const router = express.Router();

const {
  getStockMovements,
  getStockMovementById,
  getMovementsByProduct,
  createStockMovement
} = require('../controllers/stockMovementController');

router.get('/', getStockMovements);

router.get('/product/:productId', getMovementsByProduct);

router.get('/:id', getStockMovementById);

router.post('/', createStockMovement);

module.exports = router;