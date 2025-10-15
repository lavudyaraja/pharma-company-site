import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Users, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      detail: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Our team will respond soon",
      detail: "info@pharma.com",
      link: "mailto:info@pharma.com",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello",
      detail: "123 Pharma Street, NY 10001",
      link: "#",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="contact" className="py-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-blue-50 text-blue-600 border border-blue-200 px-6 py-2 text-sm font-medium mb-6">
            💬 Get In Touch
          </Badge>
        </div>

        {/* Main Content - Asymmetric Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Contact Methods (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{method.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                        <a 
                          href={method.link}
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          {method.detail}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-gray-700" />
                  <h4 className="font-semibold text-gray-900">Business Hours</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form (3 columns) */}
          <div className="lg:col-span-3">
            <Card className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h3>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="h-12 border border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="h-12 border border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="h-12 border border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="h-12 border border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="border border-gray-200 focus:border-blue-500 rounded-xl resize-none transition-all duration-300"
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      required
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:underline font-medium">privacy policy</a> and <a href="#" className="text-blue-600 hover:underline font-medium">terms of service</a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 text-base font-semibold group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gray-900 border-0 rounded-2xl overflow-hidden transition-all duration-300">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need immediate assistance?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our customer support team is available 24/7 to help you with any urgent inquiries or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-base font-semibold rounded-xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +1 (555) 123-4567
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border border-gray-700 text-white hover:bg-gray-800 transition-all duration-300 px-8 py-6 text-base font-semibold rounded-xl"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;