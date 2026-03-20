import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Home, Github, Linkedin, Moon, Sun, Instagram } from 'lucide-react';
import { useRef, useState } from 'react';

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.661-1.597-.91-2.191-.242-.584-.486-.505-.661-.514-.17-.008-.363-.01-.557-.01-.194 0-.51.072-.777.363-.266.291-1.018 0.994-1.018 2.422 0 1.428 1.039 2.81 1.185 3.01.145.199 2.043 3.12 4.95 4.378 1.18.51 1.84.662 2.473.76.793.125 1.516.107 2.087.022.637-.094 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.007 12.039c0 2.121.554 4.191 1.61 6.046L0 24l6.107-1.602a11.83 11.83 0 005.94 1.611h.005c6.64 0 12.043-5.408 12.047-12.044a11.82 11.82 0 00-3.648-8.503" />
  </svg>
);

const LeetCodeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 00-.961.414l-4.377 4.517a1.358 1.358 0 00-.415.962c0 .355.14.704.39 1.013a1.358 1.358 0 00.962.415.13.13 0 00.022-.001l5.956-.006a1.358 1.358 0 01.962.415c.25.25.39.605.39.962v3.744a1.358 1.358 0 01-.39.962a1.358 1.358 0 01-.962.39H10.435a1.358 1.358 0 01-.962-.39a1.358 1.358 0 01-.39-.962V7.152a1.358 1.358 0 00-.39-.962a1.358 1.358 0 00-.962-.39H5.044a1.358 1.358 0 00-.962.39a1.358 1.358 0 00-.39.962v5.748c0 .723.27 1.416.75 1.933a2.716 2.716 0 001.933.75h9.743c.723 0 1.416-.27 1.933-.75a2.716 2.716 0 00.75-1.933V6.262c0-.723-.27-1.416-.75-1.933a2.716 2.716 0 00-1.933-.75H13.483zM0 13.483c0 .723.27 1.416.75 1.934a2.716 2.716 0 001.934.749h2.51v-1.358H2.684a1.358 1.358 0 01-.962-.39a1.358 1.358 0 01-.39-.962V8.95c0-.723-.27-1.416-.75-1.933a2.716 2.716 0 00-1.933-.75H0v1.358h1.358c.355 0 .704.14.962.39.25.25.39.605.39.962v4.533zm0-5.122V5.044h1.358v3.317H0z" />
  </svg>
);

const icons = [
  { id: 'home', icon: Home, label: 'Home', href: '#' },
  { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/Vikash10x' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vikash-kumawat-186a01290/' },
  { id: 'leetcode', icon: LeetCodeIcon, label: 'LeetCode', href: 'https://leetcode.com/u/vikash_80/' },
  { id: 'instagram', icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/_vikash8619/' },
  { id: 'whatsapp', icon: WhatsAppIcon, label: 'WhatsApp', href: 'https://wa.me/8619298781' },
  { id: 'twitter', icon: XIcon, label: 'X', href: 'https://x.com/vikashkumawattt' }
];

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-14 items-end gap-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 px-4 pb-2 pointer-events-auto shadow-2xl transition-colors duration-500"
      >
        {icons.map((item) => (
          <IconContainer mouseX={mouseX} key={item.id} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

function IconContainer({ mouseX, icon: Icon, href, label }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <a href={href} className="group relative">
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="flex aspect-square items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 transition-colors hover:text-white hover:bg-white/10 h-10 w-10"
      >
        <Icon size={20} />
      </motion.div>

      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </div>
    </a>
  );
}
