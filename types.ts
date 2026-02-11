import { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  path: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string; // Short description for the card
  longDescription: string; // Full description for the detail page
  subtitle1: string;
  subtitle1Description: string;
  subtitle2: string;
  subtitle2Description: string;
  icon: LucideIcon;
  features: string[];
  images: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}