import { CreditCard, LayoutDashboard, Receipt, Upload,Files } from "lucide-react";

export const featureList  = [
  {
    iconName: "CreditCard",
    iconColor: "text-orange-500",
    title: "Secure Payments",
    description: "Handle transactions safely with advanced encryption."
  },
  {
    iconName: "FileText",
    iconColor: "text-indigo-500",
    title: "File management",
    description: "Organise, preview, and manage your files with ease."
  },
  {
    iconName: "Clock",
    iconColor: "text-indigo-500",
    title: "Transaction History",
    description: "Keep track of all your transactions and file activities."
  },
  {
    iconName: "Share2",
    iconColor: "text-green-500",
    title: "Easy Sharing",
    description: "Share files and data with your team effortlessly."
  },
  {
    iconName: "Shield",
    iconColor: "text-green-500",
    title: "Secure Storage",
    description: "Keep your files protected with enterprise-grade security."
  },
  {
    iconName: "ArrowUpCircle",
    iconColor: "text-purple-500",
    title: "Easy file Upload",
    description: "Upload files fast using our intuitive drag-and-drop interface."
  }
];

 export const pricingPlans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for individuals getting started.",
    features: [
      "50 file uploads",
      "Basic file upload",
      "7-day file retention",
      "Email support"
      
      
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Premium",
    price: "500",
    
    description: "For individuals with larger needs.",
    features: [
      "500 file uploads",
      "Advanced file sharing",
      "30 day file retention",
      "Advanced security",
      "Priority support"
    ],
    cta: "Go Premium",
    highlighted: true
  },
  {
    name: "Ultimate",
    price: "2500",
    description: "Best for teams and businesses.",
    features: [
     "5000 file uploads",
      "Unlimited storage",
      "Enterprise-grade security",
      "Team collaboration tools",
      "24/7 dedicated support"
    ],
    cta: "Get Ultimate",
    highlighted: false
  }
];


export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechFlow",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    tagline: "Fast, secure, and effortless file management.",
    quote:
      "This platform completely changed how our team manages files. Uploads are fast, secure, and incredibly easy to use."
  },
  {
    name: "Daniel Lee",
    role: "Startup Founder",
    company: "CloudNest",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    tagline: "Perfect balance of price and performance.",
    quote:
      "The pricing is fair and the features are powerful. File sharing and collaboration have never been this smooth."
  },
  {
    name: "Emily Carter",
    role: "UX Designer",
    company: "Designify",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    tagline: "Beautiful design with powerful features.",
    quote:
      "I love the clean interface and drag-and-drop uploads. It saves me so much time every day."
  }
];

export const SIDE_MENU_DATA =[
  {
    id:"01",
    label:"Dashboard",
    icon:LayoutDashboard,
    path:"/dashboard",
  },
  {
    id:"02",
    label:"Upload",
    icon:Upload,
    path:"/upload",
  },
  {
    id:"03",
    label:"My Files",
    icon:Files,
    path:"/my-files",
  },
  {
    id:"04",
    label:"Subscriptions",
    icon:CreditCard,
    path:"/subscriptions",
  },
  {
    id:"05", 
    label:"Transactions",
    icon:Receipt,
    path:"/transactions",
  }
];      