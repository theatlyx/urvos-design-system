import React, { useEffect, useState, useRef } from 'react';
import { Copy, RefreshCcw, Check, ChevronDown, ChevronUp } from 'lucide-react';

// Actual tokens defined in globals.css / tokens.css
const TOKENS = {
  colors: {
    'Backgrounds': ['--bg', '--surface', '--surface-soft'],
    'Text & Ink': ['--text-1', '--text-2', '--text-3', '--ink'],
    'Brand & Primary': ['--brand-solid', '--brand-tint', '--brand-1', '--brand-2'],
    'Interactive & States': ['--pulse', '--pulse-tint', '--border', '--border-strong'],
    'Status Signals': [
      '--sig-success', '--sig-success-tint', '--sig-success-dark',
      '--sig-caution', '--sig-caution-tint', '--sig-caution-dark',
      '--sig-critical', '--sig-critical-tint', '--sig-critical-dark',
      '--sig-info', '--sig-info-tint', '--sig-info-dark'
    ]
  },
  typography: [
    '--font-ui',
    '--font-serif',
    '--font-data',
  ],
  shadows: [
    '--shadow-card',
    '--shadow-glow',
    '--shadow-pop',
  ],
  spacing: [
    '--space-0', '--space-1', '--space-2', '--space-3', '--space-4', 
    '--space-5', '--space-6', '--space-8', '--space-10', '--space-12', 
    '--space-16', '--space-20'
  ],
  radii: [
    '--r-sm',
    '--r-md',
    '--r-lg',
    '--r-xl',
  ],
};

const THEME_PRESETS = [
  { id: 'default', label: 'Default' },
  { id: 'theme-therapy', label: 'Therapy Violet' },
  { id: 'theme-dental', label: 'Dental Mint' },
  { id: 'theme-nord', label: 'Nord Blue' },
  { id: 'theme-cardiology', label: 'Cardiology Red' },
  { id: 'theme-pediatrics', label: 'Pediatrics Orange' },
  { id: 'theme-oncology', label: 'Oncology Teal' },
  { id: 'theme-neurology', label: 'Neurology Indigo' },
];

const parseRGB = (rgb: string) => {
  if (!rgb) return [0,0,0];
  if (rgb.startsWith('#')) {
    const hex = rgb.replace('#', '');
    return [
      parseInt(hex.substring(0,2), 16),
      parseInt(hex.substring(2,4), 16),
      parseInt(hex.substring(4,6), 16)
    ];
  }
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return [0,0,0];
  return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
};

const rgbToHex = (rgb: string) => {
  const [r, g, b] = parseRGB(rgb);
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
};

// Calculate relative luminance for WCAG contrast
const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrast = (rgb1: string, rgb2: string) => {
  const [r1, g1, b1] = parseRGB(rgb1);
  const [r2, g2, b2] = parseRGB(rgb2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
};

// Reusable collapsible section component
const CollapsibleSection = ({ title, defaultOpen = true, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <section className="bg-urvos-surface border border-urvos-border rounded-lg overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-4 bg-urvos-surface-soft hover:bg-urvos-surface-hover transition-colors text-left"
      >
        <h3 className="text-lg font-semibold text-urvos-text-primary m-0 p-0 border-0">{title}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-urvos-text-muted" /> : <ChevronDown className="w-5 h-5 text-urvos-text-muted" />}
      </button>
      {isOpen && <div className="p-4 border-t border-urvos-border">{children}</div>}
    </section>
  );
};

export const TokenPlayground = () => {
  const [tokenValues, setTokenValues] = useState<Record<string, string>>({});
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [preset, setPreset] = useState('default');
  const [copied, setCopied] = useState(false);
  const [copyToken, setCopyToken] = useState<string | null>(null);
  
  const overridesRef = useRef<Record<string, string>>({});

  const updateTokens = () => {
    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    
    const values: Record<string, string> = {};
    const computedTemp = getComputedStyle(tempDiv);
    
    // Flatten all tokens for reading
    const allTokens = [
      ...Object.values(TOKENS.colors).flat(),
      ...TOKENS.typography,
      ...TOKENS.shadows,
      ...TOKENS.spacing,
      ...TOKENS.radii
    ];
    
    allTokens.forEach(token => {
      if (overridesRef.current[token]) {
        values[token] = overridesRef.current[token];
        return;
      }
      
      const isColor = Object.values(TOKENS.colors).flat().includes(token);
      
      if (isColor) {
        tempDiv.style.color = `var(${token})`;
        values[token] = computedTemp.color;
      } else if (TOKENS.spacing.includes(token)) {
        tempDiv.style.padding = `var(${token})`;
        values[token] = computedTemp.paddingTop;
      } else if (TOKENS.radii.includes(token)) {
        tempDiv.style.borderRadius = `var(${token})`;
        values[token] = computedTemp.borderTopLeftRadius;
      } else if (TOKENS.shadows.includes(token)) {
        tempDiv.style.boxShadow = `var(${token})`;
        values[token] = computedTemp.boxShadow;
      } else if (TOKENS.typography.includes(token)) {
        tempDiv.style.fontFamily = `var(${token})`;
        values[token] = computedTemp.fontFamily;
      } else {
        values[token] = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      }
    });
    
    document.body.removeChild(tempDiv);
    setTokenValues(values);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class') {
          const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          setThemeMode(currentTheme);
          updateTokens();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    updateTokens();
    const initialTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setThemeMode(initialTheme);

    return () => observer.disconnect();
  }, []);

  const toggleThemeMode = () => {
    const root = document.documentElement;
    if (themeMode === 'light') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    }
  };
  
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPreset = e.target.value;
    setPreset(newPreset);
    
    const root = document.documentElement;
    // Remove old presets
    THEME_PRESETS.forEach(p => root.classList.remove(p.id));
    // Add new preset if not default
    if (newPreset !== 'default') {
      root.classList.add(newPreset);
    }
    
    // Clear manual overrides since we applied a preset
    resetOverrides();
  };

  const handleColorChange = (token: string, value: string) => {
    document.documentElement.style.setProperty(token, value);
    overridesRef.current[token] = value;
    setTokenValues(prev => ({ ...prev, [token]: value }));
  };

  const resetOverrides = () => {
    Object.keys(overridesRef.current).forEach(token => {
      document.documentElement.style.removeProperty(token);
    });
    overridesRef.current = {};
    updateTokens();
  };

  const exportTheme = () => {
    if (Object.keys(overridesRef.current).length === 0) {
      alert("No customisations to export! Change a color first.");
      return;
    }

    const cssLines = Object.entries(overridesRef.current).map(([token, value]) => `  ${token}: ${value};`);
    const cssBlock = `/* Exported customisations */\n:root${themeMode === 'dark' ? '[data-theme="dark"]' : ''} {\n${cssLines.join('\n')}\n}`;
    
    navigator.clipboard.writeText(cssBlock).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyToken(id);
      setTimeout(() => setCopyToken(null), 1500);
    });
  };

  return (
    <div className="p-4 sm:p-6 border border-urvos-border rounded-xl bg-urvos-surface text-urvos-text-primary mt-8">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 pb-4 border-b border-urvos-border gap-6">
        <div>
          <h2 className="text-2xl font-bold m-0 p-0 border-0">Theme Studio</h2>
          <p className="text-urvos-text-muted mt-1 text-sm m-0">Live token inspector and customizer. Changes apply instantly across the system.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <label className="text-xs font-semibold text-urvos-text-muted uppercase tracking-wider">Preset:</label>
            <select 
              value={preset} 
              onChange={handlePresetChange}
              className="bg-urvos-surface-soft border border-urvos-border text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-urvos-brand-solid/20"
            >
              {THEME_PRESETS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          
          <button onClick={toggleThemeMode} className="px-3 py-1.5 border border-urvos-border bg-urvos-surface-soft text-urvos-text-primary rounded-md text-sm font-medium hover:bg-urvos-surface-hover transition-colors">
            Toggle {themeMode === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          
          <button onClick={resetOverrides} className="px-3 py-1.5 border border-urvos-border bg-urvos-surface-soft text-urvos-text-primary rounded-md text-sm font-medium hover:bg-urvos-surface-hover transition-colors flex items-center gap-2">
            <RefreshCcw className="w-3.5 h-3.5" /> Reset
          </button>

          <button onClick={exportTheme} className="px-3 py-1.5 bg-urvos-brand-solid text-urvos-text-inverse rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied CSS!' : 'Export CSS'}
          </button>
        </div>
      </div>

      {/* Live Preview Area */}
      <div className="mb-8 p-6 bg-urvos-surface-soft border border-urvos-border rounded-lg">
        <h3 className="text-sm font-semibold text-urvos-text-muted uppercase tracking-wider mb-4 m-0 p-0 border-0">Live Component Preview</h3>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 bg-urvos-surface border border-urvos-border rounded-lg p-5 shadow-[var(--shadow-card)]">
            <h4 className="text-lg font-bold text-urvos-text-primary m-0 mb-1" style={{ fontFamily: 'var(--font-ui)' }}>Patient Admission</h4>
            <p className="text-sm text-urvos-text-muted m-0 mb-4" style={{ fontFamily: 'var(--font-ui)' }}>Please confirm the details below.</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-md bg-urvos-surface-soft border border-urvos-border">
                <span className="text-sm font-medium text-urvos-text-primary" style={{ fontFamily: 'var(--font-data)' }}>DOB: 1985-04-12</span>
                <span className="text-xs bg-urvos-brand-tint text-urvos-brand-solid px-2 py-1 rounded-full font-semibold">Verified</span>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="px-4 py-2 bg-urvos-brand-solid text-urvos-text-inverse rounded-md text-sm font-medium shadow-[var(--shadow-card)]">Confirm</button>
              <button className="px-4 py-2 bg-urvos-surface text-urvos-text-primary border border-urvos-border rounded-md text-sm font-medium">Cancel</button>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 text-xs font-semibold rounded-md bg-[var(--sig-success-tint)] text-[var(--sig-success-dark)] border border-[var(--sig-success-tint)]">Success</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-md bg-[var(--sig-caution-tint)] text-[var(--sig-caution-dark)] border border-[var(--sig-caution-tint)]">Warning</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-md bg-[var(--sig-critical-tint)] text-[var(--sig-critical-dark)] border border-[var(--sig-critical-tint)]">Critical</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-md bg-[var(--sig-info-tint)] text-[var(--sig-info-dark)] border border-[var(--sig-info-tint)]">Info</span>
            </div>
            
            <div className="p-4 bg-[var(--sig-info-tint)] border-l-4 border-[var(--sig-info-dark)] rounded-r-md">
              <p className="text-sm text-[var(--sig-info-dark)] m-0 font-medium">System Update</p>
              <p className="text-xs text-[var(--sig-info-dark)] opacity-80 m-0 mt-1">Tokens are applying correctly across all components.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Colors */}
        {Object.entries(TOKENS.colors).map(([category, tokens]) => (
          <CollapsibleSection key={category} title={`Colors: ${category}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {tokens.map(token => {
                const currentValue = tokenValues[token] || '#000000';
                const hexValue = rgbToHex(currentValue);
                const isOverridden = !!overridesRef.current[token];
                
                // Determine text contrast against surface for the contrast badge
                // Assuming normal text is on `--surface`
                const surfaceColor = tokenValues['--surface'] || '#ffffff';
                const contrastRatio = getContrast(currentValue, surfaceColor).toFixed(1);
                
                return (
                  <div key={token} className={`p-3 border rounded-md bg-urvos-surface flex flex-col gap-2 shadow-sm transition-colors ${isOverridden ? 'border-urvos-brand-solid ring-1 ring-urvos-brand-solid/20' : 'border-urvos-border'}`}>
                    <label className="relative block h-14 w-full rounded-md border border-urvos-border/30 cursor-pointer overflow-hidden shadow-inner" style={{ backgroundColor: currentValue }}>
                      <input 
                        type="color" 
                        value={hexValue}
                        onChange={(e) => handleColorChange(token, e.target.value)}
                        className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                      />
                    </label>
                    <div className="flex flex-col mt-1">
                      <div className="flex justify-between items-center group">
                        <code className="text-[11px] font-mono text-urvos-brand-solid truncate font-semibold" title={token}>{token}</code>
                        <button 
                          onClick={() => copyToClipboard(token, token)} 
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-urvos-surface-soft rounded text-urvos-text-muted transition-opacity"
                          title="Copy token name"
                        >
                          {copyToken === token ? <Check className="w-3 h-3 text-urvos-status-success" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-1.5">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-urvos-text-primary font-mono uppercase">{hexValue}</span>
                          <span className="text-[10px] text-urvos-text-muted font-mono">{currentValue.replace(/rgba?\(/, '').replace(')', '')}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {isOverridden && <span className="text-[9px] uppercase tracking-wider font-bold bg-urvos-brand-tint text-urvos-brand-solid px-1.5 py-0.5 rounded-sm">Edited</span>}
                          {(token.includes('text') || token.includes('ink')) && (
                            <span className="text-[10px] text-urvos-text-muted" title={`Contrast against --surface: ${contrastRatio}:1`}>
                              <span className={Number(contrastRatio) >= 4.5 ? "text-urvos-status-success" : "text-urvos-status-error font-medium"}>
                                {contrastRatio}:1
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleSection>
        ))}
        
        {/* Typography */}
        <CollapsibleSection title="Typography Families">
          <div className="space-y-6">
            {TOKENS.typography.map(token => (
              <div key={token} className="p-4 border border-urvos-border rounded-md bg-urvos-surface shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <code className="text-xs font-mono text-urvos-brand-solid font-semibold">{token}</code>
                  <span className="text-xs text-urvos-text-muted font-mono">{tokenValues[token]}</span>
                </div>
                <div 
                  className="text-2xl text-urvos-text-primary" 
                  style={{ fontFamily: `var(${token})` }}
                >
                  The quick brown fox jumps over the lazy dog.
                </div>
                <div className="mt-2 text-sm text-urvos-text-muted" style={{ fontFamily: `var(${token})` }}>
                  0123456789 !@#$%^&*()
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Shadows */}
        <CollapsibleSection title="Shadows & Elevation">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
            {TOKENS.shadows.map(token => (
              <div key={token} className="flex flex-col gap-4">
                <code className="text-xs font-mono text-urvos-brand-solid font-semibold text-center">{token}</code>
                <div 
                  className="h-32 rounded-xl bg-urvos-surface border border-urvos-border/50 flex items-center justify-center transition-shadow duration-300"
                  style={{ boxShadow: `var(${token})` }}
                >
                  <span className="text-xs text-urvos-text-muted">Hover me</span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Spacing */}
        <CollapsibleSection title="Spacing Scale" defaultOpen={false}>
          <div className="space-y-3">
            {TOKENS.spacing.map(token => (
              <div key={token} className="flex items-center gap-4 group">
                <code className="text-xs font-mono text-urvos-brand-solid w-24 flex-shrink-0">{token}</code>
                <span className="text-xs text-urvos-text-muted w-12 flex-shrink-0">{tokenValues[token]}</span>
                <div className="bg-urvos-brand-tint rounded-sm h-6 transition-all group-hover:bg-urvos-brand-solid/30" style={{ width: `var(${token})` }} />
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Radii */}
        <CollapsibleSection title="Border Radius Scale" defaultOpen={false}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TOKENS.radii.map(token => (
              <div key={token} className="flex flex-col items-center gap-3">
                <code className="text-xs font-mono text-urvos-brand-solid">{token}</code>
                <div 
                  className="bg-urvos-brand-solid h-24 w-24 transition-all shadow-[var(--shadow-card)]"
                  style={{ borderRadius: `var(${token})` }}
                />
                <span className="text-xs text-urvos-text-muted">{tokenValues[token]}</span>
              </div>
            ))}
          </div>
        </CollapsibleSection>

      </div>
    </div>
  );
};
