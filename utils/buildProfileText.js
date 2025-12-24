module.exports = function buildCvText(user) {
  return `
THÔNG TIN CÁ NHÂN
Tên: ${user.name || ''}
Email: ${user.email || ''}
SĐT: ${user.phone || ''}
Địa chỉ: ${user.address || ''}
Giới thiệu: ${user.aboutMe || ''}

HỌC VẤN
${(user.education || []).map(e =>
  `- ${e.school} (${e.startYear || ''} - ${e.endYear || ''})
   Bằng cấp: ${e.degree || ''}`
).join('\n')}

KINH NGHIỆM LÀM VIỆC
${(user.workExperience || []).map(w =>
  `- ${w.company}
   Vị trí: ${w.position || ''}
   Thời gian: ${w.startDate || ''} - ${w.endDate || ''}
   Mô tả: ${w.description || ''}`
).join('\n')}

KỸ NĂNG
${(user.skills || []).map(s =>
  `- ${s.skill} (${s.level || ''})`
).join('\n')}

NGOẠI NGỮ
${(user.foreignLanguages || []).map(l =>
  `- ${l.language}: ${l.level || ''}`
).join('\n')}

DỰ ÁN
${(user.projects || []).map(p =>
  `- ${p.title}
   ${p.description || ''}
   ${p.link || ''}`
).join('\n')}

GIẢI THƯỞNG
${(user.awards || []).map(a =>
  `- ${a.title} (${a.issuer || ''})`
).join('\n')}
`;
};
