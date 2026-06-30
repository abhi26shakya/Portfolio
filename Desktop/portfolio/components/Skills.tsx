"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Activity, Cpu, Code2, Hammer, Layers, Palette } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skills } from "@/data/profile";

// HSL theme configuration for each category
const categoryThemes: Record<
  string,
  {
    primary: string; // Theme hex
    glow: string;    // Shadow color rgba
    accent: string;  // Accent text color class
    bgGlow: string;  // Background glow gradient
    channelId: string;
    icon: React.ComponentType<any>;
  }
> = {
  Programming: {
    primary: "#a855f7", // Purple-500
    glow: "rgba(168, 85, 247, 0.4)",
    accent: "text-purple-400",
    bgGlow: "from-purple-500/10 to-transparent",
    channelId: "CH-01",
    icon: Code2,
  },
  "AI / ML": {
    primary: "#06b6d4", // Cyan-500
    glow: "rgba(6, 182, 212, 0.4)",
    accent: "text-cyan-400",
    bgGlow: "from-cyan-500/10 to-transparent",
    channelId: "CH-02",
    icon: Cpu,
  },
  Hardware: {
    primary: "#f59e0b", // Amber-500
    glow: "rgba(245, 158, 11, 0.4)",
    accent: "text-amber-400",
    bgGlow: "from-amber-500/10 to-transparent",
    channelId: "CH-03",
    icon: Hammer,
  },
  Simulation: {
    primary: "#10b981", // Emerald-500
    glow: "rgba(16, 185, 129, 0.4)",
    accent: "text-emerald-400",
    bgGlow: "from-emerald-500/10 to-transparent",
    channelId: "CH-04",
    icon: Layers,
  },
  Design: {
    primary: "#ec4899", // Pink-500
    glow: "rgba(236, 72, 153, 0.4)",
    accent: "text-pink-400",
    bgGlow: "from-pink-500/10 to-transparent",
    channelId: "CH-05",
    icon: Palette,
  },
};

const skillLogs: Record<string, string[]> = {
  // Programming
  Java: [
    "SYS: Java Runtime Environment (JRE) detected",
    "CMD: javac Main.java && java Main",
    "PARADIGMS: Object-Oriented, Multithreading, JVM Opt.",
    "STATUS: STABLE // 95% COMPLIANCE",
  ],
  C: [
    "SYS: GNU Compiler Collection (GCC)",
    "CMD: gcc -O3 kernel.c -o system_core",
    "MEM_ALLOC: Malloc/Calloc boundary validation",
    "STATUS: HIGH_PERFORMANCE // DIRECT_HARDWARE_ACCESS",
  ],
  "Embedded C": [
    "SYS: Bare-Metal AVR/ARM Cross-Compiler",
    "CMD: avr-gcc -Wall -Os -mmcu=atmega328p",
    "REGISTERS: Direct Port Manipulation, ISR Config",
    "STATUS: REAL_TIME_STEADY // 16MHz CLOCK_LOCKED",
  ],
  Python: [
    "SYS: CPython 3.11 Interpreter",
    "CMD: python -m venv .venv && source .venv/activate",
    "LIBS: NumPy, Pandas, Poetry Package Manager",
    "STATUS: ACTIVE // RAPID_PROTOTYPING_MODE",
  ],
  JavaScript: [
    "SYS: V8 Engine Runtime Environment",
    "CMD: node --harmony server.js",
    "PARADIGMS: Event-Driven, Async/Await, ESNext Stack",
    "STATUS: OPERATIONAL // NON-BLOCKING_I/O",
  ],

  // AI / ML
  TensorFlow: [
    "SYS: TensorFlow Graph Compiler",
    "CMD: import tensorflow as tf; tf.config.list_physical_devices('GPU')",
    "ACCELERATOR: CUDA Core GPU Threading Enabled",
    "STATUS: HYPER_OPTIMIZED // DATAFLOW_GRAVITY",
  ],
  PyTorch: [
    "SYS: PyTorch Autograd Engine",
    "CMD: model.to(torch.device('cuda'))",
    "TENSORS: Dynamic Computation Graph Execution",
    "STATUS: ACTIVE // STOCHASTIC_GRADIENT_DESCENT",
  ],
  Keras: [
    "SYS: High-Level Deep Learning API Backend",
    "CMD: model.compile(optimizer='adam', loss='categorical_crossentropy')",
    "LAYER_STACK: Conv2D -> MaxPool2D -> Dense -> Dropout",
    "STATUS: TRAINED // VAL_ACCURACY: 98.6%",
  ],
  "Scikit-learn": [
    "SYS: Machine Learning Algorithms Core",
    "CMD: pipeline.fit(X_train, y_train)",
    "PIPELINES: StandardScaler, PCA, GridSearchCV",
    "STATUS: COMPILATION_SUCCESS // FIT_COMPLETE",
  ],
  ANN: [
    "SYS: Multi-Layer Perceptron (MLP) Topology",
    "CMD: feedforward_backprop_loop()",
    "WEIGHTS: Backpropagation Gradient Convergence",
    "STATUS: CONVERGED // INTERPOLATION_STABLE",
  ],
  CNN: [
    "SYS: Convolutional Neural Network Feature Extractor",
    "CMD: spatial_convolution_2d(kernel_size=3x3)",
    "FILTERS: Feature Activation Maps, Pooling Overlays",
    "STATUS: ONLINE // VISION_RECOGNITION_ACTIVE",
  ],
  RNN: [
    "SYS: Recurrent Neural Network Cell State",
    "CMD: rnn_cell.forward(input, previous_hidden_state)",
    "BACKPROP: Backpropagation Through Time (BPTT)",
    "STATUS: STANDBY // SEQUENCE_STREAM_READING",
  ],
  LSTM: [
    "SYS: Long Short-Term Memory Cell Matrix",
    "CMD: forget_gate_activation()",
    "CELL_STATE: Long-term Dependency Error Resolver",
    "STATUS: OPERATIONAL // GRADIENT_EXPLOSION_PREVENTED",
  ],
  Transformer: [
    "SYS: Multi-Head Self-Attention Engine",
    "CMD: self_attention_weights_projection()",
    "EMBEDDINGS: Positional Encoding, Query-Key-Value Projection",
    "STATUS: MAX_THROUGHPUT // SEQUENCE_PARALLEL_ON",
  ],
  NLP: [
    "SYS: Natural Language Processing Pipeline",
    "CMD: tokenizer.encode_batch(text_corpus)",
    "EMBEDDINGS: Word2Vec, TF-IDF, BERT Context Mapping",
    "STATUS: COMPREHENSION_ACTIVE // ENCODING_STABLE",
  ],

  // Hardware
  Arduino: [
    "SYS: Atmel AVR Microcontroller Development",
    "CMD: avrdude -c arduino -p m328p -U flash:w:firmware.hex",
    "PERIPHERALS: 10-bit ADC, PWM Timers, SPI/I2C Buses",
    "STATUS: ONLINE // BOOT_LOADER_STABLE",
  ],
  NodeMCU: [
    "SYS: ESP8266 Wi-Fi enabled MCU Unit",
    "CMD: esptool.py --port /dev/ttyUSB0 write_flash 0x00000",
    "NETWORKING: TCP/IP Stack, WebSockets, DeepSleep Mode",
    "STATUS: BROADCASTING // SSID: CONNECTED",
  ],
  IoT: [
    "SYS: Internet of Things Protocol Stack",
    "CMD: mqtt_client.publish('node/telemetry', payload)",
    "BROKERS: HiveMQ Client, Local Gateway Sync",
    "STATUS: DATA_STREAM_OPEN // TELEMETRY_ACTIVE",
  ],
  Sensors: [
    "SYS: Analog/Digital Transducers Matrix",
    "CMD: read_analog_channel(ADC_0)",
    "DATA: Ultrasonic distance, Infrared beam, Temp/Humidity",
    "STATUS: SAMPLING_RATE_100HZ // NOISE_FILTER_ON",
  ],

  // Simulation
  eSim: [
    "SYS: Open-Source EDA Tool Suite",
    "CMD: ngspice -b -r output.raw circuit.cir",
    "SCHEMATICS: KiCad schematic editor mapping",
    "STATUS: SIMULATION_STABLE // NO_CONVERGENCE_ERRORS",
  ],
  TinkerCAD: [
    "SYS: Virtual Breadboard Prototyping",
    "CMD: run_javascript_simulation_engine()",
    "DEVICES: Virtual logic analyzers, oscilloscope sweeps",
    "STATUS: LAB_INTERACTION_ACTIVE // VIRTUAL_POWER_OK",
  ],
  MultiSim: [
    "SYS: SPICE Analog Circuit Simulator",
    "CMD: run_ac_sweep_analysis(frequency_range=[10Hz, 10MHz])",
    "METRICS: Bode plotter, Impedance matching, AC sweeps",
    "STATUS: TRANSCRIPTION_SUCCESS // POLE_ZERO_RESOLVED",
  ],

  // Design
  Canva: [
    "SYS: Design Layout Composer",
    "CMD: compile_vector_layout_elements()",
    "ASSETS: Branding, vector patterns, dynamic guidelines",
    "STATUS: RENDER_READY // VECTOR_GRID_ALIGNED",
  ],
  Inkscape: [
    "SYS: SVG Vector Graphics Editor",
    "CMD: inkscape --export-filename=vector_output.pdf",
    "GEOMETRY: Bezier paths, node manipulation, SVG standard",
    "STATUS: VECTOR_STREAM_STABLE // SVG_XML_VALID",
  ],
  Scribus: [
    "SYS: Desktop Publishing Suite",
    "CMD: generate_pdf_press_ready_x3()",
    "LAYOUT: CMYK separation, bleed guidelines, typographic grids",
    "STATUS: PRESS_READY // FONTS_EMBEDDED",
  ],
  Penpot: [
    "SYS: Open-Source Collaborative Design Tool",
    "CMD: penpot_export_css_variables()",
    "PROTOTYPING: Flexbox layout components, interactive boards",
    "STATUS: UI_SPECIFICATION_RESOLVED // DEV_HANDOFF_OK",
  ],
  "Synfig Studio": [
    "SYS: 2D Vector Animation Engine",
    "CMD: synfig --render animation_frames.sif",
    "KEYFRAMES: Automatic tweening, skeleton bones deformation",
    "STATUS: EXPORT_COMPLETED // FRAMERATE_30FPS",
  ],
};

function Oscilloscope({ color, isHovered }: { color: string; isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const resizeObserver = new ResizeObserver(() => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
      }
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let phase = 0;
    let currentFreq = 0.02;
    let currentAmp = 12;
    let currentSpeed = 0.05;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate towards target variables depending on hover state
      const targetFreq = isHovered ? 0.075 : 0.025;
      const targetAmp = isHovered ? 38 : 12;
      const targetSpeed = isHovered ? 0.15 : 0.04;

      currentFreq += (targetFreq - currentFreq) * 0.1;
      currentAmp += (targetAmp - currentAmp) * 0.1;
      currentSpeed += (targetSpeed - currentSpeed) * 0.1;

      phase += currentSpeed;

      const drawWave = (
        waveFreq: number,
        waveAmp: number,
        wavePhase: number,
        lineWidth: number,
        opacity: number,
        glowBlur = 0
      ) => {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        if (glowBlur > 0) {
          ctx.shadowBlur = glowBlur;
          ctx.shadowColor = color;
        } else {
          ctx.shadowBlur = 0;
        }

        const midY = height / 2;

        for (let x = 0; x < width; x++) {
          const y = midY + Math.sin(x * waveFreq + wavePhase) * waveAmp;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      };

      // Draw faint background grid lines
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      // Horizontal grid lines
      for (let y = 15; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Vertical grid lines
      for (let x = 20; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw active dynamic waves
      // Primary wave (glowing)
      drawWave(currentFreq, currentAmp, phase, 2, 0.9, 12);
      // Secondary wave (out-of-phase, thinner)
      drawWave(currentFreq * 0.85, currentAmp * 0.7, phase * -1.2, 1, 0.45);
      // Tertiary wave (fast, high-frequency, faint)
      drawWave(currentFreq * 1.5, currentAmp * 0.35, phase * 2.1, 1, 0.2);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [color, isHovered]);

  return (
    <div className="relative w-full h-24 rounded-lg overflow-hidden border border-white/5 bg-slate-950/60">
      <div className="absolute top-2 left-3 z-10 flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
        <Activity className="w-3.5 h-3.5 animate-pulse" style={{ color }} />
        Oscilloscope
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

function Terminal({ logs, color }: { logs: string[]; color: string }) {
  const [typedLines, setTypedLines] = useState<string[]>([]);

  useEffect(() => {
    // Typewriter effect trigger on logs change
    setTypedLines([]);
    let currentLineIndex = 0;
    const interval = setInterval(() => {
      if (currentLineIndex < logs.length) {
        const lineToAdd = logs[currentLineIndex];
        if (lineToAdd) {
          setTypedLines((prev) => [...prev, lineToAdd]);
        }
        currentLineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div className="w-full h-36 rounded-lg bg-black/90 p-4 border border-white/10 relative font-mono text-xs overflow-hidden select-none">
      {/* CRT Scanline effect overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
      
      <div className="absolute top-2 right-3 z-10 flex items-center gap-1 text-[10px] font-mono tracking-widest text-slate-500">
        <TerminalIcon className="w-3.5 h-3.5" style={{ color }} />
        CLI LOGS
      </div>

      <div className="flex flex-col gap-1 w-full h-full overflow-y-auto pr-2 custom-scrollbar">
        {typedLines.map((line, i) => {
          if (!line) return null;
          const isSpecialLine = line.startsWith("SYS:") || line.startsWith("CMD:") || line.startsWith("STATUS:");
          return (
            <div key={i} className="flex gap-1.5 items-start">
              <span className="opacity-40" style={{ color }}>&gt;</span>
              <span className="text-slate-300 break-words leading-relaxed font-mono">
                {isSpecialLine ? (
                  <span>
                    <strong style={{ color }} className="font-mono">{line.slice(0, line.indexOf(":") + 1)}</strong>
                    {line.slice(line.indexOf(":") + 1)}
                  </span>
                ) : (
                  line
                )}
              </span>
            </div>
          );
        })}
        {typedLines.length < logs.length && (
          <span className="w-1.5 h-3.5 animate-pulse shrink-0" style={{ backgroundColor: color }} />
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const categories = Object.entries(skills);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0][0]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const theme = categoryThemes[activeCategory];

  const currentLogs = hoveredSkill
    ? skillLogs[hoveredSkill] || [`SYS.SKILL: ${hoveredSkill}`, "STATUS: UNVERIFIED", "NO LOG ARCHIVE FOUND"]
    : [
        `SYS.LOCATE.DECK: ${activeCategory.toUpperCase()}`,
        `CONSOLE_CHANNEL: ${theme.channelId} // CONNECTED`,
        "MONITORING RESOLVED TELEMETRY STATUS...",
        "HOVER OVER SPECIFIC SUB-NODE MATRIX TO ANALYZE",
      ];

  const activeSkills = skills[activeCategory as keyof typeof skills] || [];

  return (
    <section id="skills" className="relative py-20 px-6 bg-bg overflow-hidden">
      {/* Background theme glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10 blur-[120px] transition-all duration-700">
        <div 
          className="w-[500px] h-[500px] rounded-full transition-all duration-700"
          style={{ backgroundColor: theme.primary }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading eyebrow="Capability" title="Skills" />

        <div className="grid md:grid-cols-[240px_1fr] gap-8 mt-16 items-start">
          {/* Left panel: Channels Selector */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase mb-1">
              Neural Channel Selector
            </div>
            {categories.map(([category], idx) => {
              const catTheme = categoryThemes[category];
              const isActive = activeCategory === category;
              const Icon = catTheme.icon;

              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setHoveredSkill(null);
                  }}
                  className={`relative flex items-center justify-between px-5 py-4 rounded-xl border font-mono text-xs text-left transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? "bg-slate-900/60 text-textPrimary"
                      : "bg-slate-950/30 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-900/20"
                  }`}
                  style={{
                    borderColor: isActive ? catTheme.primary : "rgba(255, 255, 255, 0.05)",
                    boxShadow: isActive ? `0 0 15px -3px ${catTheme.glow}` : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110`} 
                      style={{ color: catTheme.primary }}
                    />
                    <div>
                      <div className="text-[10px] opacity-40 font-mono">{catTheme.channelId}</div>
                      <span className="font-medium tracking-wide">{category}</span>
                    </div>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-0 bottom-0 w-[3px]"
                      style={{ backgroundColor: catTheme.primary }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right panel: Dash and Workspace */}
          <motion.div
            layout
            className="card-glow rounded-2xl glass p-6 md:p-8 flex flex-col gap-8 min-h-[460px] relative"
            style={{
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Corner cyber-accents */}
            <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20" />
            <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20" />
            <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20" />
            <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/20" />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Workspace Channel</span>
                <h3 className="font-display text-2xl text-textPrimary leading-none mt-1">{activeCategory}</h3>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div className="font-mono text-right text-[10px] leading-tight">
                  <div className="text-slate-500 uppercase">SYS_LOG STATUS</div>
                  <div className={theme.accent}>ACTIVE_RESONANCE [100%]</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-8">
              {/* Skill Matrix Grid */}
              <div className="flex flex-col gap-4 justify-between h-full">
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                  Sub-Node Matrix ({activeSkills.length} nodes)
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <AnimatePresence mode="popLayout">
                    {activeSkills.map((skill, index) => {
                      const isHovered = hoveredSkill === skill;
                      return (
                        <motion.div
                          key={`${activeCategory}-${skill}`}
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.25, delay: index * 0.04 }}
                          whileHover={{ scale: 1.03 }}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`relative flex items-center justify-center p-4 rounded-xl border font-mono text-sm text-center cursor-pointer transition-all duration-300 select-none overflow-hidden ${
                            isHovered
                              ? "bg-slate-900/80 border-slate-700 text-white"
                              : "bg-slate-950/45 border-white/5 text-slate-300"
                          }`}
                          style={{
                            boxShadow: isHovered
                              ? `inset 0 0 12px ${theme.glow}, 0 0 15px -3px ${theme.glow}`
                              : "none",
                            borderColor: isHovered ? theme.primary : "rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <span className="relative z-10 tracking-wide font-medium">{skill}</span>
                          
                          {/* Pulsing sub-glow */}
                          {isHovered && (
                            <motion.div
                              layoutId={`glow-${skill}`}
                              className="absolute inset-0 bg-gradient-to-tr opacity-20 pointer-events-none"
                              style={{
                                backgroundImage: `linear-gradient(135deg, ${theme.primary}, transparent)`,
                              }}
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="text-[10px] text-slate-500 font-mono leading-relaxed mt-4 bg-slate-950/20 border border-white/5 rounded-lg p-3">
                  <span className="text-amber-500/80 font-bold font-mono">NOTICE:</span> The connectivity lines represent functional strength. Hover over individual skills to interface, execute parameters, and monitor diagnostic signals.
                </div>
              </div>

              {/* Console Diagnostics Side */}
              <div className="flex flex-col gap-4">
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                  Live Diagnostics
                </div>
                
                {/* Simulated Oscilloscope Waveform */}
                <Oscilloscope color={theme.primary} isHovered={!!hoveredSkill} />

                {/* Simulated CLI Terminal Output */}
                <Terminal logs={currentLogs} color={theme.primary} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
