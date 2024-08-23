const Feedback = require("../models/feedback.model");


const addFeedback = async (req, res) =>{
          try {
                   const {name, eventId, feedback, rating, gender} = req.body;
                   if(!name  || !feedback || !rating|| gender){
                              return res.status(400).json({
                                        message: "Please fill all the fields",
                                        success: false
                              })
                   } 
                   const newFeedback = new Feedback({
                                name,
                                eventId,
                                feedback,
                                rating,
                                gender
                   })

                    await newFeedback.save();

                    return res.status(200).json({
                              message: "Feedback added successfully",
                              success: true,
                              data: newFeedback
                    })

          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: "Internal Server Error",
                              success: false
                    })
          }
}

const getFeedbackOfPerEvent = async (req, res) =>{
          try {
                  const {eventId} = req.params;
                  const feedback = await Feedback.find({eventId});
                  
                  return res.status(200).json({
                              message: "Feedback fetched successfully",
                              success: true,
                              data: feedback
                  })
          } catch (error) {
                  console.log(error);
                  return res.status(500).json({
                    message: "Internal Server Error",
                    success: false
                  })  
          }
}

const getFeedbackAll = async (req, res) =>{
          try {
                    const feedback = await Feedback.find();
                    return res.status(200).json({
                              message: "Feedback fetched successfully",
                              success: true,
                              data: feedback
                    })
          } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal Server Error",
                    success: false
                })    
          }
}

const deleteFeedback = async (req, res) =>{
          try {
                    const {feedbackId} = req.params;
                    const feedback = await Feedback.findById(feedbackId);
                    if(!feedback){
                              return res.status(404).json({
                                        message: "Feedback not found",
                                        success: false
                              })
                    }

                    await feedback.deleteOne({_id: feedbackId});
                    return res.status(200).json({
                              message: "Feedback deleted successfully",
                              success: true
                    })
          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: "Internal Server Error",
                              success: false
                    }
                    )
          }
}

module.exports = {
          addFeedback,
          getFeedbackOfPerEvent,
          getFeedbackAll,
          deleteFeedback
}