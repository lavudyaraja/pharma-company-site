import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Pill } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    {
      name: "Products",
      href: "/#products",
      dropdown: [
        { name: "Prescription Medicines", href: "#prescription" },
        { name: "OTC Products", href: "#otc" },
        { name: "Supplements", href: "#supplements" },
        { name: "Medical Devices", href: "#devices" },
      ],
    },
    {
      name: "Services",
      href: "/#services",
      dropdown: [
        { name: "Clinical Research", href: "#research" },
        { name: "Drug Manufacturing", href: "#manufacturing" },
        { name: "Quality Assurance", href: "#qa" },
        { name: "Regulatory Affairs", href: "#regulatory" },
      ],
    },
    { name: "Research", href: "/#research" },
    { name: "Contact", href: "/#contact" },
    { name: "Tablets", href: "/tablets" },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Phone size={14} />
                <span className="hidden sm:inline">+1 (234) 567-890</span>
              </a>
              <a href="mailto:info@yourpharma.com" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Mail size={14} />
                <span className="hidden md:inline">info@yourpharma.com</span>
              </a>
              <div className="flex items-center gap-2 text-cyan-200">
                <MapPin size={14} />
                <span className="hidden lg:inline">FDA Approved Facility</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-cyan-200 text-xs">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg mt-0"
            : "bg-white/90 backdrop-blur-md shadow-md mt-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <Pill className="text-white" size={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                  YourPharma
                </span>
                <span className="text-xs text-gray-500 font-medium">Healthcare Excellence</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <>
                      <a
                        href={item.href}
                        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                      >
                        {item.name}
                        {item.dropdown && (
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        )}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                      </a>

                      {/* Dropdown Menu */}
                      {item.dropdown && activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 transition-all"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Request Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 space-y-2 border-t border-gray-100 animate-in slide-in-from-top duration-300">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <a
                        href={item.href}
                        className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 rounded-lg transition-all font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.name ? null : item.name);
                        }}
                      >
                        {item.name}
                        {item.dropdown && (
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </a>
                      {item.dropdown && activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 rounded-lg transition-all font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="px-4 space-y-2">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg shadow-lg">
                  Request Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className={scrolled ? "h-20" : "h-32"}></div>
    </>
  );
};

export default Navbar;