const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const output = process.argv[3];
let report = '';
let fileCount = 0;
let totalFunctions = 0;
let totalComponents = 0;
let totalInterfaces = 0;
let totalTypes = 0;

function scanDirectory(dir) {
    try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !item.startsWith('.') && 
                item !== 'node_modules' && item !== '.git' && 
                item !== 'dist' && item !== 'build' && item !== '.next') {
                scanDirectory(fullPath);
            } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
                analyzeFile(fullPath);
            }
        }
    } catch(e) {
        // Skip inaccessible directories
    }
}

function extractInterfacesAndTypes(content) {
    const definitions = {};
    
    // Extract interfaces
    const interfaceRegex = /(?:export\s+)?interface\s+(\w+)\s*(?:extends\s+[^{]+)?\s*\{/g;
    let match;
    while ((match = interfaceRegex.exec(content)) !== null) {
        const name = match[1];
        const startIndex = match.index + match[0].length;
        const endIndex = findMatchingBrace(content, startIndex - 1);
        if (endIndex !== -1) {
            const body = content.substring(startIndex, endIndex).trim();
            definitions[name] = {
                type: 'interface',
                body: body,
                props: parseProps(body)
            };
            totalInterfaces++;
        }
    }
    
    // Extract types
    const typeRegex = /(?:export\s+)?type\s+(\w+)\s*=\s*\{/g;
    while ((match = typeRegex.exec(content)) !== null) {
        const name = match[1];
        const startIndex = match.index + match[0].length;
        const endIndex = findMatchingBrace(content, startIndex - 1);
        if (endIndex !== -1) {
            const body = content.substring(startIndex, endIndex).trim();
            definitions[name] = {
                type: 'type',
                body: body,
                props: parseProps(body)
            };
            totalTypes++;
        }
    }
    
    return definitions;
}

function findMatchingBrace(content, openBraceIndex) {
    let depth = 0;
    for (let i = openBraceIndex; i < content.length; i++) {
        if (content[i] === '{') depth++;
        if (content[i] === '}') {
            depth--;
            if (depth === 0) return i;
        }
    }
    return -1;
}

function parseProps(body) {
    const props = [];
    const lines = body.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;
        
        // Remove trailing comma
        const cleanLine = trimmed.replace(/,\s*$/, '');
        
        // Match prop: name?: type or name: type
        const propMatch = cleanLine.match(/^(\w+)(\?)?\s*:\s*(.+)$/);
        if (propMatch) {
            props.push({
                name: propMatch[1],
                optional: !!propMatch[2],
                type: propMatch[3].trim()
            });
        }
    }
    
    return props;
}

function analyzeFile(filePath) {
    let content;
    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch(e) {
        return;
    }
    
    const relativePath = path.relative(root, filePath);
    const lines = content.split('\n');
    let hasContent = false;
    fileCount++;

    // Extract all interfaces and types
    const typeDefinitions = extractInterfacesAndTypes(content);
    
    // Find all exports at the top level
    const exports = [];
    const exportRegex = /export\s+(?:const|function|class|interface|type|enum)\s+(\w+)/g;
    let exportMatch;
    while ((exportMatch = exportRegex.exec(content)) !== null) {
        exports.push(exportMatch[1]);
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Look for JSDoc comment before the declaration
        let jsdocDescription = '';
        if (i > 0) {
            const prevLine = lines[i - 1].trim();
            if (prevLine === '*/') {
                // Look backwards for JSDoc
                for (let j = i - 2; j >= 0; j--) {
                    const docLine = lines[j].trim();
                    if (docLine === '/**') break;
                    if (docLine.startsWith('*') && !docLine.startsWith('* @')) {
                        const text = docLine.replace(/^\*\s?/, '').trim();
                        if (text && !jsdocDescription) {
                            jsdocDescription = text;
                        }
                    }
                }
            }
        }

        // Pattern 1: export const Component: React.FC<Props> = ...
        let reactFCMatch = trimmed.match(/^export\s+const\s+(\w+)\s*:\s*React\.FC\s*<(.+?)>\s*=/);
        if (!reactFCMatch) {
            reactFCMatch = trimmed.match(/^const\s+(\w+)\s*:\s*React\.FC\s*<(.+?)>\s*=/);
        }
        
        if (reactFCMatch) {
            const name = reactFCMatch[1];
            const propsType = reactFCMatch[2];

            if (!hasContent) {
                report += `\n${'='.repeat(70)}\n`;
                report += `📁 FILE: ${relativePath}\n`;
                report += `${'='.repeat(70)}\n`;
                hasContent = true;
            }

            report += `\n  🧩 COMPONENT: ${name}\n`;
            report += `  📍 Location: Line ${i + 1}\n`;
            report += `  📋 Type: React Functional Component (React.FC)\n`;
            
            if (jsdocDescription) {
                report += `  📝 Description: ${jsdocDescription}\n`;
            }

            if (typeDefinitions[propsType]) {
                const def = typeDefinitions[propsType];
                report += `  📥 INPUTS (Props: ${propsType}):\n`;
                if (def.props.length > 0) {
                    for (const prop of def.props) {
                        const optional = prop.optional ? ' (optional)' : '';
                        report += `      • ${prop.name}${optional}: ${prop.type}\n`;
                    }
                } else {
                    report += `      • (empty interface)\n`;
                }
            } else {
                report += `  📥 INPUTS (Props): ${propsType}\n`;
            }
            
            report += `  📤 OUTPUT: JSX.Element\n`;
            report += `  🎨 DISPLAYS: Renders React UI component\n`;
            totalComponents++;
            continue;
        }

        // Pattern 2: function Component(props: Props): JSX.Element
        const funcComponentMatch = trimmed.match(/^export\s+function\s+(\w+)\s*\(([^)]*)\)\s*:\s*(JSX\.Element|React\.ReactNode|React\.ReactElement)\s*\{/);
        if (!funcComponentMatch) {
            // Try without export
            const innerMatch = trimmed.match(/^function\s+(\w+)\s*\(([^)]*)\)\s*:\s*(JSX\.Element|React\.ReactNode|React\.ReactElement)\s*\{/);
            if (innerMatch && (trimmed.startsWith('export') || exports.includes(innerMatch[1]))) {
                // Handle as component
            }
        }

        if (funcComponentMatch) {
            const name = funcComponentMatch[1];
            const params = funcComponentMatch[2];

            if (!hasContent) {
                report += `\n${'='.repeat(70)}\n`;
                report += `📁 FILE: ${relativePath}\n`;
                report += `${'='.repeat(70)}\n`;
                hasContent = true;
            }

            report += `\n  🧩 COMPONENT: ${name}\n`;
            report += `  📍 Location: Line ${i + 1}\n`;
            report += `  📋 Type: React Function Component\n`;
            
            if (jsdocDescription) {
                report += `  📝 Description: ${jsdocDescription}\n`;
            }

            // Extract props from params
            const propsMatch = params.match(/(\w+)\s*:\s*(\w+)/);
            if (propsMatch) {
                const propsName = propsMatch[1];
                const propsType = propsMatch[2];
                
                if (typeDefinitions[propsType]) {
                    const def = typeDefinitions[propsType];
                    report += `  📥 INPUTS (Props: ${propsType}):\n`;
                    if (def.props.length > 0) {
                        for (const prop of def.props) {
                            const optional = prop.optional ? ' (optional)' : '';
                            report += `      • ${prop.name}${optional}: ${prop.type}\n`;
                        }
                    }
                } else {
                    report += `  📥 INPUTS: ${params}\n`;
                }
            } else {
                report += `  📥 INPUTS: ${params || '(none)'}\n`;
            }
            
            report += `  📤 OUTPUT: JSX.Element\n`;
            report += `  🎨 DISPLAYS: Renders React UI component\n`;
            totalComponents++;
            continue;
        }

        // Pattern 3: Regular function
        const funcMatch = trimmed.match(/^(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)(?:\s*:\s*([^\{]+))?\s*\{/);
        if (funcMatch && !trimmed.includes('JSX.Element') && !trimmed.includes('ReactNode')) {
            const name = funcMatch[1];
            const params = funcMatch[2] || '';
            const returnType = (funcMatch[3] || 'void').trim();

            if (!hasContent) {
                report += `\n${'='.repeat(70)}\n`;
                report += `📁 FILE: ${relativePath}\n`;
                report += `${'='.repeat(70)}\n`;
                hasContent = true;
            }

            report += `\n  🔧 FUNCTION: ${name}\n`;
            report += `  📍 Location: Line ${i + 1}\n`;
            
            if (jsdocDescription) {
                report += `  📝 Description: ${jsdocDescription}\n`;
            }
            
            report += `  📥 INPUTS: ${params || '(none)'}\n`;
            report += `  📤 OUTPUT: ${returnType}\n`;
            report += `  🎨 DISPLAYS: Returns ${returnType === 'void' ? 'nothing (side effects only)' : returnType}\n`;
            totalFunctions++;
            continue;
        }

        // Pattern 4: Arrow function (const name = (params): Type => {)
        const arrowMatch = trimmed.match(/^(?:export\s+)?const\s+(\w+)\s*=\s*(?:async\s+)?\(([^)]*)\)\s*(?::\s*([^=]+?))?\s*=>/);
        if (arrowMatch && 
            !trimmed.includes('React.FC') && 
            !trimmed.includes(': FC<') && 
            !trimmed.includes('FunctionComponent') &&
            !trimmed.includes('JSX.Element')) {
            
            const name = arrowMatch[1];
            const params = arrowMatch[2] || '';
            const returnType = (arrowMatch[3] || 'unknown').trim();

            if (!hasContent) {
                report += `\n${'='.repeat(70)}\n`;
                report += `📁 FILE: ${relativePath}\n`;
                report += `${'='.repeat(70)}\n`;
                hasContent = true;
            }

            report += `\n  🔧 ARROW FUNCTION: ${name}\n`;
            report += `  📍 Location: Line ${i + 1}\n`;
            
            if (jsdocDescription) {
                report += `  📝 Description: ${jsdocDescription}\n`;
            }
            
            report += `  📥 INPUTS: ${params || '(none)'}\n`;
            report += `  📤 OUTPUT: ${returnType}\n`;
            report += `  🎨 DISPLAYS: Returns ${returnType === 'void' ? 'nothing' : returnType}\n`;
            totalFunctions++;
            continue;
        }
    }

    // Report interfaces and types for this file
    if (hasContent && Object.keys(typeDefinitions).length > 0) {
        report += `\n  ${'─'.repeat(60)}\n`;
        report += `  📋 Interfaces & Types in this file:\n`;
        for (const [name, def] of Object.entries(typeDefinitions)) {
            // Only show if used by components or exported
            const isExported = exports.includes(name);
            const isPropType = name.endsWith('Props');
            
            if (isExported || isPropType) {
                report += `  ${'─'.repeat(60)}\n`;
                report += `    📌 ${def.type.toUpperCase()}: ${name}\n`;
                if (def.props.length > 0) {
                    for (const prop of def.props) {
                        const optional = prop.optional ? ' (optional)' : '';
                        report += `       • ${prop.name}${optional}: ${prop.type}\n`;
                    }
                }
            }
        }
    }
}

// Start scanning
console.log('🔍 Scanning directory:', root);
console.log('⏳ Please wait...\n');
scanDirectory(root);

// Create final report
let finalReport = '';
finalReport += '╔══════════════════════════════════════════════════╗\n';
finalReport += '║     TYPESCRIPT/TSX CODE MAP REPORT              ║\n';
finalReport += '║     Generated Automatically                     ║\n';
finalReport += '╚══════════════════════════════════════════════════╝\n\n';
finalReport += `📂 Project Root: ${root}\n`;
finalReport += `📅 Generated: ${new Date().toLocaleString()}\n`;
finalReport += `${'─'.repeat(70)}\n`;
finalReport += `📊 STATISTICS\n`;
finalReport += `${'─'.repeat(70)}\n`;
finalReport += `   Files analyzed: ${fileCount}\n`;
finalReport += `   React Components: ${totalComponents}\n`;
finalReport += `   Functions: ${totalFunctions}\n`;
finalReport += `   Interfaces: ${totalInterfaces}\n`;
finalReport += `   Types: ${totalTypes}\n`;
finalReport += `   Total entities: ${totalComponents + totalFunctions + totalInterfaces + totalTypes}\n`;
finalReport += `\n${'='.repeat(70)}\n`;
finalReport += `📋 DETAILED ANALYSIS\n`;
finalReport += `${'='.repeat(70)}\n`;
finalReport += report;

if (totalComponents === 0 && totalFunctions === 0) {
    finalReport += `\n⚠️  No components or functions found.\n`;
    finalReport += `   Make sure your .ts/.tsx files contain exports.\n`;
}

try {
    fs.writeFileSync(output, finalReport, 'utf8');
    console.log(`✅ Report generated: ${output}`);
    console.log(`📊 Files: ${fileCount} | Components: ${totalComponents} | Functions: ${totalFunctions} | Interfaces: ${totalInterfaces} | Types: ${totalTypes}\n`);
} catch(e) {
    console.error('❌ Error writing report:', e.message);
    process.exit(1);
}