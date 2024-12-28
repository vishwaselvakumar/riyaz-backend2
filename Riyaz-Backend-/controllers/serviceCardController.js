const ServiceCard = require('../modals/serviceCardModel');
const mongoose = require('mongoose');



//working code
exports.createServiceCard = async (req, res) => {
  try {
    const { heading, description, imageurl } = req.body;

    // Parse the 'description' string into an object (if it's a stringified object)
    const parsedDescription = description ? JSON.parse(description) : null;

    // Check if the required fields are present
    if (!heading || !parsedDescription || !parsedDescription.paragraph || !imageurl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // const { paragraph, features, listType } = parsedDescription;
// console.log(heading, paragraph, features, listType,imageurl)
    // Assuming you have a model to save the data, e.g., ServiceCard
    const newServiceCard = new ServiceCard({ heading, description: parsedDescription, imageurl });
    await newServiceCard.save();

    res.status(201).json({
      message: `Service card created successfully with heading: ${heading}`,
      newServiceCard
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ServiceCard.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getServiceCard = async (req, res) => {
  try {
    const serviceCard = await ServiceCard.findById(req.params.id);
    if (!serviceCard) {
      return res.status(404).json({ error: 'Service Card not found' });
    }
    res.json(serviceCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//working code
exports.getAllServiceCards = async (req, res) => {
  try {
    const serviceCards = await ServiceCard.find();
    res.status(200).json(serviceCards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service cards', error });
  }
};
//working code
exports.updateServiceCard = async (req, res) => {
  const { id } = req.params;
  const { heading, description, imageurl } = req.body;

  // Parse the 'description' string into an object (if it's a stringified object)
  const parsedDescription = description ? JSON.parse(description) : nu

  try {
    const updatedCard = await ServiceCard.findByIdAndUpdate(id, { heading, description: parsedDescription, imageurl }, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ message: 'Service card not found' });
    }
    res.status(200).json({
      message: `Service card updated successfully with heading: ${updatedCard.heading}`,
      updatedCard
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteServiceCard = async (req,res) => {
  try {
    const { id } = req.params;
    await ServiceCard.findByIdAndDelete(id)
    res.status(200).json({
      message: `service card deleted`,
    });

  } catch (error) {
   return res.status(500).json({ message: 'Server error', error });
  }
}
