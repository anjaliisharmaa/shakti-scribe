// Quick agent test script
const { agentFactory } = require('./agents/core/agentFactory')

async function quickTest() {
    console.log('🧪 QUICK AGENT TEST\n')
    
    try {
        const result = await agentFactory.generateContent({
            agent: 'gynika',
            contentType: 'text',
            prompt: 'period pain relief tips for working women'
        })
        
        console.log('✅ SUCCESS!')
        console.log(`Title: ${result.title}`)
        console.log(`Agent: ${result.agent}`)
        console.log(`Content: ${result.content}`)
        console.log(`Hashtags: ${result.metadata?.hashtags?.join(', ')}`)
        
    } catch (error) {
        console.error('❌ Error:', error.message)
    }
}

quickTest()
