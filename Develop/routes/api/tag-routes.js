const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({ include: [Product] })
    return res.json(tagData)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "an error occurred",
      err: err,
    });
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = Tag.findByPk(req.params.id, {
      includ: [Product]
    });
    if (oneTag) {
      return res.json(oneTag);
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

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "an error occurred",
      err: err,
    });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updateTag[0]) {
      return res.json(updateTag);
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
  // delete on tag by its `id` value
  try {
    const deleteTag = Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deleteTag) {
      return res.json(deleteTag);
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
