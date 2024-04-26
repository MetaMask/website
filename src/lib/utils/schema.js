import flatMapDeep from 'lodash/flatMapDeep'
import compact from 'lodash/compact'
import get from 'lodash/get'

/**
 * Generate structured data schema for FAQ if the current page is FAQs
 * @param {boolean} isFaqLayout
 * @param {Object.<string, any>[]} modules
 * @returns {(Object.<string, any> | null)}
 */
export const generateFaqSchema = modules => {
  const extractFaq = item => {
    if (typeof item !== 'object') {
      return null
    }
    if (Array.isArray(item.modules)) {
      return flatMapDeep(item.modules, extractFaq)
    } else if (item.internal.type === 'ContentfulFaq') {
      return item
    }
    return null
  }

  const faqs = compact(flatMapDeep(modules, extractFaq))

  const mainEntity = faqs.map(faq => {
    const question = faq.question
    const answer = get(faq, 'answer.childMarkdownRemark.html')
    if (!question || !answer) {
      return null
    }
    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    }
  })

  if (!mainEntity.length) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}
