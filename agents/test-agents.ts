import { agentFactory } from './core/agentFactory'
import { ContentRequest } from './core/baseAgent'

// Test configuration
const testPrompts = {
  gynika: "period pain management during work hours",
  maaya: "managing newborn sleep schedules while working from home", 
  meher: "dealing with workplace anxiety and imposter syndrome",
  nyaya: "understanding maternity leave rights in Indian companies",
  vaanya: "navigating career changes during menopause"
}

const contentTypes: ('video' | 'text' | 'poll')[] = ['video', 'text', 'poll']

async function testAgent(agentName: string, prompt: string) {
  console.log(`\n🧪 TESTING AGENT: ${agentName.toUpperCase()}`)
  console.log(`📝 Prompt: ${prompt}`)
  console.log('=' .repeat(80))

  try {
    const agent = agentFactory.getAgent(agentName)
    console.log(`✅ Agent Info:`)
    console.log(`   Name: ${agent.agent.name}`)
    console.log(`   Description: ${agent.agent.description}`)
    console.log(`   Tone: ${agent.agent.tone}`)

    for (const contentType of contentTypes) {
      console.log(`\n📊 Testing ${contentType.toUpperCase()} generation...`)
      
      try {
        const request: ContentRequest = {
          contentType,
          agent: agentName,
          prompt
        }

        const startTime = Date.now()
        const result = await agentFactory.generateContent(request)
        const endTime = Date.now()

        console.log(`✅ ${contentType} generated successfully in ${endTime - startTime}ms`)
        console.log(`📄 Title: ${result.title}`)
        console.log(`🏷️  Agent: ${result.agent}`)
        console.log(`📝 Content Preview: ${result.content.substring(0, 200)}...`)
        
        if (result.metadata) {
          console.log(`🎯 Hashtags: ${result.metadata.hashtags?.join(', ') || 'None'}`)
          console.log(`📞 CTA: ${result.metadata.callToAction || 'None'}`)
        }

      } catch (error) {
        console.error(`❌ Error generating ${contentType}:`, error)
      }
    }

  } catch (error) {
    console.error(`❌ Error testing agent ${agentName}:`, error)
  }

  console.log('\n' + '='.repeat(80))
}

async function runAllTests() {
  console.log('🚀 SHAKTI SCRIBE AGENT TESTING')
  console.log('Testing all 5 agents with 3 content types each...\n')

  const startTime = Date.now()

  // Test each agent
  for (const [agentName, prompt] of Object.entries(testPrompts)) {
    await testAgent(agentName, prompt)
  }

  const endTime = Date.now()
  const totalTime = (endTime - startTime) / 1000

  console.log(`\n🎉 ALL TESTS COMPLETED`)
  console.log(`⏱️  Total time: ${totalTime.toFixed(2)} seconds`)
  console.log(`📊 Tests run: ${Object.keys(testPrompts).length} agents × ${contentTypes.length} content types = ${Object.keys(testPrompts).length * contentTypes.length} total tests`)
}

async function testSingleAgent() {
  const args = process.argv.slice(2)
  
  if (args.length < 2) {
    console.log('Usage: npm run test-agent <agent-name> <prompt>')
    console.log('Available agents: gynika, maaya, meher, nyaya, vaanya')
    console.log('Example: npm run test-agent gynika "period pain management"')
    return
  }

  const agentName = args[0]
  const prompt = args.slice(1).join(' ')

  await testAgent(agentName, prompt)
}

// Check if specific agent test is requested
if (process.argv.includes('--single')) {
  testSingleAgent()
} else {
  runAllTests()
}
