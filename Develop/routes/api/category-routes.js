const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catagoryData = await Category.findAll({ include: [Product] });
    return res.json(catagoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "error",
      err: err,
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    const oneCategory = Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (oneCategory) {
      return res.json(oneCategory);
    } else {
      return res.status(404).json({ msg: "no record" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "error",
      err: err,
    });
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create({
      category_name: req.body.category_name,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "error",
      err: err,
    });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updateCategory[0]) {
      return res.json(updateCategory);
    } else {
      return res.status(404).json({ msg: "no such record" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "an error occurred",
      err: err,
    });
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deleteCategory) {
      return res.json(deleteCategory);
    } else {
      return res.status(404).json({ msg: "no such recrod" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "an error occurred",
      err: err,
    });
  }
});

module.exports = router;
