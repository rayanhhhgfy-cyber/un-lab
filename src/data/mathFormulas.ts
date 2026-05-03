export interface FormulaItem {
  id: string;
  expr: string;
  noteEn: string;
  noteAr: string;
}

export interface FormulaCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  items: FormulaItem[];
}

export const mathFormulaCategories: FormulaCategory[] = [
  {
    id: "algebra",
    titleEn: "Algebra & polynomials",
    titleAr: "الجبر والمتعددات",
    items: [
      { id: "quad", expr: "ax² + bx + c = 0  →  x = (−b ± √(b² − 4ac)) / (2a)", noteEn: "Quadratic formula", noteAr: "قانون الجذور للمعادلة التربيعية" },
      { id: "binom", expr: "(a ± b)² = a² ± 2ab + b²", noteEn: "Perfect square", noteAr: "مربع كامل" },
      { id: "diffsq", expr: "a² − b² = (a − b)(a + b)", noteEn: "Difference of squares", noteAr: "فرق بين مربعين" },
      { id: "arith", expr: "uₙ = u₁ + (n − 1)d ,   Sₙ = n/2 · (2u₁ + (n − 1)d)", noteEn: "Arithmetic sequence & sum", noteAr: "متتالية حسابية ومجموعها" },
      { id: "geom", expr: "uₙ = u₁ · rⁿ⁻¹ ,   Sₙ = u₁(1 − rⁿ)/(1 − r)  (r ≠ 1)", noteEn: "Geometric sequence & sum", noteAr: "متتالية هندسية ومجموعها" },
    ],
  },
  {
    id: "trig",
    titleEn: "Trigonometry",
    titleAr: "المثلثات",
    items: [
      { id: "pyth", expr: "sin²θ + cos²θ = 1", noteEn: "Pythagorean identity", noteAr: "علاقة فيثاغورس المثلثية" },
      { id: "tan", expr: "tan θ = sin θ / cos θ", noteEn: "Tangent", noteAr: "الظل" },
      { id: "double", expr: "sin 2θ = 2 sin θ cos θ ,   cos 2θ = cos²θ − sin²θ", noteEn: "Double angle", noteAr: "زاوية مضاعفة" },
      { id: "sos", expr: "sin(A ± B) = sin A cos B ± cos A sin B", noteEn: "Sine addition", noteAr: "جيب مجموع/فرق زاويتين" },
      { id: "cosab", expr: "cos(A ± B) = cos A cos B ∓ sin A sin B", noteEn: "Cosine addition", noteAr: "جيب تمام مجموع/فرق" },
    ],
  },
  {
    id: "calc",
    titleEn: "Calculus",
    titleAr: "التفاضل والتكامل",
    items: [
      { id: "deriv-power", expr: "d/dx (xⁿ) = n xⁿ⁻¹", noteEn: "Power rule", noteAr: "قاعدة القوة" },
      { id: "deriv-exp", expr: "d/dx (eˣ) = eˣ ,   d/dx (ln x) = 1/x", noteEn: "Exponential & log", noteAr: "أس طبيعي ولوجاريتم" },
      { id: "int-power", expr: "∫ xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ −1)", noteEn: "Antiderivative of power", noteAr: "تكامل القوة" },
      { id: "ftc", expr: "∫ₐᵇ f′(x) dx = f(b) − f(a)", noteEn: "Fundamental theorem", noteAr: "النظرية الأساسية للتفاضل والتكامل" },
      { id: "taylor", expr: "f(x) ≈ Σ f⁽ⁿ⁾(a)/n! · (x − a)ⁿ", noteEn: "Taylor series", noteAr: "سلسلة تايلور" },
      { id: "newton", expr: "xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)", noteEn: "Newton–Raphson root finding", noteAr: "نيوتن–رافسون لإيجاد جذر" },
      { id: "euler", expr: "yₙ₊₁ = yₙ + h · f(tₙ, yₙ)", noteEn: "Euler ODE step", noteAr: "خطوة أويلر للمعادلات التفاضلية" },
      { id: "grad-step", expr: "x ← x − η ∇f(x)", noteEn: "Gradient descent step", noteAr: "خطوة انحدار التدرج" },
    ],
  },
  {
    id: "complex",
    titleEn: "Complex numbers",
    titleAr: "الأعداد المركبة",
    items: [
      { id: "polar", expr: "z = x + iy = r e^(iθ) ,   r = |z| ,  θ = arg z", noteEn: "Polar form", noteAr: "الشكل القطبي" },
      { id: "mul", expr: "z₁ z₂ = r₁r₂ e^(i(θ₁+θ₂))", noteEn: "Product in polar form", noteAr: "الضرب بالقطبيات" },
      { id: "de-moivre", expr: "(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ", noteEn: "De Moivre", noteAr: "د موافر" },
    ],
  },
  {
    id: "stats",
    titleEn: "Probability & statistics",
    titleAr: "الاحتمال والإحصاء",
    items: [
      { id: "mean", expr: "x̄ = (1/n) Σ xᵢ", noteEn: "Sample mean", noteAr: "متوسط عيّنة" },
      { id: "var", expr: "σ² = E[(X − μ)²]", noteEn: "Variance", noteAr: "التباين" },
      { id: "normal", expr: "f(x) = (1/σ√2π) exp(−(x−μ)²/(2σ²))", noteEn: "Normal PDF", noteAr: "كثافة التوزيع الطبيعي" },
      { id: "binom-pmf", expr: "P(X = k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ", noteEn: "Binomial probability", noteAr: "احتمال ثنائي الحدين" },
    ],
  },
  {
    id: "geometry",
    titleEn: "Geometry",
    titleAr: "الهندسة",
    items: [
      { id: "heron", expr: "A = √(s(s−a)(s−b)(s−c)) ,  s = (a+b+c)/2", noteEn: "Heron's area", noteAr: "مساحة هيرون" },
      { id: "circle", expr: "C = 2πr ,   A = πr²", noteEn: "Circle", noteAr: "دائرة" },
      { id: "sphere", expr: "V = (4/3)πr³ ,   A = 4πr²", noteEn: "Sphere", noteAr: "كرة" },
    ],
  },
];
