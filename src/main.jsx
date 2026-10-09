
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const steps = ['Welcome','Creator Setup','Creator DNA','Dashboard','Create','Upload Footage','AI Analysis','Story Builder','AI Instructions','AI Draft','AI Edit','Packaging','Publish','Insights'];

function App() {
  const [step, setStep] = useState(0);
  const [niche, setNiche] = useState('Motorcycle');
  const [platform, setPlatform] = useState('Instagram');
  const [name, setName] = useState('Riyaz');
  const [audience, setAudience] = useState('Motorcycle & adventure lovers');
  const [style, setStyle] = useState('Cinematic, natural, emotional');
  const [file, setFile] = useState(null);

  const [backendStatus, setBackendStatus] = useState('Not tested');
  const [testingBackend, setTestingBackend] = useState(false);

  const testBackend = async () => {
    setTestingBackend(true);
    setBackendStatus('Testing...');

    try {
      const response = await fetch('/api/creator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'caption' })
      });

      const data = await response.json();

      if (response.ok && data.ok === true) {
        setBackendStatus('Connected successfully!');
      } else {
        setBackendStatus(`Error: ${data.message || response.status}`);
      }
    } catch {
      setBackendStatus('Could not reach backend. Check your connection.');
    } finally {
      setTestingBackend(false);
    }
  };

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => setStep(s => Math.max(0, s - 1));

  const screen = () => {
    switch (step) {
      case 0:
        return <><div className="hero"><div className="logo">CC</div><h1>Creator<br/>Copilot</h1><p>Create better. Create consistently.</p></div><button onClick={next}>Start testing</button><button className="ghost" onClick={() => setStep(3)}>Explore demo</button></>;
      case 1:
        return <><Header title="Creator Setup" sub="Tell us what you create."/><label>Creator type</label><div className="chips">{['Motorcycle','Travel','Food','Gaming','Fitness','Education','Lifestyle','Music'].map(x => <button key={x} className={niche === x ? 'chip active' : 'chip'} onClick={() => setNiche(x)}>{x}</button>)}</div><label>Primary platform</label><div className="chips">{['Instagram','YouTube','Facebook','Threads'].map(x => <button key={x} className={platform === x ? 'chip active' : 'chip'} onClick={() => setPlatform(x)}>{x}</button>)}</div><button onClick={next}>Continue</button></>;
      case 2:
        return <><Header title="Creator DNA" sub="This helps AI create content that feels like you."/><input value={name} onChange={e => setName(e.target.value)} placeholder="Creator name"/><input value={audience} onChange={e => setAudience(e.target.value)} placeholder="Audience"/><textarea value={style} onChange={e => setStyle(e.target.value)} /><button onClick={next}>Save Creator DNA</button></>;
      case 3:
        return <><Header title={`Good evening, ${name} 👋`} sub="Your AI creative workspace"/><div className="score"><b>82</b><span>Creator Intelligence</span></div><div className="card"><small>AI IDEA</small><h2>“A ride that was worth every mile.”</h2><p>Turn your strongest mountain footage into a cinematic 30-second Reel.</p><button onClick={() => setStep(4)}>Create this</button></div><div className="card"><small>RECENT CONTENT</small><p>🏍️ Ladakh sunrise ride</p><p>🏔️ Pangong road story</p></div></>;
      case 4:
        return <><Header title="What are we creating?" sub="Choose a starting point."/><button onClick={next}>🎬 Reel / Short</button><button onClick={() => setStep(8)}>✍️ Idea → Script</button><button onClick={() => setStep(11)}>📦 Repurpose existing post</button></>;
      case 5:
        return <><Header title="Upload footage" sub="Choose videos from your device."/><div className="upload"><input type="file" accept="video/*" multiple onChange={e => setFile(e.target.files?.[0])}/><b>＋ Select videos</b>{file && <p>Selected: {file.name}</p>}</div><button onClick={next}>Analyze Footage</button></>;
      case 6:
        return <><Header title="AI Analysis" sub="Understanding your footage…"/><div className="progress"><span/></div><div className="card"><p>✓ Mountain and road shots detected</p><p>✓ Rider and motorcycle detected</p><p>✓ Strong opening shot identified</p><p>✓ Natural engine audio detected</p></div><button onClick={next}>Build Story</button></>;
      case 7:
        return <><Header title="Story Builder" sub="Choose the feeling of the Reel."/>{['Cinematic','Adventure','Emotional','Energetic','Storytelling'].map(x => <button key={x} onClick={next}>✨ {x}</button>)}</>;
      case 8:
        return <><Header title="AI Instructions" sub="Tell Copilot how you want it edited."/><textarea defaultValue="Make it cinematic, emotional and natural. Start with the strongest mountain shot. Keep motorcycle sounds. Avoid excessive transitions."/><button onClick={next}>Generate Draft</button></>;
      case 9:
        return <><Header title="AI Draft" sub="30 sec • 12 clips • Creator DNA match 86%"/><div className="videoMock">▶<span>AI DRAFT PREVIEW</span></div><button onClick={next}>Looks Good</button><button className="ghost" onClick={() => setStep(10)}>Edit with AI</button></>;
      case 10:
        return <><Header title="Tell AI what to change" sub="No complicated timeline needed."/>{['Make the beginning more powerful','Make it more emotional','Remove slow sections','Add more engine sound'].map(x => <button key={x} onClick={next}>{x}</button>)}<textarea placeholder="Or type your own instruction…"/><button onClick={next}>Apply Changes</button></>;
      case 11:
        return <><Header title="Caption & Packaging" sub="Ready for publishing."/><textarea defaultValue="Some roads are not meant to be rushed. 🏔️🏍️"/><input defaultValue="#Ladakh #Motorcycle #Adventure #TravelReels"/><button onClick={next}>Prepare Platform Versions</button></>;
      case 12:
        return <><Header title="Ready to Publish" sub="Your content is packaged for Instagram, YouTube Shorts and Facebook."/><div className="card"><p>Instagram Reel ✓</p><p>YouTube Short ✓</p><p>Facebook Reel ✓</p></div><button onClick={next}>Save & View Insights</button></>;
      case 13:
        return <><Header title="Creator Insights" sub="Your content is learning from every post."/><div className="stats"><div><b>24.8K</b><small>Views</small></div><div><b>8.7%</b><small>Engagement</small></div><div><b>2.1K</b><small>Shares</small></div></div><div className="card"><small>AI READ</small><h2>Your strongest content is cinematic ride storytelling.</h2><p>Next recommendation: make another mountain-road story with a stronger first 2 seconds.</p></div><button onClick={() => setStep(3)}>Create Next Reel</button></>;
      default:
        return <><Header title="Creator Copilot" sub="Let's create something."/><button onClick={() => setStep(3)}>Open Dashboard</button></>;
    }
  };

  return <main><div className="app">{step > 0 && <button className="back" onClick={back}>‹</button>}{screen()}<div className="dots">
<div className="card">
  <small>DEVELOPER TEST</small>
  <h2>Backend Connection</h2>
  <button onClick={testBackend} disabled={testingBackend}>
    {testingBackend ? 'Testing...' : 'Test Backend'}
  </button>
  <p>{backendStatus}</p>
</div>
{steps.map((_, i) => <i key={i} className={i === step ? 'on' : ''}/>)}</div></div></main>;
}

function Header({ title, sub }) {
  return <header><div className="eyebrow">CREATOR COPILOT</div><h1>{title}</h1><p>{sub}</p></header>;
}

createRoot(document.getElementById('root')).render(<App/>);
