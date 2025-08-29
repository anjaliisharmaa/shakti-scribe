// Test agents using dynamic imports for ES modules
async function loadAgentFactory() {
  try {
    const { agentFactory } = await import('../../agents/core/agentFactory.ts')
    return agentFactory
  } catch (error) {
    console.error('❌ Failed to load agent factory:', error)
    console.log('ℹ️  Make sure all agent files are properly created')
    return null
  }
}

async function testSingleGeneration() {
  console.log('🧪 TESTING SINGLE AGENT GENERATION')
  console.log('Testing Gynika with a simple prompt...\n')

  const agentFactory = await loadAgentFactory()
  if (!agentFactory) return

  try {
    const result = await agentFactory.generateContent({
      contentType: 'text',
      agent: 'gynika',
      prompt: 'period pain relief tips for working women'
    })

    console.log('✅ GENERATION SUCCESSFUL!')
    console.log(`📄 Title: ${result.title}`)
    console.log(`🤖 Agent: ${result.agent}`)
    console.log(`📝 Content Type: ${result.contentType}`)
    console.log(`📊 Content Length: ${result.content.length} characters`)
    console.log('\n📝 GENERATED CONTENT:')
    console.log('-'.repeat(50))
    console.log(result.content)
    console.log('-'.repeat(50))
    
    if (result.metadata) {
      console.log(`\n🏷️ Metadata:`)
      console.log(`   Hashtags: ${result.metadata.hashtags?.join(', ') || 'None'}`)
      console.log(`   Call to Action: ${result.metadata.callToAction || 'None'}`)
    }

  } catch (error) {
    console.error('❌ GENERATION FAILED:', error)
  }
}

async function testAllAgents() {
  console.log('🚀 TESTING ALL AGENTS')
  console.log('Generating text posts for each agent...\n')

  const agentFactory = await loadAgentFactory()
  if (!agentFactory) return

  const testCases = [
    { agent: 'gynika', prompt: 'managing irregular periods naturally' },
    { agent: 'maaya', prompt: 'postpartum depression awareness' },
    { agent: 'meher', prompt: 'setting boundaries with toxic family members' },
    { agent: 'nyaya', prompt: 'workplace harassment complaint procedure' },
    { agent: 'vaanya', prompt: 'embracing menopause as a power phase' }
  ]

  for (const testCase of testCases) {
    console.log(`\n🧪 Testing ${testCase.agent.toUpperCase()}...`)
    
    try {
      const result = await agentFactory.generateContent({
        contentType: 'text',
        agent: testCase.agent,
        prompt: testCase.prompt
      })

      console.log(`✅ ${testCase.agent} - SUCCESS`)
      console.log(`   Content length: ${result.content.length} chars`)
      console.log(`   Preview: ${result.content.substring(0, 100)}...`)

    } catch (error) {
      console.error(`❌ ${testCase.agent} - FAILED:`, error)
    }
  }
}

// Run tests based on command line arguments
const args = process.argv.slice(2)

if (args.includes('--single')) {
  testSingleGeneration()
} else if (args.includes('--all')) {
  testAllAgents()
} else {
  console.log('🔧 AGENT TEST OPTIONS:')
  console.log('npm run test-agents --single  # Test one agent generation')
  console.log('npm run test-agents --all     # Test all agents')
  console.log('\nStarting with single test...\n')
  testSingleGeneration()
}
