const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-schema cho Education
const educationSchema = new Schema({
  school: { type: String, required: true },
  degree: { type: String },
  startDate: { type: String },
  endDate: { type: String }
});

// Sub-schema cho WorkExperience
const workExperienceSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String }
});

// Sub-schema cho ForeignLanguage
const foreignLanguageSchema = new Schema({
  language: { type: String, required: true },
  level: { type: String }
});

// Sub-schema cho Project
const projectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  link: { type: String }
});

// Sub-schema cho Award
const awardSchema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String },
  date: { type: Date }
});

const skillsSchema = new Schema({
  skill: { type: String, required: true },
  description: { type: String },
  level: { type: String }
});

const AIEvaluateSchema = new Schema({
  total_score: { type: Number },
  section_scores: {
    education: { type: Number },
    experience: { type: Number },
    skills: { type: Number },
    projects: { type: Number }
  },
  strengths: { type: [String] },
  weaknesses: { type: [String] },
  suggestions: { type: [String] },
  ats_readiness: { type: String },
  update_time: { type: Date },
})
// Schema chính cho User
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  nickName: { type: String },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  role: { type: String },
  level: { type: String },
  avatar: { type: String },
  address: { type: String },
  joinedAt: { type: Date },
  bio: { type: String },
  aboutMe: { type: String },
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  skills: [skillsSchema],
  foreignLanguages: [foreignLanguageSchema],
  projects: [projectSchema],
  awards: [awardSchema],
  AIEvaluate: { type: AIEvaluateSchema },

}, { timestamps: true }); // auto tạo createdAt & updatedAt

module.exports = mongoose.model('User', userSchema);
