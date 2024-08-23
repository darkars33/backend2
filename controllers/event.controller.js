const Event = require("../models/events.model");

const createEvent = async (req, res) => {
  try {
    const { name, date, time, location, description, totalRegistered} = req.body;
    if (!name || !date || !time || !location || !description || !totalRegistered) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const isEventExist = await Event.findOne({ name });
    if (isEventExist) {
      return res.status(400).json({
        message: "Event already exists",
        success: false,
      });
    }

    const newEvent = new Event({
      name,
      date,
      time,
      location,
      description,
      totalRegistered
    });

    await newEvent.save();
    return res.status(200).json({
          message: "Event created successfully",
          success: true,
          data: newEvent
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getRecentEvents = async (req, res) =>{
          try {
                 const events = await Event.find().sort({createdAt: -1}).limit(5);
                       return res.status(200).json({
                                    message: "Recent events fetched successfully",
                                    success: true,
                                    data: events
                       })   
          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: "Internal Server Error",
                              success: false
                    })
          }
}

const getAllEvents = async (req, res) =>{
          try {
                    const events = await Event.find();
                    return res.status(200).json({
                              message: "Events fetched successfully",
                              success: true,
                              data: events
                    })
          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: "Internal Server Error",
                              success: false
                    })
          }
}

module.exports = {createEvent, getRecentEvents, getAllEvents};
