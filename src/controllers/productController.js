const prisma = require('../database/prismaClient');

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        supplier: true
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar produtos.'
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        category: true,
        supplier: true
      }
    });

    if (!product) {
      return res.status(404).json({
        error: 'Produto não encontrado.'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar produto.'
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      unity,
      minimumStock,
      categoryId,
      supplierId
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        unity,
        minimumStock,
        categoryId,
        supplierId
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Erro ao criar produto.'
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      unity,
      minimumStock,
      categoryId,
      supplierId
    } = req.body;

    const productExists = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!productExists) {
      return res.status(404).json({
        error: 'Produto não encontrado.'
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        description,
        unity,
        minimumStock,
        categoryId,
        supplierId
      }
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao atualizar produto.'
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productExists = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!productExists) {
      return res.status(404).json({
        error: 'Produto não encontrado.'
      });
    }

    await prisma.product.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: 'Produto removido com sucesso.'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao remover produto.'
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};