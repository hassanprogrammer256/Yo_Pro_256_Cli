import {Home,Info,Code,People,School, Security, CameraAlt, Computer, GitHub, WhatsApp, LinkedIn, Wifi, Apps, NetworkWifi, Build, DesignServices} from '@mui/icons-material';
import { FaCode, FaHtml5, FaJs, FaPython, FaQuestionCircle, FaReact, FaUser, FaVideo, FaWhatsapp } from 'react-icons/fa';
import { SiDjango, SiReact, SiTypescript,SiPostgresql,SiGithub, SiTailwindcss, SiDocker, SiRedux, SiPython, SiSqlite} from 'react-icons/si'

export const SMART_AGENTS_EMAIL = import.meta.env.VITE_SMART_AGENTS_EMAIL || ""
export const HP_256_WHATSAPP_NO = import.meta.env.VITE_HP_256_WHATSAPP_NO || "256790233774"
export const SMART_AGENTS_GROUP_INVITE_LINK = import.meta.env.VITE_SMART_AGENTS_GROUP_INVITE_LINK || ""
export const HP_256_WHATSAPP_LINK = import.meta.env.VITE_HP_256_WHATSAPP_LINK || ""
export const HP_256_LINKEDIN_LINK = import.meta.env.VITE_HP_256_LINKEDIN_LINK || ""
export const HP_256_GITHUB_LINK = import.meta.env.VITE_HP_256_GITHUB_LINK || ""
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ""
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ""
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
export const EMAILJS_TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL || ""
export const BASE_API_URL= import.meta.env.VITE_API_URL || "http://localhost:8000/api/"

export const menuItems = [
    {
      title: 'Home',
      icon: Home,
      path: '/',
      subItems: [],
    },
    {
      title: 'About',
      icon: Info ,
      path: '/about',
      subItems: [
        { title: 'Our Story', path: '/about/story' },
        { title: 'Team', path: '/about/team' },
        { title: 'Mission & Vision', path: '/about/mission' },
      ],
    },
    {
      title: 'Services',
      icon: Info ,
      path: '/services',
      subItems: [
        { title: 'Graphics', path: '/services/graphics' },
        { title: 'Web Development', path: '/services/web' },
        { title: 'Networks', path: '/services/networks' },
        { title: 'Others', path: '/services' },
      ],
    },
    {
      title: 'Projects',
      icon: Code ,
      path: '/projects',
      subItems: [
        { title: 'Web Development', path: '/projects/web' },
        { title: 'Mobile Apps', path: '/projects/mobile' },
        { title: 'DevOps', path: '/projects/devops' },
        { title: 'AI/ML', path: '/projects/ai' },
      ],
    },
    {
      title: 'Community',
      icon: People ,
      path: '/community',
      subItems: [
        { title: 'Events', path: '/community/events' },
        { title: 'Forums', path: '/community/forums' },
        { title: 'Blog', path: '/community/blog' },
        { title: 'Partners', path: '/community/partners' },
      ],
    },
    {
      title: 'Courses',
      icon: School,
      path: '/courses',
      subItems: [
        { title: 'All Courses', path: '/courses/all' },
        { title: 'Web Development', path: '/courses/web-dev' },
        { title: 'Mobile Development', path: '/courses/mobile-dev' },
        { title: 'DevOps Engineering', path: '/courses/devops' },
        { title: 'Graphics Designing', path: '/courses/graphics' },
      ],
    },
    {
      title: 'Sign In',
      icon: FaUser,
      path: '/auth',
      subItems: [
        // { title: 'Sign Up', path: '/auth' },
        // { title: 'Web Development', path: '/courses/web-dev' },
        // { title: 'Mobile Development', path: '/courses/mobile-dev' },
        // { title: 'DevOps Engineering', path: '/courses/devops' },
        // { title: 'Graphics Designing', path: '/courses/graphics' },
      ],
    },
  ];

export const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

export const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };


export const roles = [
    'Full Stack Developer',
    'DevOps Engineer',
    'Software Developer',
    'Python Programmer',
  ];


  export const instructors = [
    {
      name: 'Kyeswa Hassan',
      title: 'Full Stack Engineer & DevOps Engineer',
      bio: 'Passionate about teaching and building scalable solutions. Over 5 years of experience in software development.',
      image: '/images/instructors/hp256.png',
      expertise: ['Python', 'TypeScript', 'React', 'Docker'],
    },
    // {
    //   name: 'Irumba Hannan',
    //   title: 'Senior Software Engineer & AI Specialist',
    //   bio: 'Expert in AI/ML and cloud architecture. Dedicated to mentoring the next generation of developers.',
    //   image: '/images/instructors/hannan1.png',
    //   expertise: ['AI/ML', 'Python', 'TensorFlow', 'Azure'],
    // },
    {
      name: 'Lagwe Yokosan',
      title: 'Senior Software Engineer & AI Specialist',
      bio: 'Expert in AI/ML and cloud architecture. Dedicated to mentoring the next generation of developers.',
      image: '/images/instructors/ysan1.png',
      expertise: ['AI/ML', 'Python', 'TensorFlow', 'Azure'],
    },
  ];

export const hero_services = [
    {
      icon: Computer,
      title: 'Web Development',
      description: 'Full-stack web applications using modern technologies',
      color: '#ff0000',
    },
    {
      icon: CameraAlt,
      title: 'Graphic Designing',
      description: 'Cross-platform mobile apps for iOS and Android',
      color: '#ff6b00',
    },
    {
      icon: Wifi,
      title: 'Cloud Solutions',
      description: 'Scalable cloud architecture and DevOps practices',
      color: '#ffb400',
    },
    {
      icon: Security,
      title: 'Cybersecurity',
      description: 'Secure coding practices and system protection',
      color: '#ff3366',
    },
  ];

export const hero_courses = [
    {
      title: 'Full Stack Web Development',
      description: 'Master modern web development with React, Node.js, and MongoDB. Build real-world applications.',
      thumbnail: '/images/courses/full_stack_web_dev.jpg',
      level: 'Beginner to Advanced',
      duration: '12 Weeks',
    },
    {
      title: 'DevOps Engineering',
      description: 'Learn CI/CD, Docker, Kubernetes, and cloud deployment strategies for modern applications.',
      thumbnail: '/images/courses/dev_ops_engineering.jpg',
      level: 'Intermediate',
      duration: '8 Weeks',
    },
    {
      title: 'Python Programming Mastery',
      description: 'From basics to advanced Python, including data science, automation, and API development.',
      thumbnail: '/images/courses/python_programming.jpg',
      level: 'All Levels',
      duration: '10 Weeks',
    },
  ];

  export const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '100+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '30+', label: 'Courses Created' },
  ];
  export const contacts = [
    {name: 'Github',icon:GitHub,href:HP_256_GITHUB_LINK},
    {name: 'linkedin',icon:LinkedIn,href:HP_256_LINKEDIN_LINK},
    {name: 'WhatsApp',icon:WhatsApp,href:HP_256_WHATSAPP_LINK}
   
  ]

export const personalInfo = {
    fullName: 'Kyeswa Hassan',
    title: 'Full Stack Engineer & DevOps Expert',
    email: 'hassanprogrammer256@gmail.com',
    phone: '+256 790 233 774',
    location: 'Kampala, Uganda',
    languages: ['English', 'Luganda', 'Swahili'],
  };

export const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Islamic University in Uganda (IUIU)',
      year: '2023 - 2026',
      description: 'Specialized in Software Engineering and Systems Architecture',
    },
    {
      degree: 'Full Stack Web Development Certification',
      institution: 'Free Code Camp',
      year: '2020',
      description: 'Completed and Certified in Full Stack Web Development',
    },
    // {
    //   degree: 'DevOps Engineering Certification',
    //   institution: 'Google Cloud',
    //   year: '2021',
    //   description: 'Professional Cloud DevOps Engineer Certification',
    // },
  ];

export const experience = [
    {
      title: 'Senior Developer',
      company: 'Smart Agents IT Solutions',
      year: '2020 - Present',
      description: 'Leading a team of developers in building cutting-edge software solutions, providing tech education, and consulting services.',
    },
    {
      title: 'Senior Full Stack Engineer',
      company: 'Minify Gadgets',
      year: '2019 - 2020',
      description: 'Developed and maintained large-scale web applications using React, Node.js, and Python. Implemented CI/CD pipelines and cloud infrastructure.',
    },
    // {
    //   title: 'Junior Software Developer',
    //   company: 'Senior Command & Staff College, Jinja-Kimaka',
    //   year: '2017 - 2019',
    //   description: 'Built responsive web applications and RESTful APIs. Collaborated with cross-functional teams to deliver quality software.',
    // },
  ];

export const skills = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI'],
    backend: ['Node.js', 'Python', 'Django', 'Express.js'],
    devops: ['Docker', 'Kubernetes'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    others: ['Git',  'Figma'],
  };

export const smartAgents = {
    name: 'Smart Agents IT Solutions',
    founded: '2020',
    location: 'Kibuli, Uganda',
    services: [
      'Custom Software Development',
      'Cloud Solutions & DevOps',
      'Mobile App Development',
      'Web Development',
      'Tech Education & Training',
      'IT Consulting',
      // 'Cybersecurity Solutions',
      // 'AI & Machine Learning',
    ],
    founders: ['Bukenya Umar', 'Irumba Hannan'],
    experience: '5+ Years in the Tech Industry',
    mission: 'To empower individuals and businesses through innovative technology solutions and quality tech education.',
    vision: 'To become a leading technology hub in Africa, driving digital transformation and creating opportunities through technology.',
    values: [
      'Innovation',
      'Quality',
      'Integrity',
      'Customer Satisfaction',
      'Continuous Learning',
      'Community Impact',
    ],
  };

export const floatAnimation = {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    };

export const carouselImages = [
    '/images/instructors/hassan.png',
    '/images/instructors/hp256.png',
    // '/images/instructors/hannan1.png',
    // '/images/instructors/ysan1.png',
  ];

export const service_categories = [
    { id: 'all', label: 'All Services', icon: Apps },
    { id: 'networking', label: 'Networking', icon: NetworkWifi },
    { id: 'programming', label: 'Programming', icon: Code },
    { id: 'care-maintenance', label: 'Care & Maintenance', icon: Build},
    { id: 'graphics', label: 'Graphics & Design', icon: DesignServices },
  ];


export   const services = [
    // Networking Services
    {
      id: 1,
      category: 'networking',
      title: 'Network Infrastructure Design',
      description: 'Comprehensive network architecture design and implementation for businesses of all sizes.',
      icon: NetworkWifi,
      image: '/images/networking-infrastructure.jpg',
      headOfDepartment: {
        name: 'Lagwe Yokosan',
        title: 'Head of Networking',
        bio: '5+ years experience in network infrastructure, certified Cisco expert.',
        image: '/images/instructors/ysan1.png',
        email: 'lagweysani@gmail.com',
        phone: '+256 769 798 347',
      },
      keyFeatures: [
        'Network Architecture Design',
        'LAN/WAN Setup',
        'Network Security Implementation',
        'Performance Optimization',
        'Network Monitoring Solutions',
      ],
      technologies: ['Cisco', 'Juniper', 'Palo Alto', 'Wireshark', 'SolarWinds'],
      projects: [
        // 'Enterprise Network Security Implementation',
        // 'Multi-Site Network Integration',
        // 'Cloud Network Migration',
      ],
      
    },
    // {
    //   id: 2,
    //   category: 'networking',
    //   title: 'Cloud Networking Solutions',
    //   description: 'Cloud-based network solutions for modern businesses leveraging hybrid and multi-cloud environments.',
    //   icon: Cloud,
    //   image: '/images/cloud-networking.jpg',
    //   headOfDepartment: {
    //     name: 'Sarah Cloud Expert',
    //     title: 'Cloud Networking Lead',
    //     bio: 'AWS and Azure certified cloud architect with 8 years of experience.',
    //     image: '/images/sarah-cloud.jpg',
    //     email: 'sarah.cloud@smartagents.com',
    //     phone: '+256 700 789 012',
    //   },
    //   keyFeatures: [
    //     'Cloud Architecture Design',
    //     'Hybrid Cloud Solutions',
    //     'SD-WAN Implementation',
    //     'Cloud Security',
    //     'Load Balancing & CDN',
    //   ],
    //   technologies: ['AWS', 'Azure', 'Google Cloud', 'Cloudflare', 'Palo Alto'],
    //   projects: [
    //     'Enterprise Cloud Migration',
    //     'Multi-Cloud Network Setup',
    //     'Zero-Trust Architecture',
    //   ],
    //   
    // },
    // {
    //   id: 3,
    //   category: 'networking',
    //   title: 'Network Security & Firewall',
    //   description: 'Advanced network security solutions to protect your business from cyber threats.',
    //   icon: Security,
    //   image: '/images/network-security.jpg',
    //   headOfDepartment: {
    //     name: 'Mike Security Pro',
    //     title: 'Security Engineering Lead',
    //     bio: 'Cyber security expert with focus on network security and threat mitigation.',
    //     image: '/images/mike-security.jpg',
    //     email: 'mike.security@smartagents.com',
    //     phone: '+256 700 456 789',
    //   },
    //   keyFeatures: [
    //     'Firewall Implementation',
    //     'IDS/IPS Solutions',
    //     'VPN Configuration',
    //     'Security Auditing',
    //     'Threat Monitoring',
    //   ],
    //   technologies: ['Fortinet', 'Cisco', 'Palo Alto', 'Snort', 'Zscaler'],
    //   projects: [
    //     'Bank Network Security Audit',
    //     'Government Network Protection',
    //     'Healthcare Data Security',
    //   ],
    //   
    // },

    // Programming Services
    {
      id: 4,
      category: 'programming',
      title: 'Full Stack Web Development',
      description: 'Modern web applications built with the latest technologies for optimal performance and user experience.',
      icon: Code,
      image: '/images/courses/full_stack_web_dev.jpg',
      headOfDepartment: {
        name: 'Kyeswa Hassan',
        title: 'Lead Full Stack Developer',
        bio: 'Full Stack Engineer with 5+ years experience in React, Node.js, and Python.',
        image: '/images/instructors/hassan.png',
        email: 'hassanprogrammer256@gmail.com',
        phone: '+256 790 233 774',
      },
      keyFeatures: [
        'React/Next.js Development',
        'Node.js/Python Backend',
        'Database Design',
        'API Development',
        // 'Performance Optimization',
      ],
      technologies: ['React',  'Node.js', 'Python',  'PostgreSQL'],
      projects: [
        // 'Minify Gadgets (E-Commerce Website)',
        'Final Year Project Tracker (Student Management WebApp)',
        // 'Real Estate Portal',
      ],
      
    },
    // {
    //   id: 5,
    //   category: 'programming',
    //   title: 'Mobile App Development',
    //   description: 'Cross-platform mobile applications for iOS and Android using React Native and Flutter.',
    //   icon: Devices,
    //   image: '/images/mobile-apps.jpg',
    //   headOfDepartment: {
    //     name: 'Peter Mobile Dev',
    //     title: 'Mobile Development Lead',
    //     bio: 'React Native and Flutter expert with 6 years of mobile development experience.',
    //     image: '/images/peter-mobile.jpg',
    //     email: 'peter.mobile@smartagents.com',
    //     phone: '+256 700 345 678',
    //   },
    //   keyFeatures: [
    //     'React Native Development',
    //     'Flutter Development',
    //     'iOS & Android Apps',
    //     'App Store Deployment',
    //     'Mobile UI/UX Design',
    //   ],
    //   technologies: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase'],
    //   projects: [
    //     'Healthcare Mobile App',
    //     'E-Learning Platform App',
    //     'FinTech Mobile Solution',
    //   ],
    //   
    // },
    // {
    //   id: 6,
    //   category: 'programming',
    //   title: 'AI & Machine Learning Solutions',
    //   description: 'Intelligent solutions leveraging AI and machine learning to solve complex business problems.',
    //   icon: Person,
    //   image: '/images/ai-ml.jpg',
    //   headOfDepartment: {
    //     name: 'Grace AI Specialist',
    //     title: 'AI/ML Team Lead',
    //     bio: 'AI/ML expert with 7 years experience in Python, TensorFlow, and PyTorch.',
    //     image: '/images/grace-ai.jpg',
    //     email: 'grace.ai@smartagents.com',
    //     phone: '+256 700 234 567',
    //   },
    //   keyFeatures: [
    //     'Custom AI Solutions',
    //     'Machine Learning Models',
    //     'Data Analytics',
    //     'Natural Language Processing',
    //     'Computer Vision',
    //   ],
    //   technologies: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'Scikit-learn'],
    //   projects: [
    //     'Customer Sentiment Analysis',
    //     'Automated Image Recognition',
    //     'Predictive Analytics Platform',
    //   ],
    //   
    // },

    // Care & Maintenance Services
    // {
    //   id: 7,
    //   category: 'care-maintenance',
    //   title: 'Hardware Maintenance & Repair',
    //   description: 'Professional hardware maintenance and repair services to keep your systems running smoothly.',
    //   icon: Settings,
    //   image: '/images/hardware-maintenance.jpg',
    //   headOfDepartment: {
    //     name: 'Robert Hardware Expert',
    //     title: 'Hardware Maintenance Lead',
    //     bio: 'Hardware expert with 12 years experience in computer systems and electronics.',
    //     image: '/images/robert-hardware.jpg',
    //     email: 'robert.hardware@smartagents.com',
    //     phone: '+256 700 890 123',
    //   },
    //   keyFeatures: [
    //     'System Diagnostics',
    //     'Hardware Repair',
    //     'Component Replacement',
    //     'Preventive Maintenance',
    //     'Warranty Support',
    //   ],
    //   technologies: ['Diagnostic Tools', 'Oscilloscope', 'Multimeter', 'Soldering Station'],
    //   projects: [
    //     'Corporate Hardware Maintenance',
    //     'School Computer Lab Setup',
    //     'Data Recovery Services',
    //   ],
    //   
    // },
    // {
    //   id: 8,
    //   category: 'care-maintenance',
    //   title: 'System Updates & Optimization',
    //   description: 'Keep your systems up-to-date and optimized for peak performance.',
    //   icon: Speed,
    //   image: '/images/system-optimization.jpg',
    //   headOfDepartment: {
    //     name: 'David System Admin',
    //     title: 'System Optimization Lead',
    //     bio: 'System administrator with 10 years experience in system optimization and performance tuning.',
    //     image: '/images/david-sysadmin.jpg',
    //     email: 'david.systems@smartagents.com',
    //     phone: '+256 700 567 890',
    //   },
    //   keyFeatures: [
    //     'System Updates',
    //     'Performance Tuning',
    //     'Server Optimization',
    //     'Storage Optimization',
    //     'Security Patching',
    //   ],
    //   technologies: ['Windows Server', 'Linux', 'VMware', 'Docker', 'Ansible'],
    //   projects: [
    //     'Server Infrastructure Optimization',
    //     'Database Performance Tuning',
    //     'Automated Backup Solutions',
    //   ],
    //   
    // },
    // {
    //   id: 9,
    //   category: 'care-maintenance',
    //   title: 'IT Support & Help Desk',
    //   description: 'Comprehensive IT support and help desk services for your organization.',
    //   icon: Handshake,
    //   image: '/images/help-desk.jpg',
    //   headOfDepartment: {
    //     name: 'Emma Support Lead',
    //     title: 'IT Support Manager',
    //     bio: 'IT support expert with 8 years experience in help desk management.',
    //     image: '/images/emma-support.jpg',
    //     email: 'emma.support@smartagents.com',
    //     phone: '+256 700 678 901',
    //   },
    //   keyFeatures: [
    //     '24/7 Help Desk',
    //     'Remote Support',
    //     'On-site Support',
    //     'IT Consulting',
    //     'User Training',
    //   ],
    //   technologies: ['Zendesk', 'Freshdesk', 'TeamViewer', 'AnyDesk', 'Jira'],
    //   projects: [
    //     'Corporate Help Desk Setup',
    //     'School IT Support System',
    //     'Hospital IT Support Services',
    //   ],
    //   
    // },

    // Graphics & Design Services
    // {
    //   id: 10,
    //   category: 'graphics',
    //   title: 'UI/UX Design',
    //   description: 'User-centered design solutions that deliver exceptional user experiences.',
    //   icon: DesignServices,
    //   image: '/images/ui-ux-design.jpg',
    //   headOfDepartment: {
    //     name: 'Alice UI/UX Designer',
    //     title: 'UI/UX Design Lead',
    //     bio: 'UI/UX designer with 7 years experience in designing digital products.',
    //     image: '/images/alice-ux.jpg',
    //     email: 'alice.design@smartagents.com',
    //     phone: '+256 700 901 234',
    //   },
    //   keyFeatures: [
    //     'User Research',
    //     'Wireframing',
    //     'Prototyping',
    //     'User Testing',
    //     'Design Systems',
    //   ],
    //   technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Photoshop'],
    //   projects: [
    //     'SaaS Platform UI Design',
    //     'E-Commerce App UX Design',
    //     'Healthcare System Design',
    //   ],
    //   
    // },
    // {
    //   id: 11,
    //   category: 'graphics',
    //   title: 'Brand Identity Design',
    //   description: 'Create a powerful brand identity that resonates with your target audience.',
    //   icon: Brush,
    //   image: '/images/brand-identity.jpg',
    //   headOfDepartment: {
    //     name: 'Chris Brand Expert',
    //     title: 'Brand Design Lead',
    //     bio: 'Brand designer with 9 years experience in creating memorable brand identities.',
    //     image: '/images/chris-brand.jpg',
    //     email: 'chris.brand@smartagents.com',
    //     phone: '+256 700 123 890',
    //   },
    //   keyFeatures: [
    //     'Logo Design',
    //     'Brand Guidelines',
    //     'Color Strategy',
    //     'Typography Design',
    //     'Marketing Materials',
    //   ],
    //   technologies: ['Illustrator', 'Photoshop', 'InDesign', 'CorelDRAW', 'Figma'],
    //   projects: [
    //     'Tech Company Brand Identity',
    //     'Startup Brand Design',
    //     'Corporate Rebranding',
    //   ],
    //   
    // },
    // {
    //   id: 12,
    //   category: 'graphics',
    //   title: 'Digital Marketing Graphics',
    //   description: 'Eye-catching graphics for digital marketing campaigns and social media.',
    //   icon: Palette,
    //   image: '/images/digital-marketing.jpg',
    //   headOfDepartment: {
    //     name: 'Maria Creative Director',
    //     title: 'Digital Design Lead',
    //     bio: 'Creative designer with 8 years experience in marketing and advertising.',
    //     image: '/images/maria-creative.jpg',
    //     email: 'maria.design@smartagents.com',
    //     phone: '+256 700 345 901',
    //   },
    //   keyFeatures: [
    //     'Social Media Graphics',
    //     'Ad Design',
    //     'Infographics',
    //     'Motion Graphics',
    //     'Video Editing',
    //   ],
    //   technologies: ['Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Figma'],
    //   projects: [
    //     'Social Media Campaign Design',
    //     'Video Production Services',
    //     'Interactive Content Design',
    //   ],
    //   
    // },
  ];

export const projects = [
  {
    id: 1,
    title: 'Minify Gadgets',
    description: 'A full-featured e-commerce platform with real-time order tracking.',
    thumbnail: '/images/projects/hp_256/minify_gadgets/Minify_Gadgets_Logo.png',
    category: 'Full Stack',
    technologies: ['Django', 'React', 'PostgreSQL', 'Redis'],
    techIcons: [SiDjango, SiReact, SiPostgresql],
    github: 'https://github.com/hassanprogrammer256/Smart_Katale_Api',
    live: 'https://www.minifygadgets.com',
    stars: 47,
    forks: 23,
    views: 1250,
    date: '2025-01-15',
    status: 'Completed',
    teamSize: 3,
    features: [
      'User Authentication & Profiles',
      'Product Catalog & Search',
      'Shopping Cart & Checkout',
      'Payment Processing (Stripe)',
      'Order Management Dashboard',
      'Real-time Inventory Updates',
    ],
  },
  {
    id: 2,
    title: 'Final Year Projects Management System',
    description: 'Comprehensive student management system with student project submission, final year projects tracking, supervisor project review,admin student and supervisor allocation and projects evaluation.',
    thumbnail: '/images/projects/hp_256/smart_fyp/dashboard.png',
    category: 'Full Stack',
    technologies: ['Django', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    techIcons: [SiDjango, SiReact, SiTypescript, SiPostgresql],
    github: 'https://github.com/hassanprogrammer256/SMART_FYP',
    live: '',
    stars: 32,
    forks: 15,
    views: 890,
    date: '2024-12-10',
    status: 'Completed',
    teamSize: 2,
    features: [
      'Student & Teacher Management',
      'Class & Subject Scheduling',
      'Gradebook & Report Cards',
      'Attendance Tracking',
      'Parent Portal',
      'Fee Management',
    ],
  },
  {
    id: 3,
    title: 'Senior Command & Staff College, Student & Staff Portal',
    description: 'A comprehensive student and staff management portal for Senior Command & Staff College, Jinja-Kimaka, providing features for student enrollment, course management,and academic performance monitoring.',
    thumbnail: '/images/projects/hp_256/scsc/scsc_login.png',
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    techIcons: [SiReact, SiTypescript, SiTailwindcss, SiRedux],
    github:"https://github.com/hassanprogrammer256/Senior_Command",
    live: 'https://seniorcommand.netlify.app/',
    stars: 28,
    forks: 12,
    views: 750,
    date: '2024-11-20',
    status: 'In Progress',
    teamSize: 1,
    features: [
      'Student & Administrative Management',
      'Course & Class Scheduling',
      'Gradebook & Academic Records',

      'Communication Portal',
    ],
  },
  {
    id: 4,
    title: 'My Kasota',
    description: 'A 2D Snake Game built with Python and Pygame, featuring multiple levels, increasing difficulty, and a scoring system.',
    thumbnail: "/images/projects/hp_256/my_kasota/my_kasota.png",
    category: 'Game Development',
    technologies: ['Python', 'Pygame'],
    techIcons: [SiPython],
    github: 'https://github.com/hassanprogrammer256/My_Kasota',
    live: '',
    stars: 56,
    forks: 28,
    views: 2100,
    date: '2025-02-01',
    status: 'Completed',
    teamSize: 2,
    features: [
      '2D Snake Game Mechanics',
      'Multiple Levels & Increasing Difficulty',
      'Scoring System & Leaderboard',
    ],
  },
  {
    id: 5,
    title: 'Yo Ballot',
    description: 'An online  University voting  platform that allows students to vote for their preferred candidates in various elections, ensuring transparency and security.',
    thumbnail: '/images/projects/hp_256/yo_ballot/cover_image.png',
    category: 'Full Stack',
    technologies: ['Django', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    techIcons: [SiDjango, SiReact, SiTypescript, SiPostgresql],
    github: 'https://github.com/hassanprogrammer256/Yo_Ballot_Client',
    live: '',
    stars: 41,
    forks: 19,
    views: 980,
    date: '2024-12-28',
    status: 'Completed',
    teamSize: 3,
    features: [
      'Student Registration & Profiles',
      'Candidate Management',
      'Election Configuration',
      'Voting Interface',
      'Results Display',
      'Security Measures',
    ],
  },
  {
    id: 6,
    title: 'Student ERP System',
    description: 'A comprehensive student management system for educational institutions, providing features for student enrollment, course management, attendance tracking, and academic performance monitoring.',
    thumbnail: '/images/projects/hp_256/erp/reg.png',
    category: 'Software Development',
    technologies: ['Python','Tkinter', 'SQLite'],
    techIcons: [SiPython, SiSqlite],
    github: 'https://github.com/hassanprogrammer256/iuiu_erp_clone',
    live: '',
    stars: 34,
    forks: 16,
    views: 670,
    date: '2025-01-25',
    status: 'In Progress',
    teamSize: 1,
    features: [
      'Student Registration & Profiles',
      'Course Management',
      'Attendance Tracking',
      'Academic Performance Monitoring',
    ],
  },
]

export const channels = [
  { name: 'WhatsApp', members: 15, icon: FaWhatsapp,to:SMART_AGENTS_GROUP_INVITE_LINK },
  // { name: 'Telegram', members: 876, icon: SiTelegram },
  { name: 'Github', members: 2, icon: SiGithub,to:'https://www.github.com/hassanprogrammer256' },
  // { name: 'Linkedin', members: 543, icon: FaLinkedin },
  // { name: 'Announcements', members: 2345, icon: FaRocket },
]

export const events = [
  {
    id: 1,
    title: 'Django Web Development Workshop',
    description: 'Learn to build full-stack applications with Django from scratch.',
    date: '2025-03-15T14:00:00',
    type: 'Workshop',
    host: 'Hassan Programmer 256',
    attendees: 124,
    maxAttendees: 200,
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop',
    icon: FaVideo,
  },
  {
    id: 2,
    title: 'React + TypeScript Q&A Session',
    description: 'Live Q&A session covering React hooks, TypeScript patterns, and best practices.',
    date: '2025-03-18T16:00:00',
    type: 'Live Q&A',
    host: 'Hassan Programmer 256',
    attendees: 87,
    maxAttendees: 150,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    icon: FaQuestionCircle,
  },
  {
    id: 3,
    title: 'Open Source Contribution Hackathon',
    description: 'Join us for a weekend of open source contributions and collaboration.',
    date: '2025-03-22T09:00:00',
    type: 'Hackathon',
    host: 'Hassan Programmer 256',
    attendees: 56,
    maxAttendees: 100,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    icon: FaCode,
  },
]

export const posts = [
  {
    id: 1,
    title: 'Best way to structure Django projects?',
    content: 'I\'m building a large Django application and wondering about the best project structure. Should I use apps for each feature or something else?',
    author: 'Mirembe Sarah',
    authorAvatar: '/images/users/mirembe_sarah.jpg',
    date: '2025-03-14T10:30:00',
    replies: 23,
    likes: 45,
    tags: ['Django', 'Architecture'],
  },
  {
    id: 2,
    title: 'React Performance Optimization Tips',
    content: 'What are your go-to techniques for optimizing React applications? I\'m dealing with a large component tree and need some advice.',
    author: 'ReactMaster',
    authorAvatar: '/images/users/hulk.jpg',
    date: '2025-03-13T15:20:00',
    replies: 31,
    likes: 67,
    tags: ['React', 'Performance'],
  },
  {
    id: 3,
    title: 'TypeScript vs Python for Backend?',
    content: 'I\'m starting a new project and can\'t decide between using TypeScript with Node.js or Python with Django. What are your experiences?',
    author: 'Okane Emmanuel',
    authorAvatar: '/images/users/okane_emmanuel.jpg',
    date: '2025-03-12T08:45:00',
    replies: 18,
    likes: 34,
    tags: ['TypeScript', 'Python', 'Django'],
  },
]

export const communityStats = {
  members: 15,
  // instructors: 2,
  totalPosts: 153
}

export const courses = [
  {
    id: 1,
    name: 'Python Programming Mastery',
    icon: FaPython,
    color: 'text-yellow-500',
    bgColor: 'from-yellow-500/20 to-yellow-600/10',
    level: 'Beginner to Advanced',
    description: 'Master Python from basics to advanced concepts including OOP, decorators, generators, and real-world applications.',
    thumbnail: '/images/courses/python_programming.jpg',
    instructor: {
      name: 'Kyeswa Hassan',
      title: 'Lead Python Instructor',
      avatar: '/images/instructors/hassan.png',
      bio: 'Full Stack Engineer with 5+ years of Python experience. Passionate about teaching and building scalable applications.',
      email: 'hassanprogrammer256@gmail.com',
    },
   lessons: 48,
    duration: '24 hours',
    students: 2847,
    rating: 4.8,
    reviews: 892,
    includes: ['60+ Video Lectures', '20 Coding Exercises', '5 Projects', 'Certificate of Completion'],
    syllabus: [
      'Python Basics & Syntax',
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'File I/O & Exception Handling',
      'Decorators & Generators',
      'Web Scraping & Automation',
      'Final Capstone Project'
    ],
    price: 'UGX: 100,000',
    enrolled: 0,
  },
  {
    id: 2,
    name: 'Django Framework Pro',
    icon: SiDjango,
    color: 'text-green-600',
    bgColor: 'from-green-600/20 to-green-700/10',
    level: 'Intermediate to Advanced',
    description: 'Build production-ready web applications with Django. Learn authentication, ORM, REST APIs, and deployment.',
    thumbnail: '/images/courses/django_framework_pro.jpg',
    instructor: {
      name: 'Kyeswa Hassan',
      title: 'Django Specialist',
      avatar: '/images/instructors/hassan.png',
      bio: 'Django expert with 4+ years building scalable web applications. Experienced in REST APIs and microservices.',
      email: 'hassanprogrammer256@gmail.com',
    },
    lessons: 52,
    duration: '28 hours',
    students: 1956,
    rating: 4.9,
    reviews: 634,
    includes: ['50+ Video Lectures', '15 Coding Exercises', '3 Full Projects', 'REST API Development', 'Deployment Guide'],
    syllabus: [
      'Django Basics & Models',
      'Views & Templates',
      'Authentication & Authorization',
      'Django REST Framework',
      'Testing & Debugging',
      'Deployment & Security',
      'E-Commerce Project'
    ],
    price: '296,000',
    enrolled: 1956,
  },
  {
    id: 3,
    name: 'React + TypeScript',
    icon: FaReact,
    color: 'text-cyan-400',
    bgColor: 'from-cyan-400/20 to-cyan-500/10',
    level: 'Intermediate to Advanced',
    description: 'Master modern frontend development with React and TypeScript. Build type-safe, scalable applications.',
    thumbnail: '/images/courses/react+typescript.jpg',
    instructor: {
      name: 'Kyeswa Hassan',
      title: 'React & TypeScript Expert',
      avatar: '/images/instructors/hassan.png',
      bio: 'Frontend specialist with 5+ years of React experience. TypeScript advocate and open-source contributor.',
      email: 'hassanprogrammer256@gmail.com',
    },
    lessons: 56,
    duration: '30 hours',
    students: 3124,
    rating: 4.7,
    reviews: 1023,
    // level: 'Intermediate',
    includes: ['55+ Video Lectures', '25 Coding Exercises', '4 Projects', 'TypeScript Deep Dive', 'State Management'],
    syllabus: [
      'React Fundamentals',
      'Hooks & Context API',
      'TypeScript Basics',
      'Advanced TypeScript Patterns',
      'State Management with Redux',
      'Testing React Components',
      'Full Stack Integration'
    ],
    price: '333,500',
    enrolled: 3124,
  },
  {
    id: 4,
    name: 'JavaScript ES6+',
    icon: FaJs,
    color: 'text-yellow-400',
    bgColor: 'from-yellow-400/20 to-yellow-500/10',
    level: 'Beginner to Advanced',
    description: 'Complete JavaScript mastery from ES6 to modern features. Understand closures, promises, async/await, and more.',
    thumbnail: '/images/courses/javascript_es6.jpg',
    instructor: {
      name: 'Kyeswa Hassan',
      title: 'JavaScript Guru',
      avatar: '/images/instructors/hassan.png',
      bio: 'JavaScript expert with 6+ years of experience. Passionate about functional programming and clean code.',
      email: 'hassanprogrammer256@gmail.com',
    },
    lessons: 44,
    duration: '22 hours',
    students: 4231,
    rating: 4.6,
    reviews: 1456,
    // level: 'All Levels',
    includes: ['45+ Video Lectures', '30 Coding Exercises', '3 Projects', 'ES6+ Features', 'Functional Programming'],
    syllabus: [
      'ES6+ Syntax Features',
      'Functions & Arrow Functions',
      'Promises & Async/Await',
      'Modules & Bundling',
      'Error Handling',
      'DOM Manipulation',
      'Final Project'
    ],
    price: 'UGX: 146,000',
    enrolled: 4231,
  },
  {
    id: 5,
    name: 'HTML5 & CSS3',
    icon: FaHtml5,
    color: 'text-orange-500',
    bgColor: 'from-orange-500/20 to-orange-600/10',
    level: 'Beginner',
    description: 'Build beautiful, responsive websites with HTML5 and CSS3. Master flexbox, grid, animations, and modern layouts.',
    thumbnail: '/images/courses/html&css.jpg',
    instructor: {
      name: 'Kyeswa Hassan',
      title: 'Web Design Instructor',
      avatar: '/images/instructors/hassan.png',
      bio: 'Web design expert with 5+ years of experience. Specializes in responsive design and accessibility.',
      email: 'hassanprogrammer256@gmail.com',
    },
    lessons: 38,
    duration: '18 hours',
    students: 5678,
    rating: 4.5,
    reviews: 2134,
    // level: 'Beginner',
    includes: ['40+ Video Lectures', '25 Coding Exercises', '2 Projects', 'Responsive Design', 'CSS Animations'],
    syllabus: [
      'HTML5 Semantic Elements',
      'CSS3 Flexbox & Grid',
      'Responsive Design',
      'CSS Animations & Transitions',
      'Form Styling',
      'Accessibility Best Practices',
      'Portfolio Website Project'
    ],
    price: 'UGX: 108,600',
    enrolled: 5678,
  },
  {
    id: 6,
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: 'text-sky-500',
    bgColor: 'from-sky-500/20 to-sky-600/10',
    level: 'Beginner to Intermediate',
    description: 'Master utility-first CSS with Tailwind. Build modern, responsive UIs faster with less custom CSS.',
    thumbnail: '/images/courses/tailwindcss.jpg',
    instructor: {
      name: 'Kyeswa Hassan',
      title: 'Tailwind CSS Expert',
      avatar: '/images/instructors/hassan.png',
      bio: 'Frontend developer with 4+ years of Tailwind experience. Created multiple design systems with Tailwind.',
      email: 'hassanprogrammer256@gmail.com',
    },
    lessons: 32,
    duration: '14 hours',
    students: 3456,
    rating: 4.6,
    reviews: 876,
    // level: 'Beginner',
    includes: ['35+ Video Lectures', '20 Coding Exercises', '3 Projects', 'Responsive Design', 'Custom Themes'],
    syllabus: [
      'Tailwind Fundamentals',
      'Utility Classes Deep Dive',
      'Responsive Design with Tailwind',
      'Custom Theming',
      'Component Extraction',
      'Performance Optimization',
      'Landing Page Project'
    ],
    price: 'UGX: 127,400',
    enrolled: 3456,
  },
  {
    id: 7,
    name: 'Docker & DevOps',
    icon: SiDocker,
    color: 'text-blue-500',
    bgColor: 'from-blue-500/20 to-blue-600/10',
    level: 'Intermediate to Advanced',
    description: 'Learn containerization, CI/CD pipelines, and modern DevOps practices with Docker and related tools.',
    thumbnail: '/images/courses/docker&devops.jpg',
    instructor: {
      name: 'Kyeswa Hassan',
      title: 'DevOps Engineer',
      avatar: '/images/instructors/hassan.png',
      bio: 'DevOps specialist with 5+ years of experience. Passionate about automation and infrastructure as code.',
      email: 'hassanprogrammer256@gmail.com',
    },
    lessons: 46,
    duration: '24 hours',
    students: 876,
    rating: 4.8,
    reviews: 234,
    // level: 'Advanced',
    includes: ['45+ Video Lectures', '15 Coding Exercises', '5 Projects', 'CI/CD Pipelines', 'Kubernetes Basics'],
    syllabus: [
      'Docker Fundamentals',
      'Docker Compose',
      'Container Orchestration',
      'CI/CD with GitHub Actions',
      'Monitoring & Logging',
      'Cloud Deployment',
      'Full DevOps Project'
    ],
    price: 'UGX: 371,000',
    enrolled: 876,
  },
]

export const coursesCategories = ['All', 'Programming', 'Web Development', 'Frontend', 'Backend', 'Full Stack', 'DevOps', 'UI/UX Design', 'Data Science', 'Machine Learning', 'Mobile Development', 'Game Development', 'Cloud Computing', 'Cybersecurity', 'Database Management', 'Software Engineering', 'Project Management', 'Digital Marketing', 'Networking', 'Care & Maintenance']





// ==========================HELPER FUNCTIONS======================
export const isPhone_Number_Valid = (phone_number) =>{
  return /^07\d{8}$/.test(phone_number)
}
export const isPassword_Valid = (password) =>{
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
}