"use server"

import { env } from "~/env"
import { GhBaseURL } from "~/lib/utils"
import type { GithubIssueType } from "~/type/github"

export async function fetchPost(p:number) {
    const res = await fetch(`${GhBaseURL}?page=${p}&per_page=10`, {
        headers: (env.GITHUB_PERSONAL_TOKEN ? {
            "Authorization": `Bearer ${env.GITHUB_PERSONAL_TOKEN}`
        } : undefined),
        cache: "no-cache"
    })
    const data = await res.json() as GithubIssueType[]
    return data
}

export async function fetchAnArticle(issueNumber: string) {
    const res = await fetch(`${GhBaseURL}/${issueNumber}`, {
        headers: (env.GITHUB_PERSONAL_TOKEN ? {
            "Authorization": `Bearer ${env.GITHUB_PERSONAL_TOKEN}`
        } : undefined),
        cache: "no-cache"
    })
    const data = await res.json() as GithubIssueType
    return data
}