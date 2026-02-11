import { 
  Package, Layers, Droplets, Tag, PenTool, 
  Shield, Clock, Eye, 
  Users, Target, Globe, 
  Mail, Phone, CheckCircle2 
} from 'lucide-react';
import { BlogPost, Service, FaqItem } from '../types';

export const siteContent = {
  meta: {
    siteUrl: "https://vencol-demo.vercel.app", // Reemplazar con dominio real
    siteName: "Vencol",
    defaultImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    favicon: "https://cdn-icons-png.flaticon.com/512/32/32223.png", // Icono de hoja genérico para demo
    titleTemplate: "%s | Vencol - Frescura Visible",
    defaultTitle: "Vencol - Tecnología de Empaque y Frescura",
    defaultDescription: "Expertos en soluciones de empaque, bolsas termoencogibles y absorbentes para la industria de alimentos frescos en Latinoamérica."
  },
  brand: {
    name: "VENCOL",
    slogan: "Hacemos visible la frescura",
    description: "Líderes en empaques sostenibles para alimentos. Ofrecemos soluciones innovadoras y ecológicas que protegen tus productos y el medio ambiente.",
    contact: {
      email: "info@vencol.com",
      phone: "+1 (786) 258-4495",
      address: "Miami, FL",
      locations: [
        { country: "Colombia", address: "Carrera 69P #74B-71 Bogotá" },
        { country: "USA", address: "8209 NW 70 St. Miami, FL 33166" },
        { country: "México", address: "Anillo Vial Fray Junipero, Salitre San José El Alto, Solar Urbano 106 4, Queretaro" },
        { country: "Ecuador", address: "Vasco de Contreras N36-235 y Mañosca, Quito" }
      ]
    },
    social: {
      whatsapp: "+1 (786) 258-4495",
      socialLinks: [
        { label: "Facebook", href: "#", icon: "facebook" },
        { label: "Linkedin", href: "#", icon: "linkedin" },
        { label: "Youtube", href: "#", icon: "youtube" },
      ]
    }
  },
  navigation: [
    { label: 'Inicio', path: '/' },
    { label: 'Nosotros', path: '/nosotros' },
    // { label: 'Soluciones', path: '/soluciones' }, // Logic handled in component for dropdown
    { label: 'Blog', path: '/blog' },
  ],
  header: {
    logo: "https://vencol.com/wp-content/uploads/2024/12/LOGO-VENCOL-0437300-300x116.webp",
    cta: {
      label: "Contacto",
      path: "/contacto"
    }
  },
  home: {
    meta: {
      title: "Inicio",
      description: "Hacemos visible la frescura de tus alimentos con tecnología de punta en empaques y preservación."
    },
    hero: {
      badge: "Tecnología de frescura",
      title: {
        prefix: "Hacemos visible la",
        highlight: "frescura",
        suffix: "de tus alimentos."
      },
      description: "La tecnología que controla bacterias y mantiene la frescura y la calidad real de lo que comes y de lo que vendes.",
      cta: {
        primary: "Conoce nuestras soluciones",
        secondary: "Hablemos"
      },
      images: [
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/vencol-foto-8-scaled.png",
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/hero_2.webp",
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/hero_3.webp"
      ]
    },
    about: {
      badge: "Sobre Vencol",
      title: {
        prefix: "Innovación y confianza que se hacen",
        highlight: "visibles",
        suffix: "."
      },
      description: "Hace más de 10 años impulsamos la transformación del empaque de alimentos frescos en Colombia y Latinoamérica. Nos dedicamos a proteger lo que más importa.",
      quote: "La frescura deja de ser una promesa y se convierte en evidencia visible para el consumidor.",
      subDescription: "Representamos marcas líderes mundiales y contamos con certificaciones internacionales para garantizar la seguridad de tus productos en cada etapa.",
      features: [
        "Soporte Técnico Continuo Especializado",
        "Cadena de suministro confiable y certificada"
      ],
      cta: "Conoce más",
      image: "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Asesoria-Tecnica-y-Comercial.webp",
      experienceBadge: {
        text: "Experiencia",
        value: "+10 Años"
      }
    },
    partners: {
      stats: {
        value: "Aliados Corporativos",
        text: "confían en nosotros."
      },
      subtitle: "Tecnología de preservación probada por la industria.",
      logos: [
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Grupo-Bios-scaled.jpg", 
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Cryovac.jpg", 
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/SEE.jpg", 
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Sealed-Air.jpg", 
        "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Novipax.jpg"
      ]
    },
    threePs: {
      title: "Revolucionando la Industria Alimentaria",
      subtitle: "Nuestro estándar para garantizar calidad, inocuidad y experiencia.",
      items: [
        {
          id: 1,
          icon: Shield,
          iconColor: "text-blue-400",
          iconBg: "bg-blue-500/20",
          bgImage: "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/Proteccion.png",
          title: "Protección",
          description: "Evita el crecimiento bacteriano, controla el líquido de proteínas y mantiene los alimentos seguros.",
          result: "Resultado: Productos confiables"
        },
        {
          id: 2,
          icon: Clock,
          iconColor: "text-brand-green",
          iconBg: "bg-brand-green/20",
          bgImage: "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/Preservacion.png",
          title: "Preservación",
          description: "Extiende la vida útil, reduce el desperdicio y mantiene el sabor y textura que el consumidor espera.",
          result: "Resultado: Más días de frescura real"
        },
        {
          id: 3,
          icon: Eye,
          iconColor: "text-purple-400",
          iconBg: "bg-purple-500/20",
          bgImage: "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/Presentacion.png",
          title: "Presentación",
          description: "Sin filtraciones, sin olores desagradables, sin bandejas \"que sangran\".",
          result: "Resultado: Una vitrina impecable"
        }
      ]
    },
    impact: {
      metrics: [
        { 
          value: "+54 Millones", 
          label: "Almohadillas distribuidas",
          subLabel: "en Colombia en 2025" 
        },
        { 
          value: "5 Países", 
          label: "Cobertura Regional",
          subLabel: "Exportando a Japón" 
        },
        { 
          value: "+27 Días", 
          label: "Vida Útil",
          subLabel: "Reportada por clientes" 
        },
        { 
          value: "99%", 
          label: "Entregas a Tiempo",
          subLabel: "Satisfacción garantizada" 
        }
      ]
    },
    faq: {
      badge: "Preguntas Frecuentes",
      title: {
        prefix: "Las preguntas más",
        highlight: "comunes",
        suffix: "de nuestros clientes."
      },
      description: "",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
      cta: {
        text: "¿Aún tienes dudas?",
        linkText: "Contactar a un experto"
      },
      items: [
        {
          question: "¿Para qué sirve exactamente la almohadilla que viene dentro del empaque?",
          answer: "Es una tecnología de absorción diseñada para retener el exceso de líquidos (exudado) que la carne libera de forma natural. Su función es doble: mantiene el producto con una apariencia limpia y apetecible, y evita que el líquido acumulado acelere la proliferación de bacterias, garantizando así una mayor seguridad alimentaria."
        },
        {
          question: "¿La almohadilla afecta el sabor o la calidad de la carne?",
          answer: "No, lass almohadillas que utilizamos en Vencol están aprobadas para el contacto con alimentos. Son inertes y están diseñadas solo para absorber el líquido sobrante, preservando el sabor, la textura y la jugosidad original  sin transferir ningún tipo de residuo."
        },
        {
          question: "¿El empaque es resistente a la congelación?",
          answer: "Sí. Nuestros films y etiquetas están diseñados para soportar condiciones extremas. El material no se rompe ni pierde sus propiedades de barrera, protegiendo la integridad del alimento en todo momento."
        },
        {
          question: "¿Cómo ayuda este empaque a reducir el desperdicio en mi hogar/negocio?",
          answer: "Gracias a la alta barrera contra el oxígeno y la humedad, la vida útil del producto se extiende significativamente. Esto le da más días para consumir la carne antes de que se deteriore, reduciendo drásticamente la probabilidad de tener que desechar producto por mal estado."
        }
      ] as FaqItem[]
    },
    testimonials: {
      badge: "FEEDBACK DE CLIENTES",
      title: {
        prefix: "Descubre lo que dicen nuestros clientes sobre",
        highlight: "Su Experiencia",
        suffix: "."
      },
      description: "La confianza se construye con resultados. Conoce las historias de éxito de quienes ya transformaron su cadena de frescura con Vencol.",
      items: [
        {
          id: 1,
          name: "Carlos Rodriguez",
          role: "Gerente de Planta",
          company: "Cárnicos del Valle",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
          text: "La implementación de las almohadillas Vencol redujo nuestras devoluciones por mal olor en un 40%. La diferencia es visible.",
          rating: 5
        },
        {
          id: 2,
          name: "Ana María Lopez",
          role: "Directora de Calidad",
          company: "Retail Colombia",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
          text: "Sus soluciones de empaque no solo protegen el producto, sino que mejoran la presentación en la vitrina. Nuestros clientes lo notan.",
          rating: 5
        }
      ]
    },
    blogPreview: {
      title: "Lo que ves importa. Lo que NO ves, aún más.",
      subtitle: " Nuestras soluciones lo absorben, lo retienen y mantienen la frescura visible.",
      cta: "Aprende más",
      bgImage: "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/hero_3.jpg"
    }
  },
  about: {
    meta: {
      title: "Nosotros",
      description: "Más de 10 años transformando el empaque de alimentos en Latinoamérica. Conoce nuestra historia, misión y alcance global."
    },
    hero: {
      badge: "Sobre Vencol",
      title: "Innovación y confianza que se hacen visibles",
      description: "Ayudamos a nuestros clientes a que la frescura deje de ser una promesa y se convierta en evidencia visible para sus consumidores.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
    }   
  },
  solutions: {
    hero: {
      title: "Nuestras Soluciones",
      description: "Tecnología avanzada para cada etapa del proceso, desde la planta hasta la vitrina."
    },
    custom: {
      title: "¿Necesitas una solución personalizada?",
      description: "Realizamos diagnósticos en planta, calibración de equipos y optimización de rentabilidad para medianas y grandes operaciones.",
      cta: "Solicitar Evaluación"
    },
    items: [
      {
        id: '1',
        slug: 'bolsas-termoencogibles-cryovac',
        title: "Bolsas/fundas termoencogibles Cryovac",
        description: "Seguridad alimentaria de alto rendimiento. Barrera superior contra oxígeno y humedad.",
        longDescription: "Las bolsas termoencogibles Cryovac representan el estándar de oro en la industria del empaque de proteínas. Diseñadas con tecnología multicapa patentada, estas bolsas se encogen al contacto con el calor para ajustarse como una segunda piel al producto, eliminando el oxígeno residual y maximizando la vida útil. Son ideales para carnes frescas, procesadas y quesos, ofreciendo una resistencia excepcional a la punción y una claridad óptica que resalta la frescura natural del alimento.",
        subtitle1: "Barrera superior contra oxígeno y humedad.",
        subtitle1Description: "Nuestras soluciones de empaque te brindan una barrera técnica superior contra el oxígeno y la humedad. Esta protección avanzada previene la contaminación y extiende la vida útil de tus productos, para que mantengas su frescura por mucho más tiempo.",
        subtitle2: "Innovación para tu Conservación y Calidad.",
        subtitle2Description: "Diseñadas para una amplia gama de alimentos, estas bolsas aseguran la integridad de tus productos en cada etapa. Su tecnología te permite llevar sabor, textura y estándares de calidad intactos hasta las manos de tu consumidor final.",
        icon: Package,
        features: [
          "Alta barrera al oxígeno para prevenir la oxidación.",
          "Encogimiento superior para una presentación sin arrugas.",
          "Resistencia extrema a la punción y al abuso en transporte.",
          "Compatibles con sistemas de vacío rotativos y de cámara.",
          "Disponibles en múltiples calibres según el tipo de hueso o corte."
        ],
        images: [
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/vencol-foto-1-scaled.png",
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Productos-Cryovac.webp"
        ]
      },
      {
        id: '2',
        slug: 'film-termoformado',
        title: "Film de Empaque Termoformado Cryovac",
        description: "Tecnología de vanguardia. Selladura hermética y resistencia mecánica superior.",
        longDescription: "Nuestros films para termoformado están diseñados para máquinas de alto rendimiento, permitiendo crear envases a medida directamente en la línea de producción. Ofrecemos tanto films flexibles como semirrígidos, con propiedades de termoformado profundo que garantizan un espesor uniforme en las esquinas. Esta solución optimiza los costos logísticos y mejora la presentación en el lineal, permitiendo una visibilidad 360° del producto.",
        subtitle1: "Tecnología de vanguardia para tus empaques",
        subtitle1Description: "Maximiza la protección y la presentación de tus productos con nuestros films de alto rendimiento. Gracias a su combinación de resistencia y flexibilidad, tienes la solución perfecta para adaptarte a cualquier aplicación que necesites.",
        subtitle2: "Calidad y resistencia en cada rollo",
        subtitle2Description: "Nuestros films están diseñados para darte una selladura hermética superior, protegiendo tus productos contra la contaminación y el deterioro. Además, su claridad excepcional logra que tu marca destaque con una apariencia impecable en el punto de venta.",
        icon: Layers,
        features: [
          "Formabilidad excepcional para cavidades profundas.",
          "Sellado hermético incluso con contaminantes en el área de sellado.",
          "Propiedades antifog (anti-vaho) para máxima claridad.",
          "Estructuras de alta barrera para atmósfera modificada (MAP).",
          "Reducción de micraje sin sacrificar resistencia (Sostenibilidad)."
        ],
        images: [
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/vencol-foto-2-scaled.jpg",
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Film-Cryovac.webp",
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/vencol-foto-6-scaled.jpg"
        ]
      },
      {
        id: '3',
        slug: 'absorbentes-tipo-almohadilla',
        title: "Absorbentes Tipo Almohadilla Aprobadas Globalmente",
        description: "Frescura máxima y presentación impecable. Optimizan la conservación y evitan derrames.",
        longDescription: "Las almohadillas absorbentes Vencol (representando a Novipax) son esenciales para el control de líquidos (mioglobina) en bandejas de autoservicio. No solo mejoran la estética evitando el aspecto 'sangriento', sino que reducen la carga bacteriana al atrapar la humedad libre donde proliferan los microorganismos. Disponibles en diversas capacidades de absorción y colores para integrarse con el empaque.",
        subtitle1: "Frescura máxima y una presentación impecable",
        subtitle1Description: "Optimiza la conservación de tus productos y reduce el uso de envoltorios innecesarios. Nuestras almohadillas mejoran la apariencia visual de tus alimentos y evitan derrames durante la distribución, asegurando que todo llegue a su destino libre de contaminación y en perfectas condiciones.",
        subtitle2: "Protección, estética y respaldo para tu negocio",
        subtitle2Description: "Gracias a la tecnología de vanguardia de nuestros fabricantes, ponemos a tu alcance la variedad de soluciones más completa del mercado. Además, te brindamos atención especializada y acompañamiento constante, cuidando cada detalle desde que haces tu pedido hasta que lo recibes.",
        icon: Droplets,
        features: [
          "Núcleo de celulosa virgen y polímeros superabsorbentes.",
          "Retención de líquido bajo presión (el líquido no regresa).",
          "Variedad de colores (Blanco, Negro, Rojo) para branding.",
          "Disponibles en formatos precortados o en rollo.",
          "Certificación FDA para contacto directo con alimentos."
        ],
        images: [
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/vencol-foto-4-scaled.jpg",
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Absorbentes.webp",
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/vencol-foto-5-scaled.png",
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/vencol-foto-5-scaled.jpg"
        ]
      },
      {
        id: '4',
        slug: 'foils-para-etiquetas',
        title: "Foils para elaboración de etiquetas",
        description: "Visibilidad y resistencia. Soportan procesos de congelación y cocción.",
        longDescription: "Nuestros foils para etiquetas están diseñados para resistir las condiciones más exigentes de la cadena de frío. Ya sea para congelación profunda, refrigeración húmeda o procesos de cocción, garantizamos que la información de tu marca, códigos de barras y fechas de vencimiento permanezcan legibles e intactos desde la planta hasta la mesa del consumidor.",
        subtitle1: "Visibilidad y resistencia en cualquier condición",
        subtitle1Description: "Asegura que tu marca se mantenga visible y atractiva, incluso en los entornos más exigentes. Nuestras películas de etiquetado están diseñadas para soportar desde procesos de congelación hasta cocción, garantizando que la información de tu producto permanezca siempre legible e intacta.",
        subtitle2: "Innovación para comunicar el valor de tu producto",
        subtitle2Description: "Con nuestras soluciones de etiquetado, tu producto no solo luce impecable, sino que conecta de forma efectiva con tus consumidores. Fortalece tu presencia en el mercado comunicando calidad y confianza a través de una presentación profesional en cada empaque.",
        icon: Tag,
        features: [
          "Adhesivos especiales para superficies frías y húmedas.",
          "Resistencia a la abrasión y al roce durante el transporte.",
          "Calidad de impresión fotográfica.",
          "Materiales sintéticos resistentes al desgarro.",
          "Cumplimiento con normativas de etiquetado alimentario."
        ],
        images: [
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Foils-Etiquetas.webp"
        ]
      },
      {
        id: '5',
        slug: 'foils-de-marcacion',
        title: "Foils de marcación",
        description: "Codificación precisa. Cintas de transferencia térmica para trazabilidad perfecta.",
        longDescription: "Asegura la trazabilidad de tus productos con nuestros foils de marcación para impresión de datos variables (lote, fecha de caducidad, códigos QR). Ofrecemos cintas (ribbons) de cera, cera-resina y resina pura, compatibles con las principales impresoras del mercado (Zebra, Videojet, Markem, etc.), garantizando nitidez y anclaje sobre films flexibles y etiquetas.",
        subtitle1: "Máxima protección y diseño para tus productos",
        subtitle1Description: "Maximiza la seguridad y la imagen de tus productos con nuestros films de empaque de alto rendimiento. Gracias a su combinación de resistencia y flexibilidad, tienes en tus manos la solución perfecta para adaptarte a cualquier aplicación que tu negocio necesite.",
        subtitle2: "Calidad y durabilidad en cada rollo",
        subtitle2Description: "Nuestros films están diseñados para darte una selladura hermética superior, protegiendo tus alimentos contra la contaminación y el deterioro. Al mismo tiempo, logran que tu marca destaque con una apariencia impecable y profesional en el punto de venta.",
        icon: PenTool,
        features: [
          "Alta definición para códigos de barras y textos pequeños.",
          "Excelente anclaje sobre sustratos plásticos (PE, PP, PET).",
          "Resistencia a solventes y aceites.",
          "Formulaciones libres de metales pesados.",
          "Cabezales de impresión protegidos gracias al back-coating."
        ],
        images: [
          "https://images.unsplash.com/photo-1562254492-377a3ac57694?auto=format&fit=crop&q=80&w=1200",
          "http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/02/Foils-Marcacion.webp"
        ]
      }
    ] as Service[]
  },
  blog: {
    meta: {
      title: "Blog & Noticias",
      description: "Artículos educativos y tendencias sobre empaque, mioglobina y vida útil de alimentos."
    },
    hero: {
      title: "Lo que ves importa. Lo que NO ves, aún más.",
      description: "Nuestras soluciones lo absorben, lo retienen y mantienen la frescura visible."
    },
    posts: [
      {
        id: 1,
        title: "¿Qué es la mioglobina?",
        excerpt: "El líquido rojo no es sangre, es agua con proteínas. Descubre cómo afecta la frescura y la percepción del cliente.",
        date: "Oct 24, 2023",
        image: "https://picsum.photos/id/431/400/250",
        category: "Educativo"
      },
      {
        id: 2,
        title: "Innovación en Empaques",
        excerpt: "Nuevas tecnologías Cryovac para extender la vida útil de productos cárnicos y reducir devoluciones.",
        date: "Nov 12, 2023",
        image: "https://picsum.photos/id/225/400/250",
        category: "Tecnología"
      },
      {
        id: 3,
        title: "Sostenibilidad Alimentaria",
        excerpt: "Cómo la reducción de desperdicios impacta positivamente en el medio ambiente y en tu rentabilidad.",
        date: "Dic 05, 2023",
        image: "https://picsum.photos/id/292/400/250",
        category: "Medio Ambiente"
      },
      {
        id: 4,
        title: "Tendencias 2025 en Retail",
        excerpt: "Lo que los supermercados líderes están exigiendo a sus proveedores de frescos.",
        date: "Ene 15, 2024",
        image: "https://picsum.photos/id/112/400/250",
        category: "Mercado"
      },
      {
        id: 5,
        title: "Seguridad Alimentaria",
        excerpt: "Protocolos esenciales para evitar la contaminación cruzada en plantas de procesamiento.",
        date: "Feb 02, 2024",
        image: "https://picsum.photos/id/75/400/250",
        category: "Seguridad"
      }
    ] as BlogPost[]
  },
  contact: {
    meta: {
      title: "Contacto",
      description: "Ponte en contacto con nuestro equipo de expertos en Miami. Atención para toda Latinoamérica."
    },
    hero: {
      title: "Nuestro equipo responde rápidamente.",
      description: "¿Listo para hacer visible la frescura de tus productos? Hablemos.",
      bgimage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
      badge: "Contáctanos"
    },

    cards: [
      {
        icon: Mail,
        title: "Email",
        description: "Escríbenos para cualquier consulta.",
        action: "info@bencol.com",
        link: "mailto:info@bencol.com"
      },
      {
        icon: Phone,
        title: "Teléfono / WhatsApp",
        description: "Atención personalizada.",
        action: "+1 (786) 258-4495",
        link: "tel:+17862584495"
      }
    ],
    coverage: {
      title: "Área de Cobertura",
      description: "Atendemos clientes en 5 países de América y gestionamos exportaciones a mercados exigentes como Japón."
    },
    form: {
      title: "Fill Out This Form To Connect Directly With Our Experts", // Updated title to match image vibe or keep Spanish if preferred, user said "structure of image"
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Email",
      topic: "Asunto",
      message: "Mensaje",
      submit: "Enviar Mensaje"
    },
    infoSection: {
      title: "Aquí están las mejores formas de contactar a nuestro equipo",
      description: "Estamos listos para atenderte en cualquiera de nuestras sedes o canales digitales.",
      badge: "Contáctanos Directamente"
    }
  },
  newsletter: {
    title: "Únete a nuestro boletín",
    description: "Recibe las últimas noticias y actualizaciones de la industria.",
    placeholder: "Tu correo electrónico",
    buttonText: "Suscribirse"
  }
};