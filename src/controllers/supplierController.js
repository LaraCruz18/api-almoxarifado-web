const prisma = require('../database/prismaClient');

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar fornecedores.'
    });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await prisma.supplier.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!supplier) {
      return res.status(404).json({
        error: 'Fornecedor não encontrado.'
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar fornecedor.'
    });
  }
};

const createSupplier = async (req, res) => {
  try {
    const { name, cnpj, email, phone } = req.body;

    const supplier = await prisma.supplier.create({
      data: {
        name,
        cnpj,
        email,
        phone
      }
    });

    res.status(201).json(supplier);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Erro ao criar fornecedor.'
    });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cnpj, email, phone } = req.body;

    const supplierExists = await prisma.supplier.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!supplierExists) {
      return res.status(404).json({
        error: 'Fornecedor não encontrado.'
      });
    }

    const updatedSupplier = await prisma.supplier.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        cnpj,
        email,
        phone
      }
    });

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao atualizar fornecedor.'
    });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplierExists = await prisma.supplier.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!supplierExists) {
      return res.status(404).json({
        error: 'Fornecedor não encontrado.'
      });
    }

    await prisma.supplier.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: 'Fornecedor removido com sucesso.'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao remover fornecedor.'
    });
  }
};

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};