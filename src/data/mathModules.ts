import type { ComponentType } from "react";
import { LineChart, Variable, Triangle, Hexagon, BarChart3, Infinity } from "lucide-react";
import {
  RiemannIntegralSim,
  TangentSecantSim,
  TaylorCosSim,
  QuadraticRootsSim,
  ComplexMultiplySim,
  UnitCircleSim,
  WaveSuperpositionSim,
  FourierSquareSim,
  LinearTransform2DSim,
  BezierCurveSim,
  MandelbrotSim,
  NormalDistributionSim,
  BinomialGaltonSim,
  LogisticMapSim,
  FibonacciSpiralSim,
} from "@/components/sims/math/MathLabSims";
import {
  NewtonMethodSim,
  EulerOdeSim,
  VectorAddSim,
  DotProductSim,
  LissajousSim,
  MonteCarloPiSim,
  GradientDescentSim,
  LotkaVolterraSim,
  JuliaSetSim,
} from "@/components/sims/math/MathLabSimsMore";

export interface MathExperiment {
  id: string;
  titleEn: string;
  titleAr: string;
  /** Short student-friendly explanation (English). */
  explanationEn: string;
  /** Short student-friendly explanation (Arabic). */
  explanationAr: string;
  Component: ComponentType;
}

export interface MathBranch {
  slug: string;
  path: string;
  title: string;
  titleAr: string;
  icon: typeof LineChart;
  color: string;
  border: string;
  description: string;
  descriptionAr: string;
  details: string;
  detailsAr: string;
  experiments: MathExperiment[];
}

export const mathBranches: MathBranch[] = [
  {
    slug: "calculus",
    path: "/mathematics/calculus",
    title: "Calculus & Analysis",
    titleAr: "التفاضل والتكامل والتحليل",
    icon: LineChart,
    color: "text-violet-400",
    border: "border-violet-400/30",
    description: "Riemann sums, limits, derivatives, and Taylor approximations — numerically exact visuals.",
    descriptionAr: "مجاميع ريمان، النهايات، المشتقات، ومتعددات حدود تايلور — رسوم دقيقة عدديًا.",
    details: "See integration error collapse as rectangles refine; watch secants become tangents; compare Maclaurin polynomials to cos(x).",
    detailsAr: "شاهد انهيار خطأ التكامل مع زيادة n؛ تحول الوتر إلى مماس؛ قارن متعددات ماكلورين مع cos(x).",
    experiments: [
      {
        id: "riemann",
        titleEn: "Riemann vs ∫x²",
        titleAr: "ريمان مقابل التكامل",
        explanationEn:
          "This demo approximates the area under a curve using rectangles (a Riemann sum). As you use more rectangles, the total area usually gets closer to the true integral — here ∫x² on an interval. Watch how the error shrinks when n grows.",
        explanationAr:
          "تقريب مساحة تحت المنحنى بمجاميع مستطيلات (مجموع ريمان). كلما زدت عدد المستطيلات اقترب المجموع من قيمة التكامل الحقيقية — هنا تكامل x². لاحظ كيف يصغر الخطأ عند زيادة n.",
        Component: RiemannIntegralSim,
      },
      {
        id: "tangent",
        titleEn: "Secant → tangent",
        titleAr: "وتر → مماس",
        explanationEn:
          "A secant line cuts the graph at two points. Move those points closer: the secant tilts toward the tangent at a single point. The tangent’s slope is the derivative — the instant rate of change.",
        explanationAr:
          "الوتر يقطع الرسم عند نقطتين. قرّبهما: يميل الوتر نحو المماس عند نقطة واحدة. ميل المماس هو المشتقة — معدل التغير اللحظي.",
        Component: TangentSecantSim,
      },
      {
        id: "taylor",
        titleEn: "Taylor cos(x)",
        titleAr: "تايلور لـ cos(x)",
        explanationEn:
          "Taylor polynomials copy a function’s value and curviness near a point. Here, polynomials hug cos(x) better as you add terms — a bridge between simple powers and wavy trig functions.",
        explanationAr:
          "متعددات حدود تايلور تقترب من قيمة الدالة وانحنائها قرب نقطة. هنا تلتف حول cos(x) كلما زدت الحدود — ربط بين القوى البسيطة والدوال المثلثية.",
        Component: TaylorCosSim,
      },
      {
        id: "newton",
        titleEn: "Newton–Raphson",
        titleAr: "نيوتن–رافسون",
        explanationEn:
          "To solve f(x)=0, follow the tangent downhill: each step uses x − f/f′. It’s fast when the start is good, but can fail if the slope is flat or the guess is far away.",
        explanationAr:
          "لحل f(x)=0 نتبع المماس: كل خطوة x − f/f′. سريع إن كان الاختيار جيدًا، وقد يفشل إذا كان المماس شبه أفقي أو التخمين بعيدًا.",
        Component: NewtonMethodSim,
      },
      {
        id: "euler",
        titleEn: "Euler ODE (y′=λy)",
        titleAr: "أويلر (y′=λy)",
        explanationEn:
          "Euler’s method steps along a differential equation using small time steps: y_next ≈ y + Δt·y′. For y′=λy the true solution is exponential growth or decay; compare the blue steps to the exact curve.",
        explanationAr:
          "طريقة أويلر تمشي خطوة بخطوة على المعادلة التفاضلية: y_next ≈ y + Δt·y′. لـ y′=λy الحل الحقيقي أسي؛ قارن الخطوات مع المنحنى الدقيق.",
        Component: EulerOdeSim,
      },
      {
        id: "gradient",
        titleEn: "Gradient descent",
        titleAr: "انحدار تدرجي",
        explanationEn:
          "To minimize a bowl-shaped surface, step opposite the gradient (steepest uphill). Step size matters: too big overshoots; too small crawls. This idea trains many machine-learning models.",
        explanationAr:
          "لتقليل سطح مقعّر، نمشي عكس التدرج (أشد صعودًا). حجم الخطوة مهم: كبير يتجاوز الحل، صغير يبطئ. هذه الفكرة تدرب نماذج تعلم كثيرة.",
        Component: GradientDescentSim,
      },
    ],
  },
  {
    slug: "algebra",
    path: "/mathematics/algebra",
    title: "Algebra & Complex Numbers",
    titleAr: "الجبر والأعداد المركبة",
    icon: Variable,
    color: "text-fuchsia-400",
    border: "border-fuchsia-400/30",
    description: "Quadratic discriminants and the complex plane with polar multiplication.",
    descriptionAr: "المعادلات التربيعية والمستوى المركب مع ضرب القطبيات.",
    details: "Drag coefficients to see real, repeated, and complex roots; multiply complex numbers and watch angles add and radii multiply.",
    detailsAr: "غيّر المعاملات لرؤية الجذور الحقيقية والمزدوجة والمركبة؛ اضرب أعدادًا مركبة وشاهد جمع الزوايا وضرب الأنصاف.",
    experiments: [
      {
        id: "quadratic",
        titleEn: "Quadratic roots",
        titleAr: "جذور تربيعية",
        explanationEn:
          "The discriminant Δ=b²−4ac tells you how many real roots ax²+bx+c has: two if Δ>0, one touch if Δ=0, complex pair if Δ<0. Drag a,b,c and watch the parabola cross the x-axis.",
        explanationAr:
          "المميز Δ=b²−4ac يحدد عدد الجذور الحقيقية: اثنان إذا Δ>0، جذر مزدوج إذا Δ=0، مركبان إذا Δ<0. حرّك a وb وc وراقب تقاطع القطع مع المحور.",
        Component: QuadraticRootsSim,
      },
      {
        id: "complex",
        titleEn: "Complex multiply",
        titleAr: "ضرب مركب",
        explanationEn:
          "Multiply complex numbers in polar form: multiply lengths (radii) and add angles. On the plane, rotation and scaling combine — that is why AC circuits and waves love complex numbers.",
        explanationAr:
          "ضرب الأعداد المركبة بالقطبيات: اضرب المقدارين وأجمع الزاويتين. في المستوى يدمج الدوران والتكبير — لذلك تُستخدم كثيرًا في التيار المتردد والموجات.",
        Component: ComplexMultiplySim,
      },
    ],
  },
  {
    slug: "trigonometry",
    path: "/mathematics/trigonometry",
    title: "Trigonometry & Harmonics",
    titleAr: "المثلثات والتوافقيات",
    icon: Triangle,
    color: "text-indigo-400",
    border: "border-indigo-400/30",
    description: "Unit circle projections, interference, and Fourier building blocks.",
    descriptionAr: "إسقاطات دائرة الوحدة، التداخل، ومكوّنات فورييه.",
    details: "Read sin/cos/tan live from θ; sculpt beats with phase; watch a square wave emerge from odd harmonics.",
    detailsAr: "اقرأ sin/cos/tan من θ مباشرة؛ شكّل النبضات بالطور؛ شاهد موجة مربعة تتكوّن من توافقيات فردية.",
    experiments: [
      {
        id: "unit",
        titleEn: "Unit circle",
        titleAr: "دائرة الوحدة",
        explanationEn:
          "On the unit circle, cos θ is the x-coordinate and sin θ is the y-coordinate of a point at angle θ. tan θ is rise/run — watch how signs flip in each quadrant.",
        explanationAr:
          "في دائرة الوحدة، cos θ هو الإحداثي x و sin θ هو y لنقطة بزاوية θ. tan θ = sin/cos — لاحظ تغير الإشارة في كل ربع.",
        Component: UnitCircleSim,
      },
      {
        id: "waves",
        titleEn: "Wave superposition",
        titleAr: "تراكب موجي",
        explanationEn:
          "When waves add, peaks can reinforce (constructive) or cancel (destructive). Changing phase shifts one wave sideways — that is how interference patterns form.",
        explanationAr:
          "عند جمع الموجات قد تتعزز القمم أو تلغي بعضها. تغيير الطور يزحزح موجة — هكذا تتشكل أنماط التداخل.",
        Component: WaveSuperpositionSim,
      },
      {
        id: "fourier",
        titleEn: "Fourier square wave",
        titleAr: "فورييه — موجة مربعة",
        explanationEn:
          "A square wave can be built from sine waves at odd harmonics (3×, 5×, … frequencies). More terms make the edges sharper — the idea behind Fourier series in music and signal processing.",
        explanationAr:
          "الموجة المربعة تُبنى من جيبيات بترددات فردية (3، 5، …). كلما زدت الحدود صارت الحواف أوضح — فكرة متسلسلات فورييه في الصوت والإشارات.",
        Component: FourierSquareSim,
      },
      {
        id: "lissajous",
        titleEn: "Lissajous curves",
        titleAr: "منحنيات ليساجو",
        explanationEn:
          "Plot x = sin(a t) vs y = sin(b t + phase): you get looping patterns. Different frequency ratios a:b make different knots — used in oscilloscopes to compare signals.",
        explanationAr:
          "ارسم x = sin(a t) مقابل y = sin(b t + طور) فتحصل على أشكال مغلقة. نسب a:b مختلفة تعطي أنماطًا — تُستخدم لمقارنة الإشارات.",
        Component: LissajousSim,
      },
    ],
  },
  {
    slug: "geometry",
    path: "/mathematics/geometry",
    title: "Geometry & Fractals",
    titleAr: "الهندسة والكسوريات",
    icon: Hexagon,
    color: "text-purple-400",
    border: "border-purple-400/30",
    description: "Linear maps, Bézier curves, and the Mandelbrot boundary in the complex plane.",
    descriptionAr: "التطبيقات الخطية، منحنيات بيزيير، وحدود ماندلبرو في المستوى المركب.",
    details: "Determinant equals area scale; drag Bézier handles; zoom the Mandelbrot set with iteration depth.",
    detailsAr: "المحدد يعادل مقياس المساس؛ اسحب نقاط بيزيير؛ كبّر مجموعة ماندلبرو مع عمق التكرار.",
    experiments: [
      {
        id: "matrix",
        titleEn: "2×2 linear map",
        titleAr: "تطبيق خطي 2×2",
        explanationEn:
          "A 2×2 matrix moves the whole plane: it can scale, rotate, shear, or flip. The determinant measures how much area stretches; |det|=1 often means rotation or reflection.",
        explanationAr:
          "مصفوفة 2×2 تحرك المستوى: تكبير، دوران، قص، أو انعكاس. المحدد يقيس تغير المساحة؛ |det|=1 غالبًا دوران أو انعكاس.",
        Component: LinearTransform2DSim,
      },
      {
        id: "bezier",
        titleEn: "Cubic Bézier",
        titleAr: "بيزيير مكعب",
        explanationEn:
          "A Bézier curve is pulled by control points: the endpoints are fixed, the middle points bend the path smoothly. Font outlines and vector art use cubics everywhere.",
        explanationAr:
          "منحنى بيزيير يُسحب بنقاط تحكم: الطرفان ثابتان والوسط يثني المسار بسلاسة. الخطوط والرسوم المتجهة تعتمد عليه.",
        Component: BezierCurveSim,
      },
      {
        id: "mandelbrot",
        titleEn: "Mandelbrot set",
        titleAr: "مجموعة ماندلبرو",
        explanationEn:
          "Pick a complex number c and iterate z → z² + c from z=0. If z stays bounded, c is in the Mandelbrot set. The boundary is infinitely detailed — a famous fractal.",
        explanationAr:
          "اختر c مركبًا وكرّر z → z² + c من z=0. إن بقي z محدودًا فـ c داخل المجموعة. الحد كسوري لانهائي التفاصيل.",
        Component: MandelbrotSim,
      },
      {
        id: "julia",
        titleEn: "Julia set",
        titleAr: "مجموعة جوليا",
        explanationEn:
          "Fix c and iterate z → z² + c starting from each pixel z. Points that blow up vs stay bounded draw a Julia set — twin beauty to the Mandelbrot set.",
        explanationAr:
          "ثبّت c وكرّر z → z² + c من كل بكسل. النقاط التي تنفجر مقابل المحدودة ترسم مجموعة جوليا — توأم ماندلبرو.",
        Component: JuliaSetSim,
      },
      {
        id: "vectors",
        titleEn: "Vector addition",
        titleAr: "جمع المتجهات",
        explanationEn:
          "Add vectors tip-to-tail: the sum closes the triangle (or parallelogram). This is how forces, velocities, and displacements combine in physics.",
        explanationAr:
          "اجمع المتجهات من الرأس للذيل: المجموع يغلق المثلث أو المعين. هكذا تُجمع القوى والسرعات والإزاحات.",
        Component: VectorAddSim,
      },
      {
        id: "dot",
        titleEn: "Dot product & angle",
        titleAr: "الجداء السلمي والزاوية",
        explanationEn:
          "The dot product multiplies matching components and adds them. It equals |a||b|cos θ, so it measures alignment: zero means perpendicular.",
        explanationAr:
          "الجداء السلمي يضرب المركبات المقابلة ويجمعها. يساوي |a||b|cos θ فيقيس التوافق: صفر يعني تعامدًا.",
        Component: DotProductSim,
      },
    ],
  },
  {
    slug: "statistics",
    path: "/mathematics/statistics",
    title: "Probability & Statistics",
    titleAr: "الاحتمال والإحصاء",
    icon: BarChart3,
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    description: "Gaussian law and binomial sampling with exact means and variances.",
    descriptionAr: "التوزيع الطبيعي وعيّنات ثنائية مع وسط وتباين دقيقين.",
    details: "Shade the 68% band; resample Bernoulli trials and watch the histogram track Binomial(n,p).",
    detailsAr: "ظلّل نطاق 68٪؛ أعد محاكاة تجارب بيرنولي وشاهد الأعمدة تقترب من ثنائي الحدين.",
    experiments: [
      {
        id: "normal",
        titleEn: "Normal PDF",
        titleAr: "كثافة نورمال",
        explanationEn:
          "The bell curve (Gaussian) describes many natural averages. μ is the center; σ is the spread. About 68% of mass lies within one σ of μ — the empirical rule.",
        explanationAr:
          "المنحنى الجرسي يصف كثيرًا من المتوسطات الطبيعية. μ المركز وσ الانتشار. حوالي 68٪ من الكتلة ضمن σ واحدة من μ.",
        Component: NormalDistributionSim,
      },
      {
        id: "binomial",
        titleEn: "Binomial sampler",
        titleAr: "مولّد ثنائي الحدين",
        explanationEn:
          "Repeat n yes/no trials with success probability p. The count of successes follows a Binomial(n,p) distribution — mean np, variance np(1−p). Watch the histogram match theory.",
        explanationAr:
          "كرّر n تجربة نعم/لا باحتمال نجاح p. عدد النجاحات يتبع ثنائي الحدين — الوسط np والتباين np(1−p). راقب التطابق مع النظرية.",
        Component: BinomialGaltonSim,
      },
      {
        id: "mcpi",
        titleEn: "Monte Carlo π",
        titleAr: "تقدير π مونت كارلو",
        explanationEn:
          "Throw random darts in a square around a quarter circle. The fraction inside the curve estimates π/4, because area ratio is (πr²/4)/r². More points → tighter estimate.",
        explanationAr:
          "نقاط عشوائية في مربع حول ربع دائرة. نسبة النقاط داخل المنحنى تقدّر π/4 لأن نسبة المساحات (πr²/4)/r². المزيد من النقاط يحسّن التقدير.",
        Component: MonteCarloPiSim,
      },
    ],
  },
  {
    slug: "dynamics",
    path: "/mathematics/dynamics",
    title: "Dynamics & Sequences",
    titleAr: "الديناميكيات والمتتاليات",
    icon: Infinity,
    color: "text-pink-400",
    border: "border-pink-400/30",
    description: "Logistic chaos and Fibonacci geometry — discrete models with real parameters.",
    descriptionAr: "فوضى لوجستية وهندسة فيبوناتشي — نماذج متقطعة بمعاملات حقيقية.",
    details: "Sweep the logistic parameter r for periodic windows and chaos; grow Fibonacci squares and their quarter-circle spiral.",
    detailsAr: "مرّر معامل r اللوجستي لنوافذ دورية وفوضى؛ كبّر مربعات فيبوناتشي والربع دائرة للحلزون.",
    experiments: [
      {
        id: "logistic",
        titleEn: "Logistic map",
        titleAr: "الخريطة اللوجستية",
        explanationEn:
          "x_next = r x (1−x) models population growth with a cap. Small r settles to one value; larger r can oscillate or show chaos — simple rule, rich behavior.",
        explanationAr:
          "x_next = r x (1−x) نمو سكان بسقف. r صغير يستقر؛ r أكبر قد يتذبذب أو يفوض — قاعدة بسيطة وسلوك غني.",
        Component: LogisticMapSim,
      },
      {
        id: "fib",
        titleEn: "Fibonacci spiral",
        titleAr: "حلزون فيبوناتشي",
        explanationEn:
          "Fibonacci adds the last two numbers: 1,1,2,3,5,8,… Squares with those side lengths tile a spiral often seen in nature — an approximation, not a law of biology.",
        explanationAr:
          "فيبوناتشي يجمع آخر رقمين: 1،1،2،3،5،8،… مربعات بأضلاع هذه الأطوال تبني حلزونًا شائعًا في الطبيعة — تقريب وليس قانونًا حتميًا.",
        Component: FibonacciSpiralSim,
      },
      {
        id: "lotka",
        titleEn: "Lotka–Volterra",
        titleAr: "لوطكا–فولتيرا",
        explanationEn:
          "Predators and prey feed each other in a loop: more prey helps predators grow; more predators shrink prey. Parameters create cycles — a toy model of ecosystems.",
        explanationAr:
          "فرائس ومفترسات في حلقة: فرائس أكثر ترفع المفترسات، مفترسات أكثر تخفض الفرائس. المعاملات تولّد دورات — نموذج مبسط للنظم البيئية.",
        Component: LotkaVolterraSim,
      },
    ],
  },
];

export function getMathBranchBySlug(slug: string | undefined): MathBranch | undefined {
  if (!slug) return undefined;
  return mathBranches.find((b) => b.slug === slug);
}
