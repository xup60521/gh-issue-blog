'use server'
import { env } from "~/env"
import { GhBaseURL } from "~/lib/utils"
import type { IssueCommentType } from "~/type/github"

export async function fetchComment(issueNumber: number) {
    const res = await fetch(`${GhBaseURL}/${issueNumber}/comments`, {
        headers: (env.GITHUB_PERSONAL_TOKEN ? {
            "Authorization": `Bearer ${env.GITHUB_PERSONAL_TOKEN}`
        } : undefined)
    })
    const data = await res.json() as IssueCommentType[] | null
    return data
}