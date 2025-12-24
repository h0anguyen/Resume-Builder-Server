const User = require('../models/user.model');
const openai = require('../services/openai.service');
const safeJsonParse = require('../utils/safeJsonParse');
const buildProfileText = require('../utils/buildProfileText');

exports.evaluateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    // vị trí ứng tuyển và trình độ 
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const ProfileText = buildProfileText(user);

    const prompt = `
Bạn là chuyên gia tuyển dụng & ATS.

Đánh giá Profile theo thang điểm 100 cho:
- Vị trí: ${user.role}
- Cấp độ: ${user.level}

CHỈ TRẢ JSON:
{
  "total_score": number,
  "section_scores": {
    "education": number,
    "experience": number,
    "skills": number,
    "projects": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "ats_readiness": "Thấp" | "Trung bình" | "Cao",
  "update_time": "ISODate"
}

Profile:
${ProfileText}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    });

    const result = safeJsonParse(
      completion.choices[0].message.content
    );

    // Lưu kết quả đánh giá vào user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { AIEvaluate: result },
      {
        new: true,
        runValidators: true
      }
    ).lean();

    return res.json({
      success: true,
      data: updatedUser
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
