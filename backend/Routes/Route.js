const express = require("express");
const Todo = require("../Model/Todo");

const router = express.Router();

router.get("/getTodo", async (req, res) => {
  try {
    const todo = await Todo.find();
    console.log(todo);
    res.status(200).json({ sucess: true, todo });
  } catch (error) {
    console.error(error, "error in getTodo");
    return res.status(500).json(error, "error in getTodo");
  }
});

router.post("/insertTodo", async (req, res) => {
  try {
    const { description } = req.body;
    // console.log(req.body,"error console")
    const newTodo = new Todo({ description }); // Model for collection
    const savedResult = await newTodo.save();
    console.log({ savedResult });
    return res.status(200).json({ sucess: true, savedResult,message:"Item added sucessfully" });
  } catch (error) {
    if (error.code === 11000) {
      console.error(error, "Duplicate description");
      return res
        .status(409)
        .json({ sucess: false, message: "Duplicate description" });
    } else {
      console.error(error, "Error in insertTODO");
      return res.status(500).json({ success: false, message: "Error in insertTODO" });
    }
    console.error(error, "Error in insertTODO");
    return res.status(500).json(error, "Error in insertTODO");
  }
});

router.delete("/deleteTodo", async (req, res) => {
  console.log(req.query, "njanada thangan");
  try {
    const descriptionId = req.query.descriptionId;
    console.log(req.query);
    console.log(descriptionId);
    const deleteResult = await Todo.findByIdAndDelete(descriptionId);
    console.log({ deleteResult });
    return res.status(200).json({ sucess: true, deleteResult,message:"item deleted sucessfully" });
  } catch (error) {
    console.error(error, "Error in deleteTODO");
    return res.status(500).json(error, "Error in deleteTODO");
  }
});

router.delete("/deleteAllTodos", async (req, res) => {
  try {
    const deleteAllResult = await Todo.deleteMany({});
    console.log({ deleteAllResult });
    return res.status(200).json({ success: true, message: "All todos deleted successfully" });
  } catch (error) {
    console.error(error, "Error in deleteAllTodos");
    return res.status(500).json({ success: false, message: "Error in deleteAllTodos" });
  }
});


// router.put("/editTodo", async (req, res) => {
//   try {
//     // const descriptionId=req.body.descriptionId
//     // const descriptionContent=req.body.description
//     console.log(req.body);
//     const { description, descriptionId } = req.body;
//     const editResult = await Todo.findByIdAndUpdate(
//       descriptionId,
//       { description: description },
//       { new: true } // Return the updated document
//     );
//     console.log({ editResult });
//     res.status(200).json({ sucess: true, editResult });
//   } catch (error) {
//     console.error(error, "Error in editTODO");
//     return res.status(500).json(error, "Error in editTODO");
//   }
// });

router.put("/editTodo", async (req, res) => {
  try {
    const { description, descriptionId } = req.body;

    // Check if the description is empty or undefined
    if (!description || description.trim() === "") {
      return res.status(400).json({ success: false, message: "Description cannot be empty." });
    }

    // Check if the description matches the existing description
    const existingTodo = await Todo.findById(descriptionId);
    if (!existingTodo) {
      return res.status(404).json({ success: false, message: "Todo not found." });
    }

    if (existingTodo.description === description) {
      return res.status(400).json({ success: false, message: "No changes made." });
    }

    // Check if the description already exists
    await Todo.findOne({ description: description });
    if (existingTodo && existingTodo._id.toString() !== descriptionId) {
      return res.status(400).json({ success: false, message: "Duplicate description found." });
    }

    const editResult = await Todo.findByIdAndUpdate(
      descriptionId,
      { description: description },
      { new: true }
       
      // Return the updated document
    );

    console.log({ editResult });
    return res.status(200).json({ success: true, editResult, message:"item edited sucessfully"});
  } catch (error) {
    console.error(error, "Error in editTODO");
    return res.status(500).json({ success: false, message: "Error in editTODO" });
  }
});


module.exports = router;
