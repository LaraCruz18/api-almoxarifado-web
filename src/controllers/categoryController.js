const prisma = require('../database/prismaClient');

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar categorias.'
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!category) {
      return res.status(404).json({
        error: 'Categoria não encontrada.'
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar categoria.'
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        description
      }
    });

    res.status(201).json(category);
  } catch (error) {
  console.log(error);

    res.status(500).json({
    error: 'Erro ao criar categoria.'
  });
}
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!categoryExists) {
      return res.status(404).json({
        error: 'Categoria não encontrada.'
      });
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        description
      }
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao atualizar categoria.'
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!categoryExists) {
      return res.status(404).json({
        error: 'Categoria não encontrada.'
      });
    }

    await prisma.category.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: 'Categoria removida com sucesso.'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao remover categoria.'
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};