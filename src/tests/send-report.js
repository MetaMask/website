const json = require('../../payload-results.json')
const stripAnsi = require('strip-ansi')

const GITHUB_REPOSITORY = process.argv[2]
const GITHUB_RUN_ID = process.argv[3]
const WEBHOOK_URL = process.argv[4]

// Calculate the total time in seconds
const totalTime =
  (json.testResults[0].endTime - json.testResults[0].startTime) / 1000

// Remove color codes
let cleanMessage = stripAnsi(json.testResults[0].message)
let blocks = []

blocks.push({
  type: 'header',
  text: {
    type: 'plain_text',
    text: `SEO Test Report – ${json.success ? '✅' : '❌'}`,
  },
})

blocks.push({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `Test Suites: \n${json.numFailedTestSuites} failed, ${json.numPassedTestSuites} passed, ${json.numTotalTestSuites} total`,
  },
})

blocks.push({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `Tests: \n${json.numFailedTests} failed, ${json.numPassedTests} passed, ${json.numTotalTests} total`,
  },
})

blocks.push({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `Snapshots: ${json.snapshot.total} total`,
  },
})

blocks.push({
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `Time: ${totalTime}s\n`,
    },
  ],
})

blocks.push({
  type: 'divider',
})

blocks.push({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: '*Details:*',
  },
})

json.testResults[0].assertionResults.forEach((data, i) => {
  const { fullName, status, duration } = data

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${i + 1}/ ${fullName} – ${
        status === 'passed' ? '✅' : '❌'
      }*\n*Status*: ${status.charAt(0).toUpperCase() +
        status.slice(1)}\n*Duration*: ${duration / 1000}s`,
    },
  })
})

if (cleanMessage.length > 0) {
  blocks.push({
    type: 'divider',
  })

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*Message:*\n```' + cleanMessage + '```',
    },
  })
}

blocks.push({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*<https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}|Show more>*`,
  },
})

// Send to slack channel
fetch(WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({ blocks }),
})
