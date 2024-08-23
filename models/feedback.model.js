const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
  feedback: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  gender:{
          type: String,
          required: true,
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

//generate a raw data for feedback above schema
// {
//     "name": "John Doe",
//     "feedback": [
//         {
//             "question": "How was the event?",
//             "answer": "It was great"
//         },
//         {
//             "question": "What did you like most?",
//             "answer": "The food"
//         },
//         ],

