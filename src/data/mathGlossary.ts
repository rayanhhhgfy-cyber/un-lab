export interface GlossaryEntry {
  termEn: string;
  termAr: string;
  defEn: string;
  defAr: string;
  tags: string[];
}

export const mathGlossary: GlossaryEntry[] = [
  { termEn: "Asymptote", termAr: "مقارب", defEn: "A line a graph approaches without necessarily meeting.", defAr: "خط تقترب منه المنحنى دون أن تلزم التقاء.", tags: ["calculus", "analysis"] },
  { termEn: "Bijection", termAr: "تقابل حاد", defEn: "A function that is both injective and surjective.", defAr: "دالة حقن وعلى معًا.", tags: ["algebra", "sets"] },
  { termEn: "Complex conjugate", termAr: "المرافق المركب", defEn: "For z = a + ib, the conjugate is a − ib.", defAr: "إذا z = a + ib فالمرافق a − ib.", tags: ["complex"] },
  { termEn: "Determinant", termAr: "المحدد", defEn: "Scalar encoding volume/area scaling of a linear map.", defAr: "عدد يصف مقياس المساحة/الحجم تحت تحويل خطي.", tags: ["linear", "geometry"] },
  { termEn: "Eigenvalue", termAr: "قيمة ذاتية", defEn: "λ such that Av = λv for some nonzero v.", defAr: "λ حيث Av = λv لمتجه v غير صفري.", tags: ["linear"] },
  { termEn: "Fractal", termAr: "كسوري", defEn: "Self-similar structure, often non-integer dimension.", defAr: "بنية متشابهة ذاتيًا، غالبًا ببعد غير صحيح.", tags: ["geometry"] },
  { termEn: "Hypothesis test", termAr: "اختبار فرضية", defEn: "Formal procedure to decide evidence against a null hypothesis.", defAr: "إجراء رسمي لقياس الدليل ضد فرضية العدم.", tags: ["statistics"] },
  { termEn: "Jacobian", termAr: "يعقوبي", defEn: "Matrix of partial derivatives; scales volume under coordinate change.", defAr: "مصفوفة المشتقات الجزئية؛ مقياس الحجم عند تغيير إحداثيات.", tags: ["calculus"] },
  { termEn: "Limit", termAr: "نهاية", defEn: "Value a function approaches as input approaches a point.", defAr: "القيمة التي تقترب منها الدالة عند اقتراب المدخل من نقطة.", tags: ["calculus"] },
  { termEn: "Maclaurin series", termAr: "سلسلة ماكلورين", defEn: "Taylor series centered at 0.", defAr: "سلسلة تايلور عند المركز 0.", tags: ["calculus"] },
  { termEn: "Orthogonal", termAr: "متعامد", defEn: "Vectors with zero dot product.", defAr: "متجهات ناتجها القياسي صفر.", tags: ["linear", "geometry"] },
  { termEn: "p-value", termAr: "قيمة p", defEn: "Probability, under the null, of seeing data at least this extreme.", defAr: "احتمال تحت فرضية العدم لرؤية بيانات بهذا التطرف أو أشد.", tags: ["statistics"] },
  { termEn: "Riemann sum", termAr: "مجموع ريمان", defEn: "Approximation of an integral using rectangle areas.", defAr: "تقريب للتكامل بمساحات مستطيلات.", tags: ["calculus"] },
  { termEn: "Standard deviation", termAr: "الانحراف المعياري", defEn: "Square root of variance; spread of a distribution.", defAr: "جذر التباين؛ انتشار التوزيع.", tags: ["statistics"] },
  { termEn: "Uniform continuity", termAr: "اتصال منتظم", defEn: "δ can be chosen from ε alone on a set.", defAr: "يمكن اختيار δ من ε فقط على مجموعة.", tags: ["analysis"] },
];
