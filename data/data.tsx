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
        "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/hero_1.jpg",
        "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/hero_2.jpg",
        "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/hero_3.jpg"
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
      image: "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/Asesoria-Tecnica-y-Comercial.png",
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
        "https://vencol.com/wp-content/uploads/elementor/thumbs/SEE_2-1-qz6m2v8i6jqxwcl94lxo7jjx1yelc8htqixpb7kpa8.png", 
        "https://vencol.com/wp-content/uploads/elementor/thumbs/Sealed-Air_2-qz6l0bupz2zpvwki5y8bz9nk98ctqzi0fs10yspse8.png", 
        "https://vencol.com/wp-content/uploads/elementor/thumbs/Novipax_2-1-qz6m2uanzppnkqmma3j1n1sggkj84je3eea7txm3gg.png", 
        "https://plum-starling-379018.hostingersite.com/wp-content/uploads/2026/01/Grupo-Bios-scaled.jpg", 
        "https://vencol.com/wp-content/uploads/elementor/thumbs/Cryovac_2-qz6l7wfx11cvetkjy8252cv8iz19r7k6597u51hm9s.png"
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
          question: "¿El líquido rojo en las bandejas es sangre?",
          answer: "No, es agua con proteínas (mioglobina). Cuando no se controla, se convierte en un caldo perfecto para bacterias. Nuestras soluciones lo absorben y retienen para garantizar la inocuidad."
        },
        {
          question: "¿Cómo extienden la vida útil de los alimentos?",
          answer: "Utilizamos una combinación de films de barrera multicapa y almohadillas absorbentes tecnológicas que controlan la atmósfera interna y la humedad, retrasando significativamente el crecimiento bacteriano y la oxidación."
        },
        {
          question: "¿Ofrecen soporte técnico para la maquinaria?",
          answer: "Sí, contamos con un equipo especializado que realiza diagnósticos en planta, calibración de equipos de sellado y capacitación a su personal para asegurar el máximo rendimiento de los insumos."
        },
        {
          question: "¿Realizan envíos a nivel internacional?",
          answer: "Absolutamente. Actualmente atendemos operaciones en 5 países de América y gestionamos la logística para cumplir con los estándares de exportación necesarios."
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
      cta: "Aprende más"
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
        title: "Bolsas Termoencogibles Cryovac",
        description: "Seguridad alimentaria de alto rendimiento. Barrera superior contra oxígeno y humedad.",
        longDescription: "Las bolsas termoencogibles Cryovac representan el estándar de oro en la industria del empaque de proteínas. Diseñadas con tecnología multicapa patentada, estas bolsas se encogen al contacto con el calor para ajustarse como una segunda piel al producto, eliminando el oxígeno residual y maximizando la vida útil. Son ideales para carnes frescas, procesadas y quesos, ofreciendo una resistencia excepcional a la punción y una claridad óptica que resalta la frescura natural del alimento.",
        icon: Package,
        features: [
          "Alta barrera al oxígeno para prevenir la oxidación.",
          "Encogimiento superior para una presentación sin arrugas.",
          "Resistencia extrema a la punción y al abuso en transporte.",
          "Compatibles con sistemas de vacío rotativos y de cámara.",
          "Disponibles en múltiples calibres según el tipo de hueso o corte."
        ],
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200"
      },
      {
        id: '2',
        slug: 'film-termoformado',
        title: "Film de Empaque Termoformado",
        description: "Tecnología de vanguardia. Selladura hermética y resistencia mecánica superior.",
        longDescription: "Nuestros films para termoformado están diseñados para máquinas de alto rendimiento, permitiendo crear envases a medida directamente en la línea de producción. Ofrecemos tanto films flexibles como semirrígidos, con propiedades de termoformado profundo que garantizan un espesor uniforme en las esquinas. Esta solución optimiza los costos logísticos y mejora la presentación en el lineal, permitiendo una visibilidad 360° del producto.",
        icon: Layers,
        features: [
          "Formabilidad excepcional para cavidades profundas.",
          "Sellado hermético incluso con contaminantes en el área de sellado.",
          "Propiedades antifog (anti-vaho) para máxima claridad.",
          "Estructuras de alta barrera para atmósfera modificada (MAP).",
          "Reducción de micraje sin sacrificar resistencia (Sostenibilidad)."
        ],
        image: "https://images.unsplash.com/photo-1595411425732-e69c1ce81eb1?auto=format&fit=crop&q=80&w=1200"
      },
      {
        id: '3',
        slug: 'absorbentes-tipo-almohadilla',
        title: "Absorbentes Tipo Almohadilla",
        description: "Frescura máxima y presentación impecable. Optimizan la conservación y evitan derrames.",
        longDescription: "Las almohadillas absorbentes Vencol (representando a Novipax) son esenciales para el control de líquidos (mioglobina) en bandejas de autoservicio. No solo mejoran la estética evitando el aspecto 'sangriento', sino que reducen la carga bacteriana al atrapar la humedad libre donde proliferan los microorganismos. Disponibles en diversas capacidades de absorción y colores para integrarse con el empaque.",
        icon: Droplets,
        features: [
          "Núcleo de celulosa virgen y polímeros superabsorbentes.",
          "Retención de líquido bajo presión (el líquido no regresa).",
          "Variedad de colores (Blanco, Negro, Rojo) para branding.",
          "Disponibles en formatos precortados o en rollo.",
          "Certificación FDA para contacto directo con alimentos."
        ],
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
      },
      {
        id: '4',
        slug: 'foils-para-etiquetas',
        title: "Foils para Etiquetas",
        description: "Visibilidad y resistencia. Soportan procesos de congelación y cocción.",
        longDescription: "Nuestros foils para etiquetas están diseñados para resistir las condiciones más exigentes de la cadena de frío. Ya sea para congelación profunda, refrigeración húmeda o procesos de cocción, garantizamos que la información de tu marca, códigos de barras y fechas de vencimiento permanezcan legibles e intactos desde la planta hasta la mesa del consumidor.",
        icon: Tag,
        features: [
          "Adhesivos especiales para superficies frías y húmedas.",
          "Resistencia a la abrasión y al roce durante el transporte.",
          "Calidad de impresión fotográfica.",
          "Materiales sintéticos resistentes al desgarro.",
          "Cumplimiento con normativas de etiquetado alimentario."
        ],
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1200"
      },
      {
        id: '5',
        slug: 'foils-de-marcacion',
        title: "Foils de Marcación (Data Variable)",
        description: "Codificación precisa. Cintas de transferencia térmica para trazabilidad perfecta.",
        longDescription: "Asegura la trazabilidad de tus productos con nuestros foils de marcación para impresión de datos variables (lote, fecha de caducidad, códigos QR). Ofrecemos cintas (ribbons) de cera, cera-resina y resina pura, compatibles con las principales impresoras del mercado (Zebra, Videojet, Markem, etc.), garantizando nitidez y anclaje sobre films flexibles y etiquetas.",
        icon: PenTool,
        features: [
          "Alta definición para códigos de barras y textos pequeños.",
          "Excelente anclaje sobre sustratos plásticos (PE, PP, PET).",
          "Resistencia a solventes y aceites.",
          "Formulaciones libres de metales pesados.",
          "Cabezales de impresión protegidos gracias al back-coating."
        ],
        image: "https://images.unsplash.com/photo-1562254492-377a3ac57694?auto=format&fit=crop&q=80&w=1200"
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