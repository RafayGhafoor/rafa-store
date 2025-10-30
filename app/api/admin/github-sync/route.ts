import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO
    const githubBranch = process.env.GITHUB_BRANCH || "main"

    if (!githubToken || !githubRepo) {
      return NextResponse.json(
        { message: "GitHub credentials not configured. Set GITHUB_TOKEN and GITHUB_REPO environment variables." },
        { status: 400 },
      )
    }

    // Read the products.json file
    const productsFile = path.join(process.cwd(), "data", "products.json")
    const fileContent = await fs.readFile(productsFile, "utf-8")
    const base64Content = Buffer.from(fileContent).toString("base64")

    // Get current file SHA for update
    const [owner, repo] = githubRepo.split("/")
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/data/products.json?ref=${githubBranch}`

    const getResponse = await fetch(getFileUrl, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    let sha: string | undefined
    if (getResponse.ok) {
      const fileData = await getResponse.json()
      sha = fileData.sha
    }

    // Commit the file
    const commitUrl = `https://api.github.com/repos/${owner}/${repo}/contents/data/products.json`
    const commitResponse = await fetch(commitUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update products.json - ${new Date().toISOString()}`,
        content: base64Content,
        branch: githubBranch,
        ...(sha && { sha }),
      }),
    })

    if (!commitResponse.ok) {
      const error = await commitResponse.json()
      console.error("[v0] GitHub commit error:", error)
      return NextResponse.json({ message: `Failed to sync to GitHub: ${error.message}` }, { status: 400 })
    }

    return NextResponse.json({ message: "Successfully synced to GitHub" })
  } catch (error) {
    console.error("[v0] GitHub sync error:", error)
    return NextResponse.json({ message: "Failed to sync to GitHub" }, { status: 500 })
  }
}
