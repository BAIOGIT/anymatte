export const footerHeadings = {
    companyInfo: {
        title: "Any Matte",
        description: "Expert Solutions for Flawless Video Rendering.",
    },
    contact: {
        title: "Contact Us",
        contacts: [
            { name: "Email", value: "support@anymatte.com" },
            { name: "Phone", value: "+1 234 567 8901" },
            { name: "Address", value: "1234 Film Street, Hollywood, CA 90001, USA" },
        ],
    },
    quickLinks: {
        title: "Quick Links",
        links: [
            { name: "Upload", href: "#upload" },
            // { name: "Examples", href: "#examples" },
            { name: "Pricing", href: "#pricing" },
            { name: "FAQ", href: "#faq" },
            { name: "Contact", href: "#contact" },
            { name: "Privacy Policy", href: "#privacy-policy" },
        ],
    },
    copyright: {
        text: "© 2024 Any Matte. All rights reserved.",
        link: {
            href: "https://anymatte.com",
            name: "anymatte.com",
        },
    },
};

export const componentsHeadings = {
    HeroSection: {
        // title: "Unmatched Alpha Matte Generation.<br />ANY Image. ANY Format.",
        title: "Unmatched Alpha Matte Generation.",
        subtitle: "Elevate your post-production with Any Matte. Easily upload any image or video and receive perfectly accurate alpha matte files for faces, vehicles, and more. Streamline your workflow without relying on traditional plugins or complex software setups. Experience seamless integration with your existing editing tools and achieve professional results effortlessly!"
    },
    UVPSection: {
        title: "The Premier Solution for Perfect Alpha Mattes",
        subtitle: "Any Matte is your go-to platform for generating flawless alpha matte files. Unlike conventional plugins or complicated software, our service is designed to provide precise results for faces, vehicles, and other elements in any footage. Whether you're facing tight deadlines or managing ongoing projects, we ensure that your alpha mattes are ready to integrate seamlessly into your workflow."
    },
    BenefitsSection: {
        title: "Why Choose Any Matte?",
        icon1: "fas fa-image",
        title1: "Comprehensive Matte Creation",
        subtitle1: "Specializing in various types of footage, we deliver accurate alpha mattes tailored to your needs, from faces to vehicles and beyond.",
        icon2: "fas fa-speedometer",
        title2: "Rapid Processing",
        subtitle2: "Receive your alpha matte files swiftly without sacrificing quality, even when time is of the essence.",
        icon3: "fas fa-tags",
        title3: "Affordable and Transparent",
        subtitle3: "Enjoy competitive pricing with no hidden fees. Only pay for the precise service you require, without the added costs of traditional software.",
        icon4: "fas fa-lock",
        title4: "Confidential and Trustworthy",
        subtitle4: "We prioritize the security and confidentiality of your footage, ensuring a reliable and secure service."
    },
    HowItWorksSection: {
        title: "How It Works",
        icon1: "fas fa-upload",
        title1: "Upload Your Footage",
        subtitle1: "Submit your image or video file for processing. Our system supports various formats.",
        icon2: "fas fa-cogs",
        title2: "Automated Matte Creation",
        subtitle2: "Our advanced algorithms generate precise alpha mattes based on your footage.",
        icon3: "fas fa-download",
        title3: "Download Your Files",
        subtitle3: "Retrieve your completed alpha matte files ready for integration into your projects.",
        icon4: "fas fa-smile",
        title4: "Enjoy Seamless Integration",
        subtitle4: "Incorporate the alpha mattes into your editing or VFX workflow effortlessly."
    },
    SocialProofSection: {
        title: "Hear from Our Satisfied Clients",
        testimonials: [
            { name: 'Alex Johnson', role: 'Video Editor', content: 'Any Matte has revolutionized my workflow. The alpha mattes are incredibly accurate and save me hours of manual work.' },
            { name: 'Samantha Lee', role: 'VFX Artist', content: 'A game-changer for my projects. The quality and speed of their service are unmatched.' },
            { name: 'David Carter', role: 'Freelancer', content: 'Effortless and reliable. Any Matte delivers exactly what I need, every time.' },
        ]
    },
    CallToActionSection: {
        title: "Ready to Enhance Your Footage?",
        subtitle: "Upload your files now and get precise alpha mattes delivered directly to you!",
        button: "Start Generating Alpha Mattes"
    },
    ContactSection: {
        title: "Get in Touch",
        subtitle: "Have questions or need support? Fill out the form below, and our team will get back to you promptly.",
        name: "Name",
        email: "E-mail",
        subject: "Subject",
        message: "Your message here...",
        button: "Send Inquiry"
    },
    LoginSection: {
        title: `Welcome to ${footerHeadings.companyInfo.title}`,
        subtitle: "The Ultimate Solution for Precise Alpha Mattes"
    },
};

  // Pricing data for the three models
export const pricingHeadings = {
    oneTimePayment: {
            title: 'One-Time Payment',
            description: 'Pay once and get lifetime access.',
            price: '$99.99',
            features: ['Lifetime Access', 'No Recurring Fees', 'Basic Support'],
    },
    subscription: {
            title: 'Subscription (Credit System)',
            description: 'Subscribe and get credits every month.',
            price: '$19.99/month',
            features: ['100 Credits per Month', 'Premium Support', 'Cancel Anytime'],
    },
    studio: {
            title: 'Studio',
            description: 'Custom solutions for businesses or large teams.',
            price: 'Contact us',
            features: ['Custom Solutions', 'Dedicated Support', 'Flexible Pricing'],
    },
};


export const appearanceScheme = {
    colors: {
      // Define custom palette
      palette: {
        'primary': '#87a330',
        'secondary': '#87a330',
        'alt': '#87a330',
        'gradientPrimary': '#ef4444', // '#cc6600'
        'gradientSecondary': '#b91c1c', // #ff66cc'
        'gradientLight': '#fee2e2',
      },
      // Define custom light mode colors
      lightTheme: {
        'primary': '#ffffff',
        'secondary': '#000000',
        'alt': '#ffffff',
        'separator' : '#ceced9',
        'text' : '#000000',
      },
      // Define custom dark mode colors
      darkTheme: {
        'primary': '#000000',
        'secondary': '#ffffff',
        'alt': '#323232',
        'separator' : '#3d3d40',
        'text' : '#ffffff',
      },
    },
    fontFamily: {
      // Define custom font family
      lightTheme: ['PT Mono, monospace'],
      darkTheme: ['PT Mono, monospace'],
    },
};

export default { componentsHeadings, pricingHeadings, footerHeadings, appearanceScheme };
