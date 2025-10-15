import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Pill, Activity, Wind, Shield, Sparkles, Moon } from "lucide-react";

const products = [
  {
    icon: Heart,
    category: "Cardiovascular",
    name: "CardioHealth Plus",
    description: "Advanced formulation for heart health and blood pressure management with proven results",
    badge: "Best Seller",
    color: "from-red-500 to-pink-600",
    gradient: "group-hover:shadow-red-500/20",
  },
  {
    icon: Brain,
    category: "Neurological",
    name: "NeuroVital",
    description: "Cognitive support and neurological wellness supplement for mental clarity",
    badge: "New",
    color: "from-purple-500 to-indigo-600",
    gradient: "group-hover:shadow-purple-500/20",
  },
  {
    icon: Pill,
    category: "Pain Management",
    name: "PainRelief Pro",
    description: "Fast-acting pain relief with extended release technology for lasting comfort",
    badge: "FDA Approved",
    color: "from-blue-500 to-cyan-600",
    gradient: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Activity,
    category: "Metabolic Health",
    name: "MetaboBalance",
    description: "Comprehensive metabolic support for diabetes and weight management",
    badge: "Trusted",
    color: "from-green-500 to-emerald-600",
    gradient: "group-hover:shadow-green-500/20",
  },
  {
    icon: Wind,
    category: "Respiratory",
    name: "RespiClear",
    description: "Advanced respiratory support for asthma and COPD management",
    badge: "Clinically Proven",
    color: "from-teal-500 to-blue-600",
    gradient: "group-hover:shadow-teal-500/20",
  },
  {
    icon: Shield,
    category: "Immune Support",
    name: "ImmunoBoost",
    description: "Strengthen your immune system with natural ingredients and antioxidants",
    badge: "Popular",
    color: "from-orange-500 to-amber-600",
    gradient: "group-hover:shadow-orange-500/20",
  },
  {
    icon: Sparkles,
    category: "Digestive Health",
    name: "DigestiCare",
    description: "Probiotic formula for optimal digestive wellness and gut health",
    badge: "New Formula",
    color: "from-yellow-500 to-orange-600",
    gradient: "group-hover:shadow-yellow-500/20",
  },
  {
    icon: Moon,
    category: "Sleep Support",
    name: "SleepWell Plus",
    description: "Natural sleep aid for restful nights and better recovery without dependency",
    badge: "Top Rated",
    color: "from-indigo-500 to-purple-600",
    gradient: "group-hover:shadow-indigo-500/20",
  },
];

const Products = () => {
  return (
    <section id="products" className="py-6 bg-gray-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-block mb-4">
            <Badge className="bg-blue-50 text-blue-600 border border-blue-200 px-6 py-2 text-sm font-medium">
              🧬 Our Products
            </Badge>
          </div>
        </div>

        {/* Products Grid - Equalized Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card 
                key={index} 
                className={`group bg-white border border-gray-200 transition-all duration-300 ${product.gradient}`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className="bg-gray-50 text-gray-600 border border-gray-200 text-xs px-3 py-1">
                      {product.badge}
                    </Badge>
                  </div>
                  
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {product.category}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 px-8 py-6 text-base font-semibold"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-base font-semibold"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;