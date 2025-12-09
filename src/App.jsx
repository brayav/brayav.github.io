import {
    BookOpen,
    Bot,
    Clock,
    Cpu,
    Download,
    Gift,
    Github,
    Instagram,
    Layers,
    Layout,
    Linkedin,
    Mail,
    Palette,
    Server,
    Snowflake,
    Sparkles,
    Star,
    Terminal,
    TreePine,
    Volume2,
    VolumeX,
    X // Icono para cerrar el modal
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * ------------------------------------------------------------------
 * 1. FONDO 3D NAVIDEÑO
 * ------------------------------------------------------------------
 */
const ChristmasBackground3D = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const snowflakes = [];
        const stars = [];

        const CONFIG = {
            snowCount: 100,
            starCount: 40,
            connectionDistance: 100,
            windSpeed: 0.3,
            snowflakeTypes: ['❄️', '✨', '⭐', '🎄']
        };

        const resize = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.clientWidth;
                canvas.height = containerRef.current.clientHeight;
            }
        };

        const createSnowflakes = () => {
            snowflakes.length = 0;
            for (let i = 0; i < CONFIG.snowCount; i++) {
                const typeIdx = Math.floor(Math.random() * CONFIG.snowflakeTypes.length);
                const size = Math.random() * 5 + 1;
                const depth = Math.random() * 0.5 + 0.5;
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * CONFIG.windSpeed * depth,
                    vy: Math.random() * 0.5 + 0.3,
                    size: size * depth,
                    type: CONFIG.snowflakeTypes[typeIdx],
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    opacity: 0.3 + Math.random() * 0.7,
                    depth: depth,
                    wobble: Math.random() * Math.PI * 2,
                    wobbleSpeed: Math.random() * 0.03 + 0.01
                });
            }
        };

        const createStars = () => {
            stars.length = 0;
            for (let i = 0; i < CONFIG.starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.4 + 0.2,
                    pulseSpeed: Math.random() * 0.02 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2
                });
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;

            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0a0a0a');
            gradient.addColorStop(1, '#050505');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                const pulse = (Math.sin(Date.now() * star.pulseSpeed + star.pulseOffset) + 1) / 2;
                const currentOpacity = star.opacity + pulse * 0.3;
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            snowflakes.forEach(flake => {
                flake.x += flake.vx;
                flake.y += flake.vy;
                flake.rotation += flake.rotationSpeed;
                flake.wobble += flake.wobbleSpeed;

                const wobbleX = Math.sin(flake.wobble) * 2 * flake.depth;

                if (flake.y > canvas.height + 10) {
                    flake.y = -10;
                    flake.x = Math.random() * canvas.width;
                }
                if (flake.x > canvas.width + 10) flake.x = -10;
                if (flake.x < -10) flake.x = canvas.width + 10;

                ctx.save();
                ctx.translate(flake.x + wobbleX, flake.y);
                ctx.rotate(flake.rotation);

                if (flake.type === '❄️' || flake.type === '✨') {
                    ctx.fillStyle = `rgba(173, 216, 230, ${flake.opacity})`;
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (i * Math.PI) / 3;
                        const dx = Math.cos(angle) * flake.size;
                        const dy = Math.sin(angle) * flake.size;
                        const dx2 = Math.cos(angle + Math.PI / 6) * flake.size * 0.6;
                        const dy2 = Math.sin(angle + Math.PI / 6) * flake.size * 0.6;
                        if (i === 0) ctx.moveTo(dx, dy);
                        else ctx.lineTo(dx, dy);
                        ctx.lineTo(dx2, dy2);
                        ctx.lineTo(dx * 0.7, dy * 0.7);
                    }
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.fillStyle = flake.type === '⭐' ? `rgba(255, 255, 153, ${flake.opacity})` : `rgba(34, 197, 94, ${flake.opacity})`;
                    if (flake.type === '🎄') {
                        ctx.fillStyle = `rgba(34, 197, 94, ${flake.opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(0, -flake.size * 2);
                        ctx.lineTo(-flake.size, 0);
                        ctx.lineTo(flake.size, 0);
                        ctx.closePath();
                        ctx.fill();
                        ctx.fillStyle = `rgba(139, 69, 19, ${flake.opacity})`;
                        ctx.fillRect(-flake.size * 0.3, flake.size, flake.size * 0.6, flake.size);
                    } else {
                        ctx.beginPath();
                        ctx.arc(0, 0, flake.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.restore();
            });

            ctx.strokeStyle = 'rgba(173, 216, 230, 0.1)';
            ctx.lineWidth = 0.5;
            snowflakes.forEach((flake1, i) => {
                snowflakes.slice(i + 1).forEach(flake2 => {
                    const dx = flake1.x - flake2.x;
                    const dy = flake1.y - flake2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONFIG.connectionDistance) {
                        const opacity = (1 - dist / CONFIG.connectionDistance) * 0.3;
                        ctx.strokeStyle = `rgba(173, 216, 230, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(flake1.x, flake1.y);
                        ctx.lineTo(flake2.x, flake2.y);
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', () => { resize(); createSnowflakes(); createStars(); });
        resize(); createSnowflakes(); createStars(); draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-green-500 opacity-10"></div>
            </div>
        </div>
    );
};

/**
 * ------------------------------------------------------------------ 
 * 2. REPRODUCTOR DE MÚSICA INTELIGENTE
 * ------------------------------------------------------------------ 
 */
const ChristmasRadio = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // RUTA CORREGIDA: Apunta a la carpeta 'public'
        audioRef.current = new Audio("/music/navidad.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // INICIO ALEATORIO
        const randomStartTime = Math.random() * 90;
        audioRef.current.currentTime = randomStartTime;

        const tryPlay = async () => {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay bloqueado. Esperando interacción...");
                const startOnInteraction = () => {
                    if (audioRef.current) {
                        audioRef.current.play();
                        setIsPlaying(true);
                        window.removeEventListener('click', startOnInteraction);
                        window.removeEventListener('scroll', startOnInteraction);
                        window.removeEventListener('keydown', startOnInteraction);
                    }
                };
                window.addEventListener('click', startOnInteraction);
                window.addEventListener('scroll', startOnInteraction);
                window.addEventListener('keydown', startOnInteraction);
            }
        };

        tryPlay();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-fade-in-up">
            {isPlaying && (
                <div className="flex gap-1 mr-3 mb-1 h-4 items-end">
                    <span className="w-1 h-full bg-green-400 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-3/4 bg-red-400 animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-full bg-green-400 animate-[pulse_1s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-1/2 bg-yellow-400 animate-[pulse_0.5s_ease-in-out_infinite]"></span>
                </div>
            )}

            <button
                onClick={togglePlay}
                className={`
                    flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md border border-white/20
                    transition-all duration-300 hover:scale-105 active:scale-95
                    ${isPlaying
                        ? 'bg-gradient-to-r from-green-600 to-red-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                        : 'bg-black/60 text-gray-400'}
                `}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">
                    {isPlaying ? 'Navidad ON' : 'Play Música'}
                </span>
            </button>
        </div>
    );
};

/**
 * 3. CONTADOR INTERACTIVO CON MODAL (CUENTA REGRESIVA)
 */
const BirthdayCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const currentYear = now.getFullYear();
            let birthday = new Date(currentYear, 11, 24, 0, 0, 0); // 24 de Dic a las 00:00:00

            // Si ya pasó el 24 de este año, contar para el siguiente
            if (now.getTime() > birthday.getTime()) {
                birthday.setFullYear(currentYear + 1);
            }

            const difference = birthday - now;

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        // Actualizar cada segundo
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Formatear números a 2 dígitos (09 en vez de 9)
    const f = (n) => n.toString().padStart(2, '0');

    return (
        <>
            {/* VISTA MINI (En el Header) */}
            <div
                onClick={() => setIsModalOpen(true)}
                className="text-center group cursor-pointer p-2 rounded-xl transition-all hover:bg-white/5 active:scale-95"
                title="Click para ver cuenta regresiva"
            >
                <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock size={20} className="text-red-500 animate-[spin_3s_linear_infinite]" />
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500 font-mono group-hover:scale-110 transition-transform duration-300">
                        {timeLeft.days}
                    </p>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 group-hover:text-white transition-colors">
                    Días para mi Cumple
                </p>
            </div>

            {/* MODAL GIGANTE (Overlay) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in">

                    {/* Botón cerrar */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-red-600/80 text-white transition-all hover:rotate-90"
                    >
                        <X size={32} />
                    </button>

                    {/* Contenido del Modal */}
                    <div className="text-center p-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-400 mb-8 uppercase tracking-widest">
                            🎄 Cuenta Regresiva 🎂
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                            <TimeBox val={f(timeLeft.days)} label="DÍAS" color="text-red-500" />
                            <TimeBox val={f(timeLeft.hours)} label="HORAS" color="text-green-500" />
                            <TimeBox val={f(timeLeft.minutes)} label="MINUTOS" color="text-blue-400" />
                            <TimeBox val={f(timeLeft.seconds)} label="SEGUNDOS" color="text-yellow-400" />
                        </div>

                        <p className="mt-12 text-gray-400 text-sm animate-pulse">
                            Faltan {timeLeft.days} días para el 24 de Diciembre
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

// Componente auxiliar para las cajas de tiempo del modal
const TimeBox = ({ val, label, color }) => (
    <div className="flex flex-col items-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#1a1a1a] rounded-2xl border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform">
            <span className={`text-4xl sm:text-6xl font-mono font-bold ${color}`}>
                {val}
            </span>
        </div>
        <span className="mt-3 text-xs sm:text-sm font-bold text-gray-500 tracking-widest">{label}</span>
    </div>
);

/**
 * 4. COURSE TERMINAL
 */
const CourseTerminal = ({ courses }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.clientWidth;
                canvas.height = containerRef.current.clientHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 45; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 1.5 + 0.5
                });
            }
        };
        createParticles();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            particles.forEach((pt, i) => {
                pt.x += pt.vx; pt.y += pt.vy;
                if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1;
                if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1;
                ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
                particles.forEach((pt2, j) => {
                    if (i === j) return;
                    const dx = pt.x - pt2.x; const dy = pt.y - pt2.y; const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - (dist / 100) * 0.15})`;
                        ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(pt2.x, pt2.y); ctx.stroke();
                    }
                });
            });
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl bg-black border border-white/10 shadow-2xl font-mono group min-h-[320px]">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/10">
                <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div><div className="w-3 h-3 rounded-full bg-[#27c93f]"></div></div>
                <div className="text-xs text-gray-500 font-mono">certifications.js — BraxDev</div>
                <div className="w-10"></div>
            </div>
            <div className="relative z-10 p-6 text-xs sm:text-sm md:text-base overflow-x-auto">
                <div className="font-mono leading-relaxed">
                    <div><span className="text-purple-400">const</span> <span className="text-yellow-400">knowledgeBase</span> <span className="text-purple-400">=</span> <span className="text-white">[</span></div>
                    {courses.map((course, idx) => (
                        <div key={idx} className="pl-4 hover:bg-white/5 rounded transition-colors duration-200 cursor-default">
                            <span className="text-gray-500 select-none mr-2">{idx + 1}</span>
                            <span className="text-purple-400">{'{'}</span>
                            <span className="text-blue-400"> id</span>: <span className="text-orange-400">"{course.id}"</span>,
                            <span className="text-blue-400"> title</span>: <span className="text-green-400">"{course.name}"</span>,
                            <span className="text-blue-400"> issuer</span>: <span className="text-cyan-400">"{course.issuer}"</span>
                            <span className="text-purple-400"> {'}'}</span>,
                        </div>
                    ))}
                    <div><span className="text-white">];</span></div>
                    <div className="mt-4 text-gray-500 flex items-center"><span className="text-green-600 mr-2">// TODO:</span><span>Never stop learning...</span><span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1"></span></div>
                </div>
            </div>
        </div>
    );
};

const TiltCard = ({ children, className = "", noTilt = false }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    return (
        <div ref={cardRef} onMouseMove={(e) => {
            if (!cardRef.current || noTilt) return;
            const rect = cardRef.current.getBoundingClientRect();
            setRotation({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -15, y: ((e.clientX - rect.left) / rect.width - 0.5) * 15 });
        }} onMouseLeave={() => { setIsHovering(false); setRotation({ x: 0, y: 0 }); }} onMouseEnter={() => setIsHovering(true)}
            className={`relative transition-all duration-200 ease-out transform-gpu ${className}`}
            style={{ transform: isHovering && !noTilt ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` : 'perspective(1000px) scale3d(1, 1, 1)', zIndex: isHovering ? 10 : 1 }}>
            <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200 bg-gradient-to-tr from-white/10 to-transparent rounded-xl" style={{ opacity: isHovering ? 0.4 : 0 }} />
            {children}
        </div>
    );
};

const SkillBadge = ({ name, color }) => {
    const colors = { blue: '#3b82f6', cyan: '#06b6d4', green: '#22c55e', yellow: '#eab308', orange: '#f97316', red: '#ef4444', purple: '#a855f7', pink: '#ec4899', gray: '#6b7280' };
    const c = colors[color] || '#3b82f6';
    return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/5 hover:border-opacity-50 transition-colors group cursor-default" style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = c + '80'; e.currentTarget.style.backgroundColor = c + '1a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.backgroundColor = '#1a1a1a'; }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c, boxShadow: `0 0 8px ${c}40` }}></div>
            <span className="text-xs font-medium text-gray-300 group-hover:text-white">{name}</span>
        </div>
    );
};

const TechStack = ({ stack }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {stack.map((category, idx) => (
            <TiltCard key={idx} noTilt={true} className="h-full">
                <div className="h-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient} text-white`}><category.icon size={18} /></div>
                        <h3 className="font-bold text-gray-200 text-sm">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">{category.skills.map((skill, sIdx) => <SkillBadge key={sIdx} name={skill.name} color={skill.color} />)}</div>
                </div>
            </TiltCard>
        ))}
    </div>
);

const ProjectCarousel = ({ projects }) => {
    const [idx, setIdx] = useState(0);
    const [touch, setTouch] = useState({ start: 0, end: 0 });
    useEffect(() => { const i = setInterval(() => setIdx(p => (p + 1) % projects.length), 5000); return () => clearInterval(i); }, [projects.length]);
    return (
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm shadow-2xl" onTouchStart={e => setTouch({ ...touch, start: e.targetTouches[0].clientX })} onTouchMove={e => setTouch({ ...touch, end: e.targetTouches[0].clientX })} onTouchEnd={() => { if (touch.start - touch.end > 75) setIdx((idx + 1) % projects.length); if (touch.start - touch.end < -75) setIdx((idx - 1 + projects.length) % projects.length); }}>
            <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 group">
                <img src={projects[idx].image} alt={projects[idx].title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
                    <span className="text-blue-400 text-[10px] sm:text-xs font-mono mb-2 tracking-widest uppercase border border-blue-500/30 self-start px-2 py-1 rounded">Proyecto Destacado</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 leading-tight">{projects[idx].title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-3 sm:mb-6 max-w-lg line-clamp-2 sm:line-clamp-none">{projects[idx].desc}</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">{projects[idx].tags.map(tag => <span key={tag} className="text-[8px] sm:text-[10px] uppercase font-bold px-2 sm:px-3 py-1 bg-white/5 text-gray-300 rounded border border-white/10">{tag}</span>)}</div>
                </div>
            </div>
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                {projects.map((_, i) => (<button key={i} onClick={() => setIdx(i)} className={`min-w-[44px] min-h-[44px] flex items-center justify-center`}><span className={`block rounded-full transition-all duration-300 ${i === idx ? 'bg-blue-500 w-5 h-3' : 'bg-white/50 w-3 h-3 hover:bg-white/70'}`} /></button>))}
            </div>
        </div>
    );
};

/**
 * 5. DATA
 */
const PORTFOLIO_DATA = {
    profile: {
        name: "BraxDev", handle: "@braxdev", role: "Ingeniero de Sistemas", subRole: "Fullstack Developer & Automation Engineer",
        avatar: "/profile.png", bio: "Apasionado por crear soluciones que conectan el código con el impacto real. Especializado en automatizar procesos, construir sistemas escalables y transformar datos en decisiones.", cvLink: "#"
    },
    socials: [
        { icon: Github, link: "https://github.com/brayav", label: "GitHub" },
        { icon: Linkedin, link: "https://linkedin.com/in/brxdev", label: "LinkedIn" },
        { icon: Instagram, link: "https://instagram.com/brayan.mh__246", label: "Instagram" },
        { icon: Mail, link: "mailto:Brayan.manrrique2003@gmail.com", label: "Email" }
    ],
    courses: [
        { id: "SCRUM", name: "Scrum Fundamentals", issuer: "SCRUMstudy" },
        { id: "AZURE", name: "Azure Cloud Architect", issuer: "Microsoft Learn" },
        { id: "IOT", name: "Internet of Things & Arduino", issuer: "Cisco NetAcad" },
        { id: "SEC", name: "ISO/IEC 27001 Security", issuer: "CertiProf" },
        { id: "DATA", name: "Python for Data Science", issuer: "Udemy" }
    ],
    stack: [
        { title: "Frontend Development", icon: Layout, gradient: "from-blue-500 to-cyan-500", skills: [{ name: "React (Vite)", color: "blue" }, { name: "JavaScript", color: "yellow" }, { name: "TailwindCSS", color: "cyan" }, { name: "HTML5 / CSS3", color: "orange" }, { name: "Flet UI (Python)", color: "green" }] },
        { title: "Backend & Cloud", icon: Server, gradient: "from-green-500 to-emerald-500", skills: [{ name: "Python", color: "yellow" }, { name: "Node.js", color: "green" }, { name: "Firebase", color: "orange" }, { name: "Supabase", color: "cyan" }, { name: "SQL Server", color: "red" }, { name: "REST APIs", color: "purple" }] },
        { title: "AI & Automation", icon: Bot, gradient: "from-purple-500 to-pink-500", skills: [{ name: "ChatGPT", color: "green" }, { name: "n8n Automation", color: "purple" }, { name: "APIs", color: "blue" }, { name: "Computer Vision", color: "pink" }] },
        { title: "Design & Tools", icon: Palette, gradient: "from-orange-500 to-red-500", skills: [{ name: "Power BI", color: "yellow" }, { name: "Figma", color: "red" }, { name: "Git/GitHub", color: "gray" }, { name: "VS Code", color: "blue" }] }
    ],
    projects: [
        { title: "Sistema de Gestión de Practicantes — Hospital San José", desc: "Sistema desarrollado con Flet y Firebase para registrar practicantes, gestionar sedes, turnos y áreas, validar asistencia con QR y generar reportes automáticos para UADI.", image: "https://th.bing.com/th/id/R.e95a4a7c75ef0402c80c60d62fadbfe8?rik=%2bO1HfRAEGKdEUg&pid=ImgRaw&r=0", tags: ["Flet UI", "Firebase", "Python", "Automatización"] },
        { title: "Sistema Web de Inventario — SGH Solutions", desc: "Sistema de inventarios para registrar productos, movimientos, niveles de stock y dashboards. Incluye alertas automáticas y trazabilidad completa.", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800", tags: ["React", "TailwindCSS", "Supabase", "Node.js"] },
        { title: "Flujos Automáticos — n8n Workflow Suite", desc: "Automatizaciones conectando Google Sheets, Firestore y APIs externas. Reduce tiempos operativos y elimina tareas repetitivas dentro de instituciones.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800", tags: ["n8n", "APIs", "Automatización"] }
    ]
};

/**
 * 6. APP PRINCIPAL
 */
export default function App() {
    return (
        <div className="min-h-screen text-gray-100 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden pb-12">
            <ChristmasBackground3D />
            <ChristmasRadio />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center relative">
                <div className="absolute top-4 right-4 opacity-20 animate-pulse"><TreePine size={32} className="text-green-500" /></div>
                <div className="absolute top-4 left-4 opacity-20 animate-pulse"><Snowflake size={32} className="text-blue-300" /></div>
                <div className="absolute bottom-20 right-8 opacity-20 animate-bounce"><Gift size={28} className="text-red-500" /></div>

                <section className="w-full mb-8 sm:mb-12 animate-fade-in-down">
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                            <div className="relative flex-shrink-0">
                                <div className="relative p-1 bg-gradient-to-br from-blue-500/30 to-white/10 rounded-lg">
                                    <img src={PORTFOLIO_DATA.profile.avatar} alt="Avatar" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg object-cover bg-gray-900" />
                                </div>
                                <div className="absolute -top-2 -right-2"><Sparkles size={16} className="text-yellow-400 animate-spin" /></div>
                            </div>
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 flex items-center gap-1">
                                    <span className="text-red-500 font-light">{'{'}</span>{PORTFOLIO_DATA.profile.name}<span className="text-green-500 font-light">{'}'}</span>
                                </h1>
                                <p className="text-blue-400 font-mono text-sm sm:text-base mb-3">{PORTFOLIO_DATA.profile.handle}</p>
                                <p className="text-sm text-gray-300 font-semibold mb-1 flex items-center gap-2">{PORTFOLIO_DATA.profile.role}<Star size={12} className="text-yellow-500 animate-pulse" /></p>
                                <p className="text-xs sm:text-sm text-gray-400 mb-3">{PORTFOLIO_DATA.profile.subRole}</p>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    {PORTFOLIO_DATA.socials.map((social, idx) => (
                                        <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-200"><social.icon size={20} className="sm:w-6 sm:h-6" /></a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-shrink-0 mt-4 sm:mt-0">
                                <a href={PORTFOLIO_DATA.profile.cvLink} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-green-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,0,0,0.3)] text-sm sm:text-base">
                                    <Download size={16} className="sm:w-[18px] sm:h-[18px]" /> Descargar CV
                                </a>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
                            {/* CONTADOR DE CUMPLEAÑOS AQUÍ */}
                            <BirthdayCountdown />
                            <div className="text-center"><p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">12+</p><p className="text-[10px] sm:text-xs text-gray-400">proyectos creados</p></div>
                            <div className="text-center"><p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500">20+</p><p className="text-[10px] sm:text-xs text-gray-400">clientes satisfechos</p></div>
                        </div>
                    </div>
                </section>

                <section className="w-full mb-12">
                    <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-2 mb-4"><Terminal size={20} className="text-emerald-500" /><h2 className="text-lg font-bold text-white uppercase tracking-wider">Sobre Mí</h2><Snowflake size={16} className="text-blue-300 animate-spin ml-auto" /></div>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{PORTFOLIO_DATA.profile.bio}</p>
                    </div>
                </section>

                <section className="w-full mb-16">
                    <div className="flex items-center gap-2 mb-6"><Cpu size={20} className="text-blue-500" /><h2 className="text-lg font-bold text-white uppercase tracking-wider">Herramientas & Stack</h2></div>
                    <TechStack stack={PORTFOLIO_DATA.stack} />
                </section>

                <section className="w-full mb-16">
                    <div className="flex items-center gap-2 mb-6"><BookOpen size={20} className="text-yellow-500" /><h2 className="text-lg font-bold text-white uppercase tracking-wider">Certificaciones</h2></div>
                    <TiltCard noTilt={true}><CourseTerminal courses={PORTFOLIO_DATA.courses} /></TiltCard>
                </section>

                <section className="w-full mb-16">
                    <div className="flex items-center gap-2 mb-6"><Layers size={20} className="text-purple-500" /><h2 className="text-lg font-bold text-white uppercase tracking-wider">Proyectos Destacados</h2><Sparkles size={16} className="text-yellow-400 animate-pulse" /></div>
                    <TiltCard><ProjectCarousel projects={PORTFOLIO_DATA.projects} /></TiltCard>
                </section>

                <section className="w-full mb-12">
                    <TiltCard>
                        <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
                            <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-red-500/20 to-green-500/20 text-white mb-4"><Mail size={24} /></div>
                            <h2 className="text-2xl font-bold mb-2 text-white flex items-center justify-center gap-2"><Sparkles size={20} className="text-yellow-400" />¿Trabajamos juntos?<Sparkles size={20} className="text-yellow-400" /></h2>
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">Estoy disponible para nuevos proyectos de desarrollo, automatización de procesos e integración de soluciones tecnológicas.</p>
                            <a href="https://wa.me/51907752531?text=Hola%20BraxDev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-green-700 to-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>WhatsApp</a>
                        </div>
                    </TiltCard>
                </section>

                <footer className="w-full border-t border-white/5 pt-8 mt-8 text-center">
                    <p className="text-sm text-gray-400 italic mb-4 flex items-center justify-center gap-2"><Sparkles size={16} className="text-yellow-400" />"La mejor solución es la que simplifica un problema complejo"<span className="text-red-400"> - BraxDev</span><Sparkles size={16} className="text-yellow-400" /></p>
                    <div className="mb-4"><p className="font-semibold text-gray-300">© 2025 BraxDev</p><p className="text-xs text-gray-500 mt-1">🎄 ¡Felices fiestas y próspero año nuevo! 🎅</p></div>
                    <div className="space-y-1 text-xs text-gray-400"><p>🚀 Combinando código, automatización y datos.</p><p className="text-gray-500">Creado con ❤️ y espíritu navideño 🎁</p></div>
                </footer>
            </main>
        </div>
    );
}