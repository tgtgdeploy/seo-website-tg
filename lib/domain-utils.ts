/**
 * Domain and tag matching utilities for multi-domain management
 */

import type { DomainAlias } from '@prisma/client'

/**
 * Get domain configuration from a list of domain aliases
 */
export function getDomainConfigFromList(
  hostname: string,
  domainAliases: DomainAlias[]
): DomainAlias | null {
  if (!hostname || !domainAliases || domainAliases.length === 0) {
    return null
  }

  // Find exact match (case-insensitive)
  const match = domainAliases.find(
    (alias) => alias.domain.toLowerCase() === hostname.toLowerCase()
  )

  return match || null
}

/**
 * Calculate tag match score between post keywords and domain configuration
 * Returns a score based on how many tags match (primary tags weighted higher)
 */
export function calculateTagMatchScoreFromDB(
  postKeywords: string[],
  domainConfig: DomainAlias
): number {
  if (!postKeywords || postKeywords.length === 0) {
    return 0
  }

  let score = 0
  const postKeywordsLower = postKeywords.map(k => k.toLowerCase())

  // Primary tags match: +10 points each
  if (domainConfig.primaryTags && domainConfig.primaryTags.length > 0) {
    const primaryMatches = domainConfig.primaryTags.filter(tag =>
      postKeywordsLower.includes(tag.toLowerCase())
    ).length
    score += primaryMatches * 10
  }

  // Secondary tags match: +5 points each
  if (domainConfig.secondaryTags && domainConfig.secondaryTags.length > 0) {
    const secondaryMatches = domainConfig.secondaryTags.filter(tag =>
      postKeywordsLower.includes(tag.toLowerCase())
    ).length
    score += secondaryMatches * 5
  }

  return score
}
