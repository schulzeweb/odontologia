import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Phone, Sparkles, X, Send, ArrowRight, Star, Microscope, ScanFace, Coffee, Plus, Minus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const revealImage = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'glass-luxury py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="font-serif text-2xl font-light tracking-[0.2em] uppercase text-brand-900">Lumina</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-10">
            {['Experiência', 'Tratamentos', 'Tecnologia', 'Resultados'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-[10px] uppercase tracking-[0.2em] text-ink-light hover:text-brand-700 transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-700 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <Link to="/admin" className="hidden lg:block text-[10px] uppercase tracking-[0.2em] text-ink-light/40 hover:text-brand-700 transition-colors">Acesso Restrito</Link>
            <button className="relative group flex items-center gap-3 bg-brand-900 text-white px-7 py-3 rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-brand-900/20">
              <div className="absolute inset-0 bg-brand-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Phone className="w-3.5 h-3.5 relative z-10" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold relative z-10">Agendar Agora</span>
            </button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-surface">
        <motion.div 
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Dental Clinic" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/80 to-surface"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block text-[10px] uppercase tracking-[0.5em] text-brand-700 mb-10 font-bold bg-brand-50 px-6 py-2 rounded-full"
            >
              The New Standard of Excellence
            </motion.span>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-[13vw] md:text-[9vw] leading-[0.8] font-light tracking-tighter mb-8 uppercase text-ink"
            >
              Sorrisos que
              <br />
              <span className="italic text-brand-800 font-normal">Inspiram</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-ink-light font-light max-w-2xl mx-auto mb-14 leading-relaxed"
            >
              Onde a precisão cirúrgica encontra a estética de luxo. 
              Protocolos exclusivos para quem não aceita nada menos que a perfeição.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-6 bg-brand-700 text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-brand-700/30"
              >
                <div className="absolute inset-0 bg-brand-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold relative z-10">Descobrir meu novo sorriso</span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-brand-700 transition-all duration-500">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-brand-900/30"
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-brand-700 to-transparent"
          ></motion.div>
        </motion.div>
      </section>

      {/* Experience Section with Reveal */}
      <section id="experiência" className="py-40 px-6 md:px-12 bg-paper relative">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealImage}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop" 
              alt="Dr. Especialista" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-brand-900/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 border-[20px] border-white/10 rounded-3xl pointer-events-none"></div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-[10px] uppercase tracking-[0.4em] text-brand-600 mb-6 block font-bold">A Nova Era da Odontologia</motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-5xl md:text-7xl font-light text-ink mb-10 leading-[1.1]">
              A arte de criar <br/>
              <span className="italic text-brand-800">obras-primas vivas.</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-8 text-lg text-ink-light font-light leading-relaxed max-w-xl">
              <p>
                Na Lumina, transcendemos a odontologia convencional. Cada sorriso é tratado como uma escultura única, onde a biologia e a estética convergem em harmonia absoluta.
              </p>
              <p>
                Nosso compromisso é com a invisibilidade do tratamento: resultados tão naturais que apenas você e nós saberemos o segredo por trás da sua nova confiança.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-2 gap-12 border-t border-thin-light pt-12">
              <div className="group cursor-default">
                <span className="block font-serif text-5xl text-brand-700 mb-3 transition-transform duration-500 group-hover:-translate-y-2">15+</span>
                <span className="text-[10px] text-ink-light uppercase tracking-[0.2em] font-bold">Anos de Maestria</span>
              </div>
              <div className="group cursor-default">
                <span className="block font-serif text-5xl text-brand-700 mb-3 transition-transform duration-500 group-hover:-translate-y-2">3k+</span>
                <span className="text-[10px] text-ink-light uppercase tracking-[0.2em] font-bold">Vidas Transformadas</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technology Section with 3D Cards */}
      <section id="tecnologia" className="py-40 px-6 md:px-12 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-100 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.5em] text-brand-100 mb-6 block font-bold"
            >
              State-of-the-art
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl font-light"
            >
              Tecnologia <span className="italic text-brand-100">Invisível</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <ScanFace className="w-10 h-10" />,
                title: "Scanner 3D Itero",
                desc: "Mapeamento digital de alta definição que elimina moldagens físicas e garante previsibilidade total."
              },
              {
                icon: <Microscope className="w-10 h-10" />,
                title: "Microscopia Zeiss",
                desc: "Tratamentos executados sob magnificação extrema para preservação máxima da estrutura dental."
              },
              {
                icon: <Coffee className="w-10 h-10" />,
                title: "Sedação Consciente",
                desc: "Protocolos de relaxamento profundo que transformam sua visita em uma experiência de spa."
              }
            ].map((tech, i) => (
              <TiltCard key={i} index={i}>
                <div className="p-12 h-full border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-start transition-all duration-500 hover:border-white/30">
                  <div className="text-brand-100 mb-10 p-4 bg-white/5 rounded-2xl">{tech.icon}</div>
                  <h3 className="font-serif text-2xl mb-6 font-light">{tech.title}</h3>
                  <p className="text-white/50 text-base leading-relaxed font-light">{tech.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Staggered Reveal */}
      <section id="tratamentos" className="py-40 px-6 md:px-12 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-600 mb-6 block font-bold">Nossos Protocolos</span>
              <h2 className="font-serif text-5xl md:text-7xl font-light text-ink">Excelência <span className="italic text-brand-800">em Detalhes</span></h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-ink-light max-w-md text-lg font-light leading-relaxed"
            >
              Soluções personalizadas que combinam as técnicas mais avançadas do mundo com um olhar artístico apurado.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 border-t border-l border-thin-light bg-paper shadow-2xl"
          >
            {[
              {
                num: "01",
                title: "Lentes em Porcelana",
                desc: "Facetas de espessura mínima (0.2mm) que devolvem a harmonia natural sem comprometer a saúde dental."
              },
              {
                num: "02",
                title: "Implantes de Carga Imediata",
                desc: "Recupere sua função e estética em 24 horas com planejamento digital e cirurgia guiada sem cortes."
              },
              {
                num: "03",
                title: "Invisalign Diamond",
                desc: "O sistema de alinhadores mais avançado do mundo, planejado por especialistas Diamond Provider."
              }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="p-16 border-r border-b border-thin-light hover:bg-surface transition-all duration-700 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <span className="font-serif text-4xl text-brand-100 mb-16 block group-hover:text-brand-700 transition-colors duration-500">{service.num}</span>
                <h3 className="font-serif text-3xl mb-6 font-light text-ink group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
                <p className="text-ink-light text-base leading-relaxed font-light mb-12">{service.desc}</p>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-700 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Saber mais <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results Section with Parallax Background */}
      <section id="resultados" className="py-40 px-6 md:px-12 bg-paper relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.5em] text-brand-600 mb-6 block font-bold"
            >
              The Transformation
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl font-light text-ink"
            >
              A Arte da <span className="italic text-brand-800">Metamorfose</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </section>

      {/* Testimonials with Floating Animation */}
      <section className="py-40 px-6 md:px-12 bg-surface relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.5em] text-brand-600 mb-6 block font-bold"
            >
              Voices of Excellence
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl font-light text-ink"
            >
              Relatos de <span className="italic text-brand-800">Confiança</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                text: "O nível de perfeccionismo é algo que nunca vi em outra clínica. Minhas lentes de porcelana ficaram tão naturais que ninguém percebe que não são meus dentes originais.",
                author: "Ricardo Menezes",
                role: "CEO & Investidor"
              },
              {
                text: "Sempre tive pavor de procedimentos dentários. O protocolo de sedação consciente da Lumina mudou minha vida. Fiz toda a reabilitação sem sentir absolutamente nada.",
                author: "Helena Siqueira",
                role: "Arquiteta de Luxo"
              },
              {
                text: "A previsibilidade do planejamento digital me deu a segurança que eu precisava. O resultado final foi exatamente o que vi na tela na primeira consulta. Impecável.",
                author: "Amanda Viana",
                role: "Diretora Criativa"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="p-14 bg-paper border border-thin-light rounded-[40px] shadow-xl shadow-brand-900/5 relative group"
              >
                <div className="absolute top-10 right-10 text-brand-100 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                  <Star className="w-12 h-12 fill-current" />
                </div>
                <div className="flex gap-1 text-brand-500 mb-10">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-ink-light text-lg leading-relaxed font-light mb-12 italic relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 font-serif text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-ink text-sm tracking-wide">{testimonial.author}</p>
                    <p className="text-[10px] text-ink-light uppercase tracking-[0.2em] mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ with Smooth Accordion */}
      <section className="py-40 px-6 md:px-12 bg-paper border-t border-thin-light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.5em] text-brand-600 mb-6 block font-bold"
            >
              Common Inquiries
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl font-light text-ink"
            >
              Esclarecendo <span className="italic text-brand-800">Dúvidas</span>
            </motion.h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "O procedimento de Lentes de Porcelana é reversível?",
                a: "Trabalhamos com preparos minimamente invasivos. Embora a porcelana seja permanente, nossa técnica preserva o máximo de estrutura natural possível, garantindo a saúde do dente a longo prazo."
              },
              {
                q: "Qual a diferença entre a Lumina e clínicas convencionais?",
                a: "A diferença reside na exclusividade. Atendemos um número limitado de pacientes por dia para garantir foco total, utilizamos laboratórios de prótese de elite e tecnologia de ponta em cada etapa."
              },
              {
                q: "Como funciona o protocolo de Sedação Consciente?",
                a: "Sob supervisão de um médico anestesista, você entra em um estado de relaxamento profundo. Você permanece acordado e capaz de responder, mas sem qualquer ansiedade ou percepção de dor."
              },
              {
                q: "Posso ver como ficará meu sorriso antes de começar?",
                a: "Sim. Através do Digital Smile Design (DSD), criamos um protótipo físico (mock-up) que você 'testa' na boca antes de iniciarmos qualquer procedimento definitivo."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Magnetic Feel */}
      <section className="py-40 px-6 md:px-12 bg-brand-900 text-center relative overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-700/20 rounded-full blur-[120px]"
        ></motion.div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl md:text-8xl font-light text-white mb-12 leading-tight"
          >
            Sua jornada para a <br/>
            <span className="italic text-brand-100">perfeição começa aqui.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-100 text-xl font-light mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Agende sua consulta de imersão e descubra por que somos a escolha das mentes mais exigentes do país.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-6 bg-white text-brand-900 px-14 py-6 rounded-full transition-all duration-700 shadow-2xl shadow-white/10"
          >
            <span className="text-[12px] uppercase tracking-[0.4em] font-bold">Iniciar Atendimento VIP</span>
            <div className="w-12 h-12 rounded-full bg-brand-700 text-white flex items-center justify-center group-hover:bg-brand-900 transition-colors">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 bg-ink text-white border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <span className="font-serif text-3xl font-light tracking-[0.3em] uppercase text-brand-100 mb-8 block">Lumina</span>
            <p className="text-white/40 font-light max-w-sm leading-relaxed">
              Excelência em odontologia estética e reabilitação oral. 
              Um novo conceito em saúde, arte e exclusividade.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-brand-500">Navegação</h4>
            <ul className="space-y-4">
              {['Experiência', 'Tratamentos', 'Tecnologia', 'Resultados'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition-colors font-light">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-brand-500">Contato</h4>
            <ul className="space-y-4">
              <li className="text-sm text-white/60 font-light">Av. Brigadeiro Faria Lima, 4500</li>
              <li className="text-sm text-white/60 font-light">Itaim Bibi, São Paulo - SP</li>
              <li className="text-sm text-white/60 font-light">+55 (11) 99999-8888</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">© 2026 Lumina Odontologia. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ChatModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function TiltCard({ children, index }: { children: React.ReactNode, index: number, key?: React.Key }) {
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-thin-light rounded-[24px] overflow-hidden bg-surface transition-all duration-500 hover:border-brand-200"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-10 py-8 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-xl font-light text-ink group-hover:text-brand-700 transition-colors">{question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-brand-700 ml-4 flex-shrink-0"
        >
          <Plus className="w-6 h-6" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-10 text-lg text-ink-light font-light leading-relaxed border-t border-thin-light pt-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in event 
      ? event.touches[0].clientX - rect.left 
      : (event as React.MouseEvent).clientX - rect.left;
    
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  return (
    <div 
      className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden group cursor-ew-resize select-none border border-thin-light shadow-2xl rounded-[40px]"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleMove}
    >
      {/* After Image (Base) */}
      <img 
        src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop" 
        alt="Depois" 
        className="absolute inset-0 w-full h-full object-cover" 
        referrerPolicy="no-referrer" 
        draggable="false"
        loading="lazy"
      />
      <div className="absolute bottom-10 right-10 text-[10px] uppercase tracking-[0.2em] font-bold bg-white/90 backdrop-blur-md px-6 py-3 text-brand-900 border border-white/20 z-10 shadow-sm rounded-full">Depois</div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" 
          alt="Antes" 
          className="absolute inset-0 w-[100vw] max-w-none h-full object-cover opacity-80 grayscale" 
          style={{ width: '100%', minWidth: '1000px' }}
          referrerPolicy="no-referrer" 
          draggable="false"
          loading="lazy"
        />
        <div className="absolute bottom-10 left-8 text-[10px] uppercase tracking-[0.2em] font-bold bg-ink/80 backdrop-blur-md px-6 py-3 text-white z-10 rounded-full">Antes</div>
      </div>

      {/* Slider Handle - Minimalist */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl flex items-center justify-center absolute border border-brand-100 group-active:scale-90 transition-transform">
          <div className="w-1 h-3 bg-brand-700 rounded-full mx-0.5"></div>
          <div className="w-1 h-3 bg-brand-700 rounded-full mx-0.5"></div>
        </div>
      </div>
    </div>
  );
}

function ChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          role: 'ai',
          text: "Bem-vindo à Lumina. Sou seu Concierge Digital. Para iniciarmos sua pré-avaliação, seu interesse principal é em transformação estética (Lentes/Clareamento) ou reabilitação (Implantes)?"
        }
      ]);
      setIsTyping(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `Você é o Concierge Digital da Clínica Lumina, uma clínica odontológica de luxo padrão suíço. 
          Seu objetivo é fazer uma triagem inicial elegante e acolhedora. 
          
          DIRETRIZES DE COMUNICAÇÃO:
          1. Seja extremamente educado e use um vocabulário refinado.
          2. Fale sobre Lentes de Porcelana, Implantes e Invisalign como soluções de elite.
          3. Tente extrair o NOME REAL do usuário, o TELEFONE e o INTERESSE principal.
          4. Não dê diagnósticos médicos, apenas informações gerais.
          
          GATILHO DE SALVAMENTO (save_lead):
          - Assim que o usuário fornecer o NOME e pelo menos uma outra informação (telefone ou interesse), você DEVE chamar a ferramenta 'save_lead'.
          - NÃO invente nomes. Se não souber o nome, pergunte educadamente: "Com quem tenho a honra de falar?".
          - Estime o preço (price) baseado no interesse: Lentes (R$ 35k+), Implantes (R$ 45k+), Invisalign (R$ 18k+).
          - Defina a urgência (urgency) como ALTA (se houver dor ou evento próximo), MÉDIA ou BAIXA.
          - O status deve ser sempre 'PENDENTE' inicialmente.`,
          tools: [{
            functionDeclarations: [{
              name: "save_lead",
              description: "Registra os dados do paciente para análise da Dra. Camila.",
              parameters: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Nome completo do paciente" },
                  phone: { type: Type.STRING, description: "Telefone de contato (WhatsApp)" },
                  interest: { type: Type.STRING, description: "Procedimento de interesse" },
                  price: { type: Type.STRING, description: "Estimativa de investimento" },
                  urgency: { type: Type.STRING, description: "Nível de urgência: ALTA, MÉDIA ou BAIXA" },
                  details: { type: Type.STRING, description: "Resumo das necessidades do paciente" }
                },
                required: ["name", "phone", "interest", "price", "urgency", "details"]
              }
            }]
          }]
        }
      });

      // Check for function calls
      const functionCalls = response.functionCalls;
      if (functionCalls) {
        for (const call of functionCalls) {
          if (call.name === "save_lead") {
            const args = call.args as any;
            await fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: args.name,
                phone: args.phone,
                interest: args.interest,
                price: args.price,
                urgency: args.urgency,
                details: args.details,
                status: 'PENDENTE'
              })
            });
            console.log("Lead saved successfully:", args.name);
          }
        }
      }

      const aiText = response.text || "Entendido. A Dra. Camila entrará em contato em breve para darmos continuidade ao seu atendimento personalizado.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Lamento, mas estou com dificuldade de conexão no momento. Por favor, tente novamente em instantes." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/60 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-xl bg-paper border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] flex flex-col h-[700px] max-h-[90vh] rounded-[40px] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-10 border-b border-thin-light flex items-center justify-between bg-surface/50 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-700/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light tracking-wide text-ink">Lumina Concierge</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-light font-bold">Online Agora</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if(confirm("Deseja reiniciar o atendimento?")) {
                  setMessages([{
                    role: 'ai',
                    text: "Bem-vindo à Lumina. Sou seu Concierge Digital. Para iniciarmos sua pré-avaliação, seu interesse principal é em transformação estética (Lentes/Clareamento) ou reabilitação (Implantes)?"
                  }]);
                }
              }}
              className="text-[10px] uppercase tracking-[0.2em] text-ink-light hover:text-brand-700 font-bold transition-colors"
            >
              Reiniciar
            </button>
            <button onClick={onClose} className="p-3 hover:bg-surface transition-colors text-ink-light hover:text-ink rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-paper">
          <div className="text-center text-[10px] uppercase tracking-[0.3em] text-ink-light/30 mb-12">Protocolo de Atendimento VIP Iniciado</div>
          
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-7 text-base leading-relaxed font-light rounded-[32px] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-700 text-white rounded-tr-none' 
                  : 'bg-surface text-ink border border-thin-light rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-surface border border-thin-light p-7 rounded-[32px] rounded-tl-none flex gap-2 items-center">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-10 border-t border-thin-light bg-surface/50 backdrop-blur-md">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Sua resposta..." 
              className="w-full bg-paper border border-thin-light rounded-full py-5 pl-8 pr-16 text-base font-light focus:outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-300/10 transition-all placeholder:text-ink-light/30"
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-3 w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center text-white hover:bg-brand-900 transition-all shadow-lg shadow-brand-700/20 disabled:opacity-50"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
