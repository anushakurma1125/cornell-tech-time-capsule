export default function SkylineSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1400 260"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <g stroke="#C5B9A8" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">

        {/* === ONE WORLD TRADE CENTER (far left) === */}
        {/* Main tower */}
        <path d="M95 250 L95 70 L100 12 L105 70 L105 250" />
        {/* Antenna/spire */}
        <line x1="100" y1="12" x2="100" y2="2" />
        {/* Floor lines */}
        <line x1="95" y1="90" x2="105" y2="90" />
        <line x1="95" y1="120" x2="105" y2="120" />
        <line x1="95" y1="150" x2="105" y2="150" />
        <line x1="95" y1="180" x2="105" y2="180" />
        <line x1="95" y1="210" x2="105" y2="210" />

        {/* === LEFT BUILDING CLUSTER === */}
        {/* Tall narrow building */}
        <rect x="125" y="110" width="18" height="140" />
        <line x1="125" y1="135" x2="143" y2="135" />
        <line x1="125" y1="165" x2="143" y2="165" />
        <line x1="125" y1="195" x2="143" y2="195" />

        {/* Medium building with flat top */}
        <rect x="148" y="130" width="24" height="120" />
        <line x1="148" y1="155" x2="172" y2="155" />
        <line x1="148" y1="185" x2="172" y2="185" />
        <line x1="148" y1="215" x2="172" y2="215" />

        {/* Shorter wide building */}
        <rect x="178" y="155" width="30" height="95" />
        <line x1="178" y1="180" x2="208" y2="180" />
        <line x1="178" y1="210" x2="208" y2="210" />

        {/* Another tall one */}
        <rect x="215" y="100" width="20" height="150" />
        <line x1="215" y1="125" x2="235" y2="125" />
        <line x1="215" y1="155" x2="235" y2="155" />
        <line x1="215" y1="185" x2="235" y2="185" />
        <line x1="215" y1="215" x2="235" y2="215" />

        {/* Short building */}
        <rect x="240" y="170" width="22" height="80" />
        <line x1="240" y1="200" x2="262" y2="200" />
        <line x1="240" y1="225" x2="262" y2="225" />

        {/* Mid-height building */}
        <rect x="268" y="140" width="20" height="110" />
        <line x1="268" y1="170" x2="288" y2="170" />
        <line x1="268" y1="200" x2="288" y2="200" />

        {/* Smaller buildings trailing off */}
        <rect x="295" y="175" width="16" height="75" />
        <rect x="316" y="185" width="18" height="65" />
        <rect x="340" y="195" width="14" height="55" />

        {/* === LOW BUILDINGS / WATERFRONT (center-left) === */}
        <rect x="370" y="200" width="25" height="50" />
        <rect x="400" y="195" width="20" height="55" />
        <rect x="425" y="205" width="28" height="45" />
        <rect x="458" y="200" width="18" height="50" />

        {/* === QUEENSBORO BRIDGE (center) === */}
        {/* Road deck */}
        <line x1="490" y1="215" x2="720" y2="215" />

        {/* Left tower */}
        <path d="M530 215 L530 145 L540 125 L550 145 L550 215" />
        {/* Right tower */}
        <path d="M650 215 L650 145 L660 125 L670 145 L670 215" />

        {/* Suspension cables - left span */}
        <path d="M490 210 Q510 180 540 135" strokeWidth="0.8" />
        <path d="M540 135 Q570 180 600 210" strokeWidth="0.8" />
        {/* Suspension cables - right span */}
        <path d="M600 210 Q630 180 660 135" strokeWidth="0.8" />
        <path d="M660 135 Q690 180 720 210" strokeWidth="0.8" />

        {/* Vertical hangers */}
        <line x1="505" y1="198" x2="505" y2="215" strokeWidth="0.5" />
        <line x1="520" y1="185" x2="520" y2="215" strokeWidth="0.5" />
        <line x1="565" y1="185" x2="565" y2="215" strokeWidth="0.5" />
        <line x1="580" y1="195" x2="580" y2="215" strokeWidth="0.5" />
        <line x1="600" y1="205" x2="600" y2="215" strokeWidth="0.5" />
        <line x1="620" y1="195" x2="620" y2="215" strokeWidth="0.5" />
        <line x1="635" y1="185" x2="635" y2="215" strokeWidth="0.5" />
        <line x1="685" y1="185" x2="685" y2="215" strokeWidth="0.5" />
        <line x1="700" y1="198" x2="700" y2="215" strokeWidth="0.5" />

        {/* Bridge piers into water */}
        <line x1="530" y1="215" x2="530" y2="250" />
        <line x1="550" y1="215" x2="550" y2="250" />
        <line x1="650" y1="215" x2="650" y2="250" />
        <line x1="670" y1="215" x2="670" y2="250" />

        {/* === RIGHT-SIDE BUILDINGS (Roosevelt Island / Queens side) === */}
        <rect x="735" y="190" width="20" height="60" />
        <rect x="760" y="180" width="22" height="70" />
        <rect x="788" y="195" width="16" height="55" />
        <rect x="810" y="175" width="24" height="75" />
        <rect x="840" y="185" width="18" height="65" />
        <rect x="864" y="195" width="20" height="55" />

        {/* More buildings */}
        <rect x="895" y="165" width="20" height="85" />
        <line x1="895" y1="195" x2="915" y2="195" />
        <line x1="895" y1="220" x2="915" y2="220" />

        <rect x="920" y="150" width="18" height="100" />
        <line x1="920" y1="180" x2="938" y2="180" />
        <line x1="920" y1="210" x2="938" y2="210" />

        <rect x="945" y="170" width="22" height="80" />
        <rect x="975" y="185" width="16" height="65" />
        <rect x="998" y="175" width="20" height="75" />

        {/* === BROOKLYN BRIDGE (right side) === */}
        {/* Road deck */}
        <line x1="1040" y1="220" x2="1280" y2="220" />

        {/* Left Gothic tower with pointed arch */}
        <path d="M1090 220 L1090 130 L1100 110 L1105 100 L1110 110 L1110 130 L1110 220" />
        {/* Pointed arch opening */}
        <path d="M1093 180 L1100 165 L1107 180" />
        {/* Tower windows */}
        <path d="M1093 200 L1100 190 L1107 200" />

        {/* Right Gothic tower with pointed arch */}
        <path d="M1190 220 L1190 130 L1200 110 L1205 100 L1210 110 L1210 130 L1210 220" />
        {/* Pointed arch opening */}
        <path d="M1193 180 L1200 165 L1207 180" />
        {/* Tower windows */}
        <path d="M1193 200 L1200 190 L1207 200" />

        {/* Main cables */}
        <path d="M1040 218 Q1060 190 1105 105" strokeWidth="0.9" />
        <path d="M1105 105 Q1150 180 1205 105" strokeWidth="0.9" />
        <path d="M1205 105 Q1245 190 1280 218" strokeWidth="0.9" />

        {/* Diagonal cable stays from left tower */}
        <line x1="1105" y1="108" x2="1060" y2="220" strokeWidth="0.4" />
        <line x1="1105" y1="108" x2="1075" y2="220" strokeWidth="0.4" />
        <line x1="1105" y1="108" x2="1120" y2="220" strokeWidth="0.4" />
        <line x1="1105" y1="108" x2="1135" y2="220" strokeWidth="0.4" />
        <line x1="1105" y1="108" x2="1150" y2="220" strokeWidth="0.4" />

        {/* Diagonal cable stays from right tower */}
        <line x1="1205" y1="108" x2="1160" y2="220" strokeWidth="0.4" />
        <line x1="1205" y1="108" x2="1175" y2="220" strokeWidth="0.4" />
        <line x1="1205" y1="108" x2="1225" y2="220" strokeWidth="0.4" />
        <line x1="1205" y1="108" x2="1245" y2="220" strokeWidth="0.4" />
        <line x1="1205" y1="108" x2="1265" y2="220" strokeWidth="0.4" />

        {/* Bridge piers */}
        <line x1="1090" y1="220" x2="1090" y2="250" />
        <line x1="1110" y1="220" x2="1110" y2="250" />
        <line x1="1190" y1="220" x2="1190" y2="250" />
        <line x1="1210" y1="220" x2="1210" y2="250" />

        {/* Far right buildings (Brooklyn side) */}
        <rect x="1295" y="190" width="18" height="60" />
        <rect x="1318" y="200" width="22" height="50" />
        <rect x="1345" y="195" width="16" height="55" />
        <rect x="1368" y="205" width="20" height="45" />

        {/* Water line */}
        <path d="M0 250 L1400 250" strokeWidth="0.5" opacity="0.4" />
      </g>
    </svg>
  );
}
