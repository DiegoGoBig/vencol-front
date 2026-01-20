import { Package, Layers, Droplets, Tag, PenTool } from 'lucide-react';
import { Service } from '../types';

export const solutionsData: Service[] = [
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
];