import React, { useState, useEffect } from 'react';
import { X, Play, RefreshCw, CheckCircle2, ArrowRight, Download, Terminal, Cpu, MapPin, ShoppingBag, CreditCard, MessageSquare, Phone } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';

interface LiveDemoModalProps {
  projectId: string | null;
  onClose: () => void;
  onOpenCodeInspect: (projectId: string) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  projectId,
  onClose,
  onOpenCodeInspect,
}) => {
  const project = PROJECTS.find(p => p.id === projectId);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-[#0E131F] border border-zinc-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200 font-sans"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <div>
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                Live Interactive Simulator
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">{project.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenCodeInspect(project.id)}
              type="button"
              className="px-3 py-1.5 text-xs font-mono text-zinc-200 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              Inspect Code
            </button>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close dialog"
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {project.simulatorType === 'crewai' && <CrewAiSimulator />}
          {project.simulatorType === 'pinzone' && <PinZoneSimulator />}
          {project.simulatorType === 'ordersnap' && <OrderSnapSimulator />}
          {!project.simulatorType && (
            <div className="text-center py-12 text-zinc-400 font-mono text-xs">
              Simulator ready. Inspect architecture and source code repository.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* --- CrewAI & Remote Job Agent Simulator --- */
function CrewAiSimulator() {
  const [stage, setStage] = useState<'idle' | 'scraping' | 'curating' | 'generating' | 'completed'>('idle');
  const [selectedRole, setSelectedRole] = useState<'Full Stack Developer' | 'Backend Engineer'>('Full Stack Developer');
  const [scrapedCount, setScrapedCount] = useState<number>(0);
  const [activeBoard, setActiveBoard] = useState<string>('Initializing...');
  const [curatedList, setCuratedList] = useState<{ title: string; company: string; score: number; match: string }[]>([]);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [fallbackTriggered, setFallbackTriggered] = useState<boolean>(false);

  const boardsList = ['RemoteOK API', 'WeWorkRemotely (Playwright Stealth)', 'JobSpy (LinkedIn/Indeed)', 'JustRemote (Crawl4AI)', 'Himalayas API', 'EU Remote Jobs'];

  const runSimulation = () => {
    setStage('scraping');
    setScrapedCount(0);
    setCuratedList([]);
    setGeneratedLetter('');
    setFallbackTriggered(false);

    let count = 0;
    let boardIdx = 0;
    const scrapeInterval = setInterval(() => {
      count += 8;
      setScrapedCount(count);
      setActiveBoard(boardsList[boardIdx % boardsList.length]);
      boardIdx++;

      if (count >= 48) {
        clearInterval(scrapeInterval);
        setStage('curating');
        setTimeout(() => {
          setCuratedList([
            { title: `${selectedRole} (Global Remote)`, company: 'Vercel Ecosystem Partner', score: 94, match: 'React 19, Node.js, TypeScript (FAISS Cosine 0.96)' },
            { title: 'High-Throughput Backend Dev', company: 'FastBeetle Logistics Scale', score: 88, match: 'PhonePe SDK, PostgreSQL, Redis, Event Webhooks' },
            { title: 'Autonomous AI Engineer', company: 'Agentic Workflows Inc', score: 86, match: 'CrewAI, Gemini 2.5 Flash, Playwright, Docker' },
          ]);

          setStage('generating');
          setTimeout(() => {
            setFallbackTriggered(true);
            setTimeout(() => {
              setGeneratedLetter(`Dear Hiring Team at Vercel Ecosystem Partner,

I am writing to express my strong enthusiasm for the ${selectedRole} opportunity. With proven experience engineering high-throughput backend services and autonomous AI agent architectures, I am eager to contribute to your engineering velocity.

At FastBeetle, I architected backend microservices and integrated both the PhonePe payment gateway (real-time webhooks with HMAC validation) and automated rider-customer dispatch communication for delivery verification. Additionally, I optimized 5 critical operations dashboards, reducing page load latency by 70%, and built the automated Bulk PinZone assignment engine cutting manual effort by 90%.

Recently, I designed Remote Job Agent: an automated system that scrapes 45+ job boards (APIs, Playwright stealth, JobSpy, Crawl4AI), performs multi-CV FAISS semantic matching, and executes a 5-tier LLM fallback chain (Gemini 2.5 Flash → Groq → Mistral) backed by 1,042 passing pytest and 68 E2E tests in Docker.

I look forward to discussing how my full-stack engineering, payment integrations, and AI workflow experience can support your mission.

Sincerely,
Mubashir Nazir
mubashirahmad0305@gmail.com | +91-9622907883
https://github.com/Mubashirahmad123`);
              setStage('completed');
            }, 1200);
          }, 1100);
        }, 1200);
      }
    }, 180);
  };

  const downloadLetter = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mubashir_Nazir_ATS_Cover_Letter_${selectedRole.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Simulation Controls */}
      <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <label className="text-zinc-400 block mb-1">Target Candidate Persona Profile:</label>
          <div className="flex gap-2">
            {(['Full Stack Developer', 'Backend Engineer'] as const).map(role => (
              <button
                key={role}
                onClick={() => { setSelectedRole(role); setStage('idle'); }}
                disabled={stage !== 'idle' && stage !== 'completed'}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  selectedRole === role ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={stage === 'scraping' || stage === 'curating' || stage === 'generating'}
          type="button"
          className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 shadow-md shadow-emerald-500/20"
        >
          {stage === 'scraping' || stage === 'curating' || stage === 'generating' ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Pipeline Active...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-zinc-950" />
              <span>Execute 45+ Board Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* 3 Agents Pipeline Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Agent 1 */}
        <div className={`p-4 rounded-xl border font-mono text-xs transition-all ${
          stage === 'scraping' 
            ? 'border-emerald-400 bg-emerald-500/10' 
            : stage !== 'idle' 
              ? 'border-zinc-800 bg-zinc-900/60' 
              : 'border-zinc-800/60 bg-zinc-950/40 opacity-70'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>01. Scraper Specialist</span>
            </span>
            {stage === 'scraping' && <span className="text-[10px] text-emerald-400 animate-pulse">Scraping...</span>}
            {(stage === 'curating' || stage === 'generating' || stage === 'completed') && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-[11px] text-zinc-400">45+ boards via Playwright stealth, JobSpy & Crawl4AI with MD5 deduplication.</p>
          <div className="mt-2 text-[10px] text-zinc-300">
            Active: <span className="text-emerald-400 font-bold">{stage === 'scraping' ? activeBoard : '45 Boards Verified'}</span>
          </div>
          <div className="text-[10px] text-zinc-400">
            Total Scraped: <span className="text-white font-bold tabular-nums">{scrapedCount}</span> postings
          </div>
        </div>

        {/* Agent 2 */}
        <div className={`p-4 rounded-xl border font-mono text-xs transition-all ${
          stage === 'curating' 
            ? 'border-emerald-400 bg-emerald-500/10' 
            : (stage === 'generating' || stage === 'completed')
              ? 'border-zinc-800 bg-zinc-900/60' 
              : 'border-zinc-800/60 bg-zinc-950/40 opacity-70'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>02. FAISS Curator</span>
            </span>
            {stage === 'curating' && <span className="text-[10px] text-blue-400 animate-pulse">Scoring...</span>}
            {(stage === 'generating' || stage === 'completed') && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-[11px] text-zinc-400">Local keyword + FAISS cosine vector match against multi-CV library.</p>
          <div className="mt-2 text-[10px] text-zinc-300">
            Top Matches Filtered: <span className="text-blue-400 font-bold tabular-nums">{curatedList.length}</span>
          </div>
          <div className="text-[10px] text-zinc-400">
            Target Sync: <span className="text-white font-bold">Google Sheets (5 Tabs)</span>
          </div>
        </div>

        {/* Agent 3 */}
        <div className={`p-4 rounded-xl border font-mono text-xs transition-all ${
          stage === 'generating' 
            ? 'border-emerald-400 bg-emerald-500/10' 
            : stage === 'completed'
              ? 'border-zinc-800 bg-zinc-900/60' 
              : 'border-zinc-800/60 bg-zinc-950/40 opacity-70'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>03. ATS Shrink Engine</span>
            </span>
            {stage === 'generating' && <span className="text-[10px] text-purple-400 animate-pulse">5-Tier LLM</span>}
            {stage === 'completed' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-[11px] text-zinc-400">5-tier fallback chain (Gemini 2.5 Flash → Groq → Mistral) + 1-page PDF shrink.</p>
          <div className="mt-2 text-[10px] text-zinc-300">
            Fallback Chain: <span className="text-purple-400 font-bold">{fallbackTriggered ? 'Gemini Active (Zero Quota Error)' : 'Standby'}</span>
          </div>
          <div className="text-[10px] text-zinc-400">
            Output: <span className="text-emerald-400 font-bold">{stage === 'completed' ? '1-Page ATS PDF Synthesized' : 'Standby'}</span>
          </div>
        </div>
      </div>

      {/* Output Stream Terminal */}
      <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400 text-[11px]">
          <span className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>remote-job-agent.pipeline.log</span>
          </span>
          {stage === 'completed' && (
            <button
              onClick={downloadLetter}
              className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ATS Letter (.txt)</span>
            </button>
          )}
        </div>

        <div className="pt-3 max-h-60 overflow-y-auto space-y-2 text-zinc-300 text-[11px]">
          {stage === 'idle' && (
            <div className="text-zinc-500 italic">Click "Execute 45+ Board Pipeline" above to run the multi-source scraper, FAISS matcher, and ATS synthesis.</div>
          )}
          {stage !== 'idle' && (
            <>
              <div className="text-zinc-400">[06:00:01] APScheduler cron triggered. Universal runner initiated (Python 3.11).</div>
              <div className="text-emerald-400">[06:00:02] [Scraper Agent] Extracted {scrapedCount} postings across {activeBoard}. Playwright stealth active.</div>
            </>
          )}
          {curatedList.length > 0 && (
            <div className="space-y-1 py-1">
              <div className="text-blue-400">[06:00:03] [FAISS Curator] Multi-CV Scoring & Deduplication Complete:</div>
              {curatedList.map((job, i) => (
                <div key={i} className="pl-3 text-zinc-300 border-l-2 border-emerald-500/50 py-0.5">
                  <span className="text-white font-semibold">{job.title}</span> at <span className="text-zinc-400">{job.company}</span> · Score: <strong className="text-emerald-400">{job.score}/100</strong> ({job.match})
                </div>
              ))}
              <div className="text-zinc-400 text-[10px]">[06:00:04] Auto-synced to Google Sheets (Tabs: ALL JOBS, TOP MATCHES, GOOD MATCHES).</div>
            </div>
          )}
          {stage === 'generating' && (
            <div className="text-purple-400 animate-pulse">[06:00:04] [ATS Engine] Prompting Gemini 2.5 Flash via 5-tier fallback cascade. Running 3-pass shrink fit for strict 1-page PDF layout...</div>
          )}
          {stage === 'completed' && (
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <div className="text-emerald-400 font-semibold">[06:00:05] ATS 1-page cover letter generated. Grounded strictly in candidate CV:</div>
              <pre className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
                {generatedLetter}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- FastBeetle Bulk PinZone & PhonePe Simulator --- */
function PinZoneSimulator() {
  const [selectedHub, setSelectedHub] = useState<'North Valley Hub' | 'Central Hub' | 'Airport Logistics Hub'>('North Valley Hub');
  const [isRunning, setIsRunning] = useState(false);
  const [phonePeStatus, setPhonePeStatus] = useState<'idle' | 'verifying' | 'paid'>('idle');
  const [benchmarkResult, setBenchmarkResult] = useState<{ oldTime: number; newTime: number; records: number } | null>(null);

  const zones = [
    { code: '190001', name: 'Lal Chowk', current: 'Default Zone' },
    { code: '190006', name: 'Hazratbal', current: 'Default Zone' },
    { code: '190015', name: 'Rawalpora', current: 'Default Zone' },
    { code: '190022', name: 'Humhama', current: 'Default Zone' },
  ];

  const runBulkOptimization = () => {
    setIsRunning(true);
    setBenchmarkResult(null);
    setTimeout(() => {
      setIsRunning(false);
      setBenchmarkResult({
        oldTime: 4200,
        newTime: 140,
        records: 4,
      });
    }, 1100);
  };

  const testPhonePePayment = () => {
    setPhonePeStatus('verifying');
    setTimeout(() => {
      setPhonePeStatus('paid');
    }, 1000);
  };

  return (
    <div className="space-y-5 font-mono text-xs">
      {/* Interactive Controls Strip */}
      <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="text-zinc-400 block mb-1">Target Dispatch Delivery Hub:</label>
          <div className="flex flex-wrap gap-2">
            {(['North Valley Hub', 'Central Hub', 'Airport Logistics Hub'] as const).map(hub => (
              <button
                key={hub}
                onClick={() => { setSelectedHub(hub); setBenchmarkResult(null); }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedHub === hub ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                {hub}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={runBulkOptimization}
          disabled={isRunning}
          type="button"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 shadow-md shadow-amber-500/20"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Optimizing DB Transactions...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-zinc-950" />
              <span>Run Bulk PinZone Transaction</span>
            </>
          )}
        </button>
      </div>

      {/* Side-by-side: PinCode Grid & PhonePe Payment Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* PinCode Grid (7 cols) */}
        <div className="md:col-span-7 grid grid-cols-2 gap-3">
          {zones.map((z, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="font-bold text-white text-sm">{z.code}</span>
                <MapPin className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-[11px] text-zinc-300">{z.name}</div>
              <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-zinc-500">
                Hub Assigned: <span className={benchmarkResult ? 'text-emerald-400 font-semibold' : 'text-zinc-400'}>
                  {benchmarkResult ? selectedHub : z.current}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PhonePe Test Box (5 cols) */}
        <div className="md:col-span-5 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>PhonePe Gateway Verification</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-300">HMAC-SHA256 Webhook</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                phonePeStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {phonePeStatus === 'paid' ? 'HMAC VERIFIED' : phonePeStatus === 'verifying' ? 'CHECKING...' : 'STANDBY'}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans">
              Simulates secure asynchronous status callback verification preventing duplicate transaction credits.
            </p>
            <button
              onClick={testPhonePePayment}
              disabled={phonePeStatus === 'verifying'}
              type="button"
              className="w-full py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              Trigger PhonePe Webhook Test
            </button>
          </div>
        </div>
      </div>

      {/* Benchmark Results */}
      {benchmarkResult && (
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Atomic Transaction Committed (PostgreSQL + Redis Cache Invalidation)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase">Legacy Sequential Writes</div>
              <div className="text-xl font-bold text-rose-400 tabular-nums">4,200 ms</div>
              <div className="text-[10px] text-zinc-500">Manual N+1 roundtrips</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase">Optimized Bulk Create</div>
              <div className="text-xl font-bold text-emerald-400 tabular-nums">140 ms</div>
              <div className="text-[10px] text-emerald-400">96.6% query speedup</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase">Operator Effort</div>
              <div className="text-xl font-bold text-white tabular-nums">-90%</div>
              <div className="text-[10px] text-zinc-400">Multiple hours/week saved</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- OrderSnap Simulator --- */
function OrderSnapSimulator() {
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const advanceStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(prev => (prev < 4 ? prev + 1 : 1));
    }, 800);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <span className="text-zinc-300 font-bold flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            <span>Dropshipping Order State Machine Simulation</span>
          </span>
          <span className="text-zinc-500">Step {step} of 4</span>
        </div>

        <div className="grid grid-cols-4 gap-2 my-4">
          {['1. JWT Auth Check', '2. Stock Lock', '3. PhonePe Webhook', '4. Supplier Forward'].map((name, i) => (
            <div 
              key={i} 
              className={`p-2.5 rounded-lg border text-center transition-all ${
                step > i + 1 
                  ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400 font-semibold' 
                  : step === i + 1 
                    ? 'border-blue-400 bg-blue-500/10 text-white font-bold' 
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-500'
              }`}
            >
              <div className="text-[10px]">{name}</div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1.5 text-zinc-300">
          {step === 1 && <div>Passport.js JWT guard verified token claims: merchant_id: "m_9021", role: "merchant". Session valid.</div>}
          {step === 2 && <div>Executed PostgreSQL FOR UPDATE row-level lock on SKU "DS-901-PRO". Stock confirmed and reserved atomically.</div>}
          {step === 3 && <div>Received PhonePe HMAC-SHA256 signature verification. Transaction ID "TXN_78491" flagged as CAPTURED.</div>}
          {step === 4 && <div className="text-emerald-400">Order successfully forwarded to automated supplier endpoint with encrypted PII shipping label!</div>}
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={advanceStep}
            disabled={isProcessing}
            type="button"
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{step === 4 ? 'Restart Order Cycle' : 'Step Next State'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
