import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Atom, Rocket, ArrowRight, Leaf, Mountain } from "lucide-react";

const labs = [
  { 
    path: "/chemistry", 
    title: "Chemistry Lab", 
    description: "Periodic table, reactions, compounds, calculators",
    icon: Atom,
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30"
  },
  { 
    path: "/physics", 
    title: "Physics Lab", 
    description: "Mechanics, electromagnetism, thermodynamics, waves",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30"
  },
  { 
    path: "/biology", 
    title: "Biology Lab", 
    description: "Cell biology, genetics, ecology, human anatomy",
    icon: Leaf,
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/30"
  },
  { 
    path: "/earth-science", 
    title: "Earth Science", 
    description: "Geology, plate tectonics, weather, volcanoes",
    icon: Mountain,
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/30"
  },
];

export default function LabsPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-14 min-h-screen w-full">
      <div className="w-full px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🧪 Science Labs
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore interactive simulations, 3D models, and calculators across all branches of science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {labs.map((lab, index) => (
            <motion.div
              key={lab.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={lab.path}
                className={`block glass rounded-2xl p-6 border ${lab.borderColor} hover:border-opacity-60 transition-all hover:scale-[1.02] group`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lab.color} flex items-center justify-center mb-4`}>
                  <lab.icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {lab.title}
                </h2>
                <p className="text-gray-400 mb-4">{lab.description}</p>
                <div className="flex items-center text-cyan-400 font-medium">
                  Enter Lab <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
