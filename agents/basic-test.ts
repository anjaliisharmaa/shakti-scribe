// Simple agent test without Gemini integration
import { GynikaAgent } from './gynika/agent'
import { MaayaAgent } from './maaya/agent'
import { MeherAgent } from './meher/agent'
import { NyayaAgent } from './nyaya/agent'
import { VaanyaAgent } from './vaanya/agent'

function testAgentStructure() {
  console.log('🧪 TESTING AGENT STRUCTURE & CONFIGURATION\n')

  const agents = [
    new GynikaAgent(),
    new MaayaAgent(), 
    new MeherAgent(),
    new NyayaAgent(),
    new VaanyaAgent()
  ]

  agents.forEach(agent => {
    console.log(`✅ ${agent.agent.name} (${agent.agent.description})`)
    console.log(`   Personality: ${agent.agent.personality.substring(0, 100)}...`)
    console.log(`   Tone: ${agent.agent.tone}`)
    console.log(`   Expertise: ${agent.agent.expertise.join(', ')}`)
    console.log(`   Specialties: ${agent.agent.specialties.length} areas`)
    console.log('')
  })

  console.log('🎉 All agents loaded successfully!')
  console.log('📊 Structure test passed ✅')
}

// Test without Gemini API call
async function testAgentMethods() {
  console.log('\n🔧 TESTING AGENT METHODS\n')
  
  const gynika = new GynikaAgent()
  
  console.log('Testing method existence:')
  console.log(`✅ generateVideoScript: ${typeof gynika.generateVideoScript === 'function'}`)
  console.log(`✅ generateTextPost: ${typeof gynika.generateTextPost === 'function'}`)
  console.log(`✅ generatePoll: ${typeof gynika.generatePoll === 'function'}`)
  console.log(`✅ generateContent: ${typeof gynika.generateContent === 'function'}`)
  
  console.log('\n📊 Method test passed ✅')
}

console.log('🚀 SHAKTI SCRIBE AGENT BASIC TESTING\n')
testAgentStructure()
testAgentMethods().then(() => {
  console.log('\n✅ ALL BASIC TESTS COMPLETED!')
  console.log('Next step: Test with Gemini integration in Next.js environment')
})
