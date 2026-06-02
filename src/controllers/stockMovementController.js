const prisma = require('../database/prismaClient');

const getStockMovements = async (req, res) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      include: {
        product: true
      }
    });

    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar movimentações de estoque.'
    });
  }
};

const getStockMovementById = async (req, res) => {
  try {
    const { id } = req.params;

    const movement = await prisma.stockMovement.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        product: true
      }
    });

    if (!movement) {
      return res.status(404).json({
        error: 'Movimentação de estoque não encontrada.'
      });
    }

    res.status(200).json(movement);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar movimentação de estoque.'
    });
  }
};

const getMovementsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const movements = await prisma.stockMovement.findMany({
      where: {
        productId: Number(productId)
      }
    });

    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar movimentação de estoque.'
    });
  }
};

const createStockMovement = async (req, res) => {
  try {
    const {
      type,
      quantity,
      notes,
      productId
    } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId)
      }
    });

    if (!product) {
      return res.status(404).json({
        error: 'Movimentação de estoque não encontrada.'
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        error: 'A quantidade deve ser maior que zero.'
      });
    }

    let updatedStock = product.currentStock;

    if (type === 'IN') {
      updatedStock += quantity;
    }

    if (type === 'OUT') {
      if (quantity > product.currentStock) {
        return res.status(400).json({
          error: 'Insufficient stock.'
        });
      }

      updatedStock -= quantity;
    }

    const movement = await prisma.stockMovement.create({
      data: {
        type,
        quantity,
        notes,
        productId
      }
    });

    await prisma.product.update({
      where: {
        id: Number(productId)
      },
      data: {
        currentStock: updatedStock
      }
    });

    res.status(201).json(movement);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Erro ao criar movimentação de estoque.'
    });
  }
};

module.exports = {
  getStockMovements,
  getStockMovementById,
  getMovementsByProduct,
  createStockMovement
};