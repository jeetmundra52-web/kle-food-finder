import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Store, User, TrendingUp, Utensils, ChevronRight, ShieldCheck, Zap, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Outlet {
  _id: string;
  name: string;
  description: string;
  banner?: string;
  image?: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  category: string;
}

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [featuredOutlets, setFeaturedOutlets] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedOutlets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/outlets');
        const data = await response.json();

        // Sort by rating and take top 3
        const topOutlets = data
          .sort((a: Outlet, b: Outlet) => b.rating - a.rating)
          .slice(0, 3);

        setFeaturedOutlets(topOutlets);
      } catch (error) {
        console.error('Failed to fetch outlets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedOutlets();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 overflow-x-hidden relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/landing-bg-v3.png')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Navbar - Glassmorphism & Blur */}
      <header className="sticky top-0 z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-lg border-b border-white/30 shadow-sm" />
        <div className="container mx-auto px-6 h-20 flex items-center justify-between relative z-10 max-w-6xl">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none group-hover:text-primary transition-colors">The Hub</h1>
              <p className="text-[11px] text-gray-600 font-medium uppercase tracking-widest mt-0.5">KLE Campus</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-gray-800 hover:text-primary hover:bg-white/50 font-medium hidden sm:flex transition-colors" onClick={scrollToAbout}>About</Button>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="text-gray-800 hover:text-primary hover:bg-white/50 font-medium transition-colors outlets-nav-link"
                onClick={() => navigate('/student/outlets')}
              >
                Outlets
              </Button>
            ) : (
              <Button className="bg-gray-900 hover:bg-black text-white shadow-xl shadow-black/10 rounded-full px-6 py-5 font-semibold transition-all hover:scale-105 active:scale-95" onClick={() => navigate('/auth/login')}>
                Get Started
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-12 pb-20 max-w-5xl">

        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16 animate-fade-in-up relative">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold text-gray-700 tracking-wide uppercase">#1 Food App on Campus</span>
          </div>

          {/* Headlines */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg">
              Campus Cravings, <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent relative">
                Delivered Fast.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              Skip the line, order and dine.
            </p>
          </div>
        </div>

        {/* Role Cards - Zomato Style */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 relative z-10">
          {/* Student Card */}
          <Card
            className="group relative overflow-hidden border border-white/50 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
            onClick={() => navigate("/auth/login")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <User className="h-9 w-9 text-orange-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Student</h3>
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <p className="text-gray-600 font-medium leading-snug">
                  Order food, track delivery & rate items.
                </p>
                <span className="inline-block text-sm font-semibold text-orange-600 border-b border-orange-200 pb-0.5 group-hover:border-orange-600 transition-colors">
                  Start Ordering
                </span>
              </div>
            </div>
          </Card>

          {/* Vendor Card */}
          <Card
            className="group relative overflow-hidden border border-white/50 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
            onClick={() => navigate("/vendor/login")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <Store className="h-9 w-9 text-teal-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">Vendor</h3>
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
                <p className="text-gray-600 font-medium leading-snug">
                  Manage menu, orders & earnings.
                </p>
                <span className="inline-block text-sm font-semibold text-teal-600 border-b border-teal-200 pb-0.5 group-hover:border-teal-600 transition-colors">
                  Vendor Login
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Bar - Floating & Elevated */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200/50">

            <div className="flex items-center gap-4 px-6 w-full md:w-auto justify-center md:justify-start group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors flex-shrink-0">
                <Store className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 leading-tight">7+ Shops</p>
                <p className="text-xs text-gray-600 font-medium leading-tight">Variety of cuisines</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 w-full md:w-auto justify-center md:justify-start group">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors flex-shrink-0">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 leading-tight">Fast Pickup</p>
                <p className="text-xs text-gray-600 font-medium leading-tight">Skip the lines</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 w-full md:w-auto justify-center md:justify-start group">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 leading-tight">Live Offers</p>
                <p className="text-xs text-gray-600 font-medium leading-tight">Daily discounts</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 w-full md:w-auto justify-center md:justify-start group">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 leading-tight">100% Secure</p>
                <p className="text-xs text-gray-600 font-medium leading-tight">Campus verified</p>
              </div>
            </div>

          </div>
        </div>

        {/* Featured Outlets Preview */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white drop-shadow-sm">Featured Outlets</h2>
            <Button variant="link" className="text-orange-600 font-semibold hover:text-orange-700" onClick={() => navigate('/auth/login')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border border-white/50 shadow-lg bg-white/60 backdrop-blur-xl rounded-2xl animate-pulse">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-100"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </Card>
              ))
            ) : featuredOutlets.length > 0 ? (
              // Real outlets
              featuredOutlets.map((outlet) => {
                let imageUrl = outlet.banner || outlet.image;
                const specializedOutlets = [
                  'Doughpaze', 'Ethnic Flavours', 'Spice Story', 'Chow King', 'Gapa Gup',
                  'Chai Paani', 'Wow Franky, Wraps and Sandwich', 'Crazy Corn Juice and Snacks',
                  'The Bake Hub', 'Leafy Life: Fresh and Healthy Bowls'
                ];

                if (outlet.name === 'Doughpaze') imageUrl = '/doughpaze-logo.png';
                if (outlet.name === 'Ethnic Flavours') imageUrl = '/ethnic-flavours-logo.png';
                if (outlet.name === 'Spice Story') imageUrl = '/spice-story-logo.png';
                if (outlet.name === 'Chow King') imageUrl = '/chow-king-logo.png';
                if (outlet.name === 'Gapa Gup') imageUrl = '/gapa-gup-logo.png';
                if (outlet.name === 'Chai Paani') imageUrl = '/chai-paani-logo.png';
                if (outlet.name === 'Wow Franky, Wraps and Sandwich') imageUrl = '/wow-franky-logo.png';
                if (outlet.name === 'Crazy Corn Juice and Snacks') imageUrl = '/crazy-corn-logo.png';
                if (outlet.name === 'The Bake Hub') imageUrl = '/the-bake-hub-logo.png';
                if (outlet.name === 'Leafy Life: Fresh and Healthy Bowls') imageUrl = '/leafy-life-logo.png';

                return (
                  <Card
                    key={outlet._id}
                    className="group overflow-hidden border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-[#fefefe] rounded-[2.5rem] cursor-pointer hover:-translate-y-1.5"
                    onClick={() => navigate('/auth/login')}
                  >
                    <div className="h-44 bg-[#f8fafc] subtle-noise relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={outlet.name}
                          className={`w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${specializedOutlets.includes(outlet.name)
                            ? 'object-contain p-0 scale-150 group-hover:scale-[1.65]'
                            : 'object-cover group-hover:scale-110'
                            }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100/50">
                          <Store className="w-14 h-14 text-orange-200" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-5 bg-white/40 backdrop-blur-sm">
                      <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors mb-2 truncate tracking-tight">{outlet.name}</h3>
                      <p className="text-sm text-gray-500/90 font-medium mb-4 line-clamp-1">{outlet.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-[#f0fdf4] px-2.5 py-0.5 rounded-full border border-[#dcfce7]">
                          <span className="text-[11px] font-black text-[#166534]">{outlet.rating}</span>
                          <Star className="w-3 h-3 fill-[#166534] text-[#166534]" />
                        </div>
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{outlet.deliveryTime}</span>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              // Fallback if no outlets
              [1, 2, 3].map((i) => (
                <Card key={i} className="group overflow-hidden border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-xl rounded-2xl cursor-pointer" onClick={() => navigate('/auth/login')}>
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-50 relative overflow-hidden flex items-center justify-center">
                    <Store className="w-16 h-16 text-orange-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Campus Outlet {i}</h3>
                    <p className="text-sm text-gray-600 mb-3">Delicious food available now.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">4.{i} ★</span>
                      <span className="text-xs text-gray-500">20 min</span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="max-w-5xl mx-auto mt-24 mb-16 scroll-mt-24">
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold tracking-wide uppercase">
                  Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                  Revolutionizing <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">Campus Dining</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The Hub was built with a simple mission: to make campus dining smarter, faster, and more enjoyable for everyone at KLE.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We connect students directly with campus outlets, enabling seamless ordering, real-time tracking, and verified reviews. No more long queues or uncertainty—just great food delivered to your fingertips.
                </p>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/landing-bg-v3.png"
                    alt="Campus dining experience"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs -rotate-3 hover:rotate-0 transition-transform duration-500 hidden md:block">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">Join 2000+ Students</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">"The Hub has completely changed how I grab lunch between classes!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Landing;

